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
              onClick={() => signOut({ callbackUrl: "/" })}
              style={{
                padding: "8px 12px",
                border: "1px solid #ccc",
                borderRadius: "6px",
                background: "white",
                cursor: "pointer",
              }}
            >
              Sign Out
            </button>
          </>
        ) : (
          <Link href="/auth/signin">Sign In</Link>
        )}
      </div>
    </nav>
  );
}