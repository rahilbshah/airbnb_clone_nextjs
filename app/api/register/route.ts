import client from '@/libs/prismadb';
import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';

export const POST = async (request: Request) => {
  const { email, password, name } = await request.json();
  const hashedPassword = await bcrypt.hash(password, 12);
  try {
    const user = await client.user.create({
      data: {
        email,
        hashedPassword,
        name,
      },
    });
    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
};
