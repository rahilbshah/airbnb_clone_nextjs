import authOptions from '@/libs/auth';
import client from '@/libs/prismadb';
import { getServerSession } from 'next-auth';

export const getSession = async () => {
  return await getServerSession(authOptions);
};
const getCurrentUser = async () => {
  try {
    const session = await getSession();
    if (!session?.user?.email) return null;
    const currentUser = await client.user.findUnique({
      where: {
        email: session?.user?.email as string,
      },
    });
    if (!currentUser) {
      return null;
    }
    return {
      ...currentUser,
      createdAt: currentUser.createdAt.toISOString(),
      updatedAt: currentUser.updatedAt.toISOString(),
      emailVerified: currentUser.emailVerified?.toISOString() || null,
    };
  } catch (error: any) {
    return null;
  }
};

export default getCurrentUser;
