"user client";

import { useState } from "react";

export function useMessageType(){
  const [messageType, setMessageType] = useState('');
  return { messageType, setMessageType}
}