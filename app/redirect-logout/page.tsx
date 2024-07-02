'use client';

import { useEffect } from 'react';
import { signOut } from 'app/auth';
import { useRouter } from 'next/navigation';

export default function RedirectLogout() {
  const router = useRouter();

  useEffect(() => {
    async function logout() {
      try {
        await signOut();
        console.log('Logout successful');
      } catch (error) {
        console.error('Error during logout:', error);
      }
      router.push('/');
    }
    logout();
  }, [router]);

  return <div>Logging out...</div>;
}