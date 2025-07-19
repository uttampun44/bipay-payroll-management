    "use client";

import { Client, Account, Databases } from "appwrite";

export const client = new Client();

if (typeof window !== "undefined") {
  const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
  const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;

  if (endpoint && projectId) {
    client.setEndpoint(endpoint).setProject(projectId);
  } else {
    console.warn("Appwrite client not initialized");
  }
}
export const account = new Account(client);
export const databases = new Databases(client);
export { ID } from "appwrite";
