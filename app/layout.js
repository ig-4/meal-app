import "./globals.css";
import ThemeToggle from "./components/ThemeToggle";

export const metadata = {
  title: "Meal App",
  description: "A simple meal app built with Next.js and DaisyUI",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-base-100 text-base-content min-h-screen">
        <nav className="navbar bg-base-200">
          <div className="navbar-start">
            <a href="/" className="btn btn-ghost text-xl">
              Meal App
            </a>
          </div>
          <div className="navbar-end">
            <ThemeToggle />
          </div>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  );
}