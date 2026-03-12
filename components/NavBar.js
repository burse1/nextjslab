import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="bg-black text-white px-6 py-4">
      <div className="flex gap-6">
        <Link href="/" className="hover:underline">
          Home
        </Link>
        <Link href="/about" className="hover:underline">
          About
        </Link>
        <Link href="/contact" className="hover:underline">
          Contact
        </Link>
      </div>
    </nav>
  );
}