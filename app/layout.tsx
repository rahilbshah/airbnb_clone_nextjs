import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/navbar/Navbar';
import Modal from '@/components/modals/Modal';
import RegisterModal from '@/components/modals/RegisterModal';
import LoginModal from '@/components/modals/LoginModal';
import ToasterProvider from '@/providers/ToasterProvider';
import { getCurrentUser } from '@/actions/getCurrentUser';

const font = Nunito({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'DreamStay: Your Ultimate Airbnb Experience',
  description:
    'Explore and book unique accommodations around the world with DreamStay, your go-to platform for unforgettable stays. Discover cozy apartments, stylish lofts, beachside villas, and more, all tailored to your travel needs. Start your adventure today!',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
        <LoginModal />
        <RegisterModal />
        <Navbar currentUser={currentUser} />
        {children}
      </body>
    </html>
  );
}
