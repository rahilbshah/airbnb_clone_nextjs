import getFavoriteListings from '@/actions/getFavoriteListings';
import FavoritesClient from './FavoritesClient';
import getCurrentUser from '@/actions/getCurrentUser';
import ClientOnly from '@/components/ClientOnly';
import EmptyState from '@/components/EmptyState';

const FavoritePage = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState
          title="Oops! Looks Like You Need Access"
          showLogin
          subtitle="To view this content, please log in or sign up."
        />
      </ClientOnly>
    );
  }
  const listings = await getFavoriteListings();
  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No favorites found"
          subtitle="Looks like you have no favorite listings."
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <FavoritesClient listings={listings} currentUser={currentUser} />
    </ClientOnly>
  );
};

export default FavoritePage;
