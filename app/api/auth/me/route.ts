import { NextRequest, NextResponse } from 'next/server';
import { verifyJwt } from '@/lib/auth';
import { findUserById } from '@/lib/data-service';

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('asc_auth_token')?.value;

    if (!token) {
      return NextResponse.json({ authenticated: false, user: null });
    }

    const payload = await verifyJwt(token);
    if (!payload || !payload.id) {
      return NextResponse.json({ authenticated: false, user: null });
    }

    const user = await findUserById(payload.id);
    if (!user) {
      return NextResponse.json({ authenticated: false, user: null });
    }

    return NextResponse.json({
      authenticated: true,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        fullName: user.fullName,
        role: user.role,
        rollNumber: user.rollNumber,
      },
    });
  } catch (err: any) {
    return NextResponse.json({ authenticated: false, user: null });
  }
}
