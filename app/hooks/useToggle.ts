import { useState } from "react";

export function useToggle() {
  const [toggle, setToggle] = useState(false);
  
  const toggleFunction = () => setToggle((state) => !state);
  
  return [toggle, setToggle, toggleFunction] as const;
}