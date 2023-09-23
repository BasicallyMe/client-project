"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthProvider } from "../../context/AuthContext";

export default function AdminLayout({ children }) {
  useEffect(() => {
    console.log("calling admin layout");
  }, []);
  return (
    <div>
      <AuthProvider>{children}</AuthProvider>
    </div>
  );
}
