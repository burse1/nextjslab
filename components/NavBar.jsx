"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

export default function NavBar() {
  const { data: session, status } = useSession();

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px 24px",
        borderBottom: "1px solid #e5e7eb",
        marginBottom: "24px",
      }}
    >
      <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
        <Link href="/">Home</Link>
        <Link href="/add-profile">Add Profile</Link>
      </div>

      <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
        {status === "loading" ? (
          <span>Loading...</span>
        ) : session ? (
          <>
            <span>{session.user.email}</span>
            <button
  onClick={() => signOut()}
  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
>
  Logout
</button>
          </>
        ) : (
          <Link href="/auth/signin">Sign In</Link>
        )}
      </div>
    </nav>
  );
}