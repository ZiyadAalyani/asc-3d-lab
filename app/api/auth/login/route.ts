import { NextRequest, NextResponse } from 'next/server';
import { verifyPassword, signJwt } from '@/lib/auth';
import { findUserByIdentifier } from '@/lib/data-service';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { identifier, password } = body;

    if (!identifier || !password) {
      return NextResponse.json(
        { error: 'Email/Username and password are required.' },
        { status: 400 }
      );
    }

    const user = await findUserByIdentifier(identifier);
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials. User not found.' },
        { status: 401 }
      );
    }

    const isValid = await verifyPassword(password, user.passwordHash);
    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid credentials. Incorrect password.' },
        { status: 401 }
      );
    }

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
      message: 'Logged in successfully',
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
    console.error('Login error:', err);
    return NextResponse.json(
      { error: err.message || 'Internal server error during login.' },
      { status: 500 }
    );
  }
}
