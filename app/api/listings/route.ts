import getCurrentUser from '@/actions/getCurrentUser';
import client from '@/libs/prismadb';
import { NextResponse } from 'next/server';

export const POST = async (request: Request) => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.json('You are not authenticated!', { status: 401 });
  }
  const body = await request.json();
  const missingFields: any[] = [];

  Object.entries(body).forEach(([key, value]) => {
    if (value === null || value === undefined || value === '') {
      missingFields.push(key);
    }
  });

  if (missingFields.length > 0) {
    const missingFieldsMessage = `Field ${missingFields[0]} is Missing!`;
    return NextResponse.json(missingFieldsMessage, { status: 400 });
  }
  const {
    title,
    description,
    imageSrc,
    category,
    roomCount,
    bathroomCount,
    guestCount,
    location,
    price,
  } = body;
  try {
    const listing = await client.listing.create({
      data: {
        title,
        description,
        imageSrc,
        category,
        roomCount,
        bathroomCount,
        guestCount,
        locationValue: location.value,
        price: parseInt(price, 10),
        userId: currentUser.id,
      },
    });
    return NextResponse.json(listing, { status: 201 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
};
