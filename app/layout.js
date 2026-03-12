import "./globals.css";
import NavBar from "../components/NavBar";

export const metadata = {
  title: "Profile Project",
  description: "A Next.js profile project using layouts and dynamic routes",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <h1>Profile Project</h1>
          <NavBar />
        </header>

        <main className="container">{children}</main>

        <footer className="site-footer">
          <p>© 2026 Spencer Burse</p>
        </footer>
      </body>
    </html>
  );
}