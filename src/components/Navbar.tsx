import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDoctorLoggedIn, setIsDoctorLoggedIn] = useState(false);

  useEffect(() => {
    setIsDoctorLoggedIn(localStorage.getItem("isDoctorLoggedIn") === "true");
  }, []);

  function handleLogout() {
    localStorage.removeItem("isDoctorLoggedIn");
    setIsDoctorLoggedIn(false);
    setIsOpen(false);
    window.location.href = "/";
  }

  const menuLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    !isDoctorLoggedIn
      ? { href: "/appointment", label: "Book Appointment" }
      : { href: "/appointments", label: "My Appointments" },
    ...(isDoctorLoggedIn ? [{ href: "/chatbot", label: "AI Companion" }] : []),
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-blue-700 via-indigo-800 to-purple-900 shadow-lg backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link
          href="/"
          className="text-3xl font-extrabold tracking-tight text-white relative group flex items-center gap-3"
          aria-label="Home"
        >
          <motion.span
            className="text-4xl"
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            🩺
          </motion.span>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-purple-300">
            Dr. Rathod Kailash
          </span>
          <span className="absolute bottom-0 left-0 w-0 h-[3px] bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-500 rounded-full" />
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-7 text-lg font-semibold">
          {menuLinks.map(({ href, label }) => (
            <Link
              key={label}
              href={href}
              className="relative group px-3 py-2 text-white/90 hover:text-white transition-all duration-300"
            >
              {label}
              <span className="absolute left-0 bottom-0 w-0 h-[3px] bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-500 rounded-full" />
            </Link>
          ))}

          {!isDoctorLoggedIn ? (
            <Link
              href="/login"
              className="relative group px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-md"
            >
              Login
              <span className="absolute inset-0 rounded-full bg-white/10 group-hover:bg-white/20 transition-all duration-300" />
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-full hover:from-red-600 hover:to-pink-700 transition-all duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-red-400"
              aria-label="Logout"
            >
              Logout
            </button>
          )}
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden focus:outline-none text-white relative z-50"
          aria-label={isOpen ? "Close Menu" : "Open Menu"}
        >
          <motion.div
            initial={false}
            animate={{ rotate: isOpen ? 180 : 0, scale: isOpen ? 1.3 : 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="p-2 rounded-full bg-white/10 backdrop-blur-md"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </motion.div>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="md:hidden bg-gradient-to-b from-blue-700/95 to-indigo-900/95 backdrop-blur-xl px-6 pb-8 pt-4 space-y-6 text-xl font-semibold shadow-2xl rounded-b-3xl"
          >
            {menuLinks.map(({ href, label }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ delay: i * 0.1, duration: 0.4, ease: "easeOut" }}
              >
                <Link
                  href={href}
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 text-white/90 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  {label}
                </Link>
              </motion.div>
            ))}

            {!isDoctorLoggedIn ? (
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ delay: menuLinks.length * 0.1, duration: 0.4 }}
              >
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  Login
                </Link>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ delay: menuLinks.length * 0.1, duration: 0.4 }}
              >
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="block w-full text-left px-4 py-3 text-white bg-gradient-to-r from-red-500 to-pink-600 rounded-xl hover:from-red-600 hover:to-pink-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-400"
                  aria-label="Logout"
                >
                  Logout
                </button>
              </motion.div>
            )}
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Enhanced Styles */}
      <style jsx>{`
        header {
          background: linear-gradient(
            90deg,
            rgba(29, 78, 216, 0.9),
            rgba(79, 70, 229, 0.9),
            rgba(147, 51, 234, 0.9)
          );
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }
        button:hover,
        a:hover {
          transform: translateY(-1px);
          filter: drop-shadow(0 4px 8px rgba(255, 255, 255, 0.2));
        }
        button:focus,
        a:focus {
          outline: none;
          box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.5);
        }
        .group:hover span {
          background: linear-gradient(to right, #60a5fa, #a855f7);
        }
        nav a,
        nav button {
          transition: all 0.3s ease;
        }
      `}</style>
    </header>
  );
}