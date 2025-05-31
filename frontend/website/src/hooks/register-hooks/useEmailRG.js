"use client";

import { useState } from "react";

export function useEmailRG() {
  const [email, setEmail] = useState('');
  return { email, setEmail }
}