import "./globals.css";
import NavBar from "../components/NavBar";

export const metadata = {
  title: "Next.js Lab",
  description: "A simple Next.js lab project with navigation",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <NavBar />
        <main className="p-6">{children}</main>
      </body>
    </html>
  );
}