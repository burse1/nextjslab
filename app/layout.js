import "./globals.css";
import NavBar from "../components/NavBar";
import SessionProvider from "@/components/SessionProvider";

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
        <SessionProvider>
          <NavBar />
          <main style={{ maxWidth: "1000px", margin: "0 auto", padding: "0 16px 32px" }}>
            {children}
          </main>
        </SessionProvider>
      </body>
    </html>
  );
}