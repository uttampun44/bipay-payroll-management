import { ReactNode } from "react";

type frontProps = {
    children: ReactNode
}
export default function Layout({ children }: frontProps) {
  return (
     <>
      {children}
     </>
  );
}