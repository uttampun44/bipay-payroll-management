   "use client";
import { useEffect } from "react";
import { account } from "../appwrite";

export default function Dashboard() {

  useEffect(() => {
   const removeSession = async () => {
      await account.deleteSessions();
    };
    removeSession();
  }, []);
  return <div>Dashboard</div>;
}