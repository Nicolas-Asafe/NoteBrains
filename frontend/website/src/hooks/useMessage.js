"user client";

import { useState } from "react";

export function useMessage() {
  const [message, setMessage] = useState('');
  return { message, setMessage}
}