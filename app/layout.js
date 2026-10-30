import "./globals.css";
import ThemeToggle from "./components/ThemeToggle";
import Cart from "./components/Cart";

export const metadata = {
  title: "Meal App",
  description: "A simple meal app built with Next.js and DaisyUI",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-base-300 text-base-content min-h-screen">
        <nav className="navbar bg-red-700 sticky top-0 z-50"> 
          <div className="navbar-start">
            <a href="/" className="btn btn-ghost text-xl text-white hover:bg-white/10 hover:shadow-none ">
              Meal App
            </a>
          </div>
          <div className="navbar-end flex items-center gap-2">
            <Cart />
            <ThemeToggle />
          </div>
        </nav>
        <main className="pt-16">{children}</main>
      </body>
    </html>
  );
}