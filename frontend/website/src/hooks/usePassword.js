"use client";

import { useState } from 'react';

export function usePassword() {
  const [password, setPassword ] = useState('');

  return { password, setPassword }
}