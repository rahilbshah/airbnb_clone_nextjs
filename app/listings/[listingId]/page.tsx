import getCurrentUser from '@/actions/getCurrentUser';
import getListingById from '@/actions/getListingById';
import EmptyState from '@/components/EmptyState';
import React from 'react';

interface IParams {
  listingId?: string;
}
const ListingPage = async ({ params }: { params: IParams }) => {
  const listing = await getListingById(params);
  //   const reservations = await getReservations(params);
  const currentUser = await getCurrentUser();

  if (!listing) {
    return <EmptyState />;
  }
  return <div>ListingPage</div>;
};

export default ListingPage;
