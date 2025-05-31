"use client";

import { useState } from "react";

export function usePasswordRG(){
  const [password, setPassword] = useState('');
  return { password, setPassword }
}