"use client";

import { authMiddleware } from '../../middlewares/authMiddleware';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = authMiddleware();
    if (!isAuthenticated) {
      router.push('/');
    }
  }, []);

  return (
    <main>
      <h1>Dashboard (Login successful)</h1>
    </main>
  );
}