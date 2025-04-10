// ProfilePageWrapper.tsx
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers'; // Import cookies from next/headers
import { prisma } from '@/lib/db'; // Import Prisma client
import ProfilePage from './profileComp'; // Import the ProfilePage component

export default async function ProfilePageWrapper() {
  // Retrieve the JWT token from cookies
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    // Redirect to login page if no token is found
    return <p>Please log in to view your profile.</p>;
  }

  try {
    // Decode the JWT to extract the payload (userId, email, etc.)
    const decodedToken: { userId: string; email: string } = jwt.verify(
      token,
      process.env.JWT_SECRET as string // Use your JWT secret key
    ) as { userId: string; email: string };

    const { userId } = decodedToken;

    if (!userId) {
      // Handle invalid token
      return <p>Invalid user ID in token. Please log in again.</p>;
    }

    // Fetch user data from the database
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { name: true, profileImage: true }, // Select only the required fields
    });

    if (!user) {
      // Handle case where user is not found in the database
      return <p>User not found. Please log in again.</p>;
    }

    // Pass the userId and other props to the ProfilePage component
    return (
      <ProfilePage
        userId={userId}
        currentName={user.name || 'Guest'} // Use the name from the database or a fallback
        currentProfileImage={user.profileImage || '/assets/imgs/default.jpeg'} // Use the profile image from the database or a fallback
      />
    );
  } catch (error) {
    console.error('Error decoding token or fetching user data:', error);
    return <p>Failed to decode token or fetch user data. Please log in again.</p>;
  }
}