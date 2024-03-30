import getCurrentUser from '@/actions/getCurrentUser';
import client from '@/libs/prismadb';
import { NextResponse } from 'next/server';

export const POST = async (request: Request) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.json('You are not authenticated!', { status: 401 });
  }

  const { listingId, startDate, endDate, totalPrice } = await request.json();
  if (!listingId || !startDate || !endDate || !totalPrice) {
    return NextResponse.json('Please Check all the details', { status: 400 });
  }
  try {
    const listingAndReservation = await client.listing.update({
      where: {
        id: listingId,
      },
      data: {
        reservations: {
          create: {
            userId: currentUser.id,
            startDate,
            endDate,
            totalPrice,
          },
        },
      },
    });
    return NextResponse.json(listingAndReservation, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
};
