import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="navbar">
      <Link href="/">Home</Link>
      <Link href="/about">About</Link>
    </nav>
  );
}