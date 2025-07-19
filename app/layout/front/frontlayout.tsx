import Header from "@/components/header";
import { ReactNode } from "react";

type frontProps = {
    children: ReactNode
}
export default function FrontLayout({ children }: frontProps) {
  return (
     <>
      <Header />
      {children}
     </>
  );
}