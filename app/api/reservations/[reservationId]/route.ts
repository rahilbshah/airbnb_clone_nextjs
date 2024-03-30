import getCurrentUser from '@/actions/getCurrentUser';
import client from '@/libs/prismadb';
import { NextResponse } from 'next/server';

interface IParams {
  reservationId?: string;
}
export const DELETE = async (
  request: Request,
  { params }: { params: IParams },
) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.json('You are not authenticated!', { status: 401 });
  }

  const { reservationId } = params;

  if (!reservationId || typeof reservationId !== 'string') {
    throw new Error('Invalid ID');
  }
  try {
    const reservation = await client.reservation.deleteMany({
      where: {
        id: reservationId,
        OR: [
          { userId: currentUser.id },
          { listing: { userId: currentUser.id } },
        ],
      },
    });
    return NextResponse.json(reservation, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
};
