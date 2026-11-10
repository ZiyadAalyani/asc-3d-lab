import { NextRequest, NextResponse } from 'next/server';
import { hashPassword, signJwt } from '@/lib/auth';
import { findUserByIdentifier, createUser } from '@/lib/data-service';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { fullName, username, email, password, role, rollNumber } = body;

    if (!fullName || !username || !email || !password) {
      return NextResponse.json(
        { error: 'All required fields (Full Name, Username, Email, Password) must be provided.' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters long.' },
        { status: 400 }
      );
    }

    const existing = await findUserByIdentifier(email);
    if (existing) {
      return NextResponse.json(
        { error: 'An account with this email address already exists.' },
        { status: 409 }
      );
    }

    const existingUsername = await findUserByIdentifier(username);
    if (existingUsername) {
      return NextResponse.json(
        { error: 'An account with this username already exists.' },
        { status: 409 }
      );
    }

    const passwordHash = await hashPassword(password);

    const user = await createUser({
      fullName,
      username,
      email,
      passwordHash,
      role: role || 'student',
      rollNumber: rollNumber || (role === 'instructor' ? 'FAC-01' : 'B001'),
    });

    const sessionPayload = {
      id: user.id,
      email: user.email,
      username: user.username,
      fullName: user.fullName,
      role: user.role,
      rollNumber: user.rollNumber,
    };

    const token = await signJwt(sessionPayload);

    const res = NextResponse.json({
      success: true,
      message: 'Account registered successfully',
      user: sessionPayload,
    });

    res.cookies.set('asc_auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });

    return res;
  } catch (err: any) {
    console.error('Registration error:', err);
    return NextResponse.json(
      { error: err.message || 'Internal server error during registration.' },
      { status: 500 }
    );
  }
}
