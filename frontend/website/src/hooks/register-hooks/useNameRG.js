"use client";

import { useState } from 'react';

export function useNameRG() {
  const [name, setName,] = useState('');
  return { name, setName };
}