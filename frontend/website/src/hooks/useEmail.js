"use client"

import { useState } from 'react';

export function useEmail() {
  const [email, setEmail] = useState('');
  return { email, setEmail };
}