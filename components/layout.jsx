"use client";
import AsideBar from "@/components/AsideBar";
import { useEffect, useState } from "react";
export default function Layout({ children }) {
  const [role, setRole] = useState("");

  useEffect(() => {
    // Assuming you have stored the role in local storage or got it from an API
    const storedRole = localStorage.getItem("role"); // Replace with your logic to get the role
    setRole(storedRole);
  }, []);

  return (
    <div className="flex">
      <AsideBar role={role} />
      <main className="flex-1 p-4">{children}</main>
    </div>
  );
}
