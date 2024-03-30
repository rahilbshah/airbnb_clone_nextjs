import getCurrentUser from '@/actions/getCurrentUser';
import client from '@/libs/prismadb';
import { NextResponse } from 'next/server';

interface IParams {
  listingId?: string;
}
export const POST = async (
  request: Request,
  { params }: { params: IParams },
) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { listingId } = params;

  if (!listingId || typeof listingId !== 'string') {
    throw new Error('Invalid ID');
  }
  let favoriteIds = [...(currentUser.favoriteIds || [])];

  favoriteIds.push(listingId);

  try {
    const user = await client.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        favoriteIds,
      },
    });
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
};

export const DELETE = async (
  request: Request,
  { params }: { params: IParams },
) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { listingId } = params;

  if (!listingId || typeof listingId !== 'string') {
    throw new Error('Invalid ID');
  }

  let favoriteIds = [...(currentUser.favoriteIds || [])];

  favoriteIds = favoriteIds.filter(id => id !== listingId);
  try {
    const user = await client.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        favoriteIds,
      },
    });
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
};
