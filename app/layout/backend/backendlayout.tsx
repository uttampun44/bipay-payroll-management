import Sidebar from "@/components/sidebar";
import TopNavigation from "@/components/topnavigation";
import { ReactNode } from "react";

type BackendProps = {
  children: ReactNode;
};
export default function BackendLayout({ children }: BackendProps) {
  return (
    <>
      <TopNavigation />
      <Sidebar />
      <main>{children}</main>
    </>
  );
}
