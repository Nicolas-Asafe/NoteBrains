"use client";

import { useState } from 'react';

export function useMessageRG() {
  const [message, setMessage] = useState('');
  
  return { message, setMessage };
}