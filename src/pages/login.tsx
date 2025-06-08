import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const DOCTOR_CREDENTIALS = {
  username: "kailash",
  password: "kailash7788", // ⚠️ Use env vars in real apps
};

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const loggedIn = localStorage.getItem("isDoctorLoggedIn") === "true";
      if (loggedIn) router.replace("/");
      else setCheckingAuth(false);
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Simulate authentication delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (
      username === DOCTOR_CREDENTIALS.username &&
      password === DOCTOR_CREDENTIALS.password
    ) {
      localStorage.setItem("isDoctorLoggedIn", "true");
      router.push("/");
    } else {
      setError("Incorrect username or password.");
      setLoading(false);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const inputVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.2 * i, duration: 0.5, ease: "easeOut" },
    }),
    hover: { scale: 1.02, boxShadow: "0px 4px 12px rgba(236, 72, 153, 0.3)" },
  };

  const buttonVariants = {
    hover: { scale: 1.05, boxShadow: "0px 8px 24px rgba(236, 72, 153, 0.4)" },
    tap: { scale: 0.95 },
  };

  if (checkingAuth) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50/90 via-purple-50/90 to-blue-50/90 dark:from-gray-900/90 dark:via-purple-900/90 dark:to-blue-900/90 text-gray-600 text-lg">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Checking login status...
          </motion.div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50/90 via-purple-50/90 to-blue-50/90 dark:from-gray-900/90 dark:via-purple-900/90 dark:to-blue-900/90 px-4 py-12 relative overflow-hidden">
        {/* Magical Background Particles */}
        <div className="absolute inset-0 z-0">
          {[...Array(25)].map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              className="absolute rounded-full bg-gradient-to-r from-pink-400/50 to-blue-400/50"
              style={{
                width: `${Math.random() * 10 + 5}px`,
                height: `${Math.random() * 10 + 5}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -50, 0],
                opacity: [0.3, 0.8, 0.3],
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: Math.random() * 5 + 3,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeInOut",
              }}
            />
          ))}
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={`sparkle-${i}`}
              className="sparkle"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [0.6, 1.5, 0.6],
                opacity: [0.4, 1, 0.4],
                rotate: [0, 360],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <motion.div
          className="w-full max-w-md bg-white/30 dark:bg-gray-900/30 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-pink-200/50 dark:border-blue-900/50 z-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          role="main"
          aria-labelledby="login-title"
        >
          <motion.p
            className="text-center text-pink-600 dark:text-blue-400 text-base font-semibold mb-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Hey Kailash, hi! 👋 Please log in
          </motion.p>

          <motion.h2
            id="login-title"
            className="text-3xl sm:text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-blue-600 mb-6 tracking-tight"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Doctor Login
            <motion.span
              className="absolute left-0 right-0 mx-auto bottom-0 w-24 h-1 bg-gradient-to-r from-pink-500 to-blue-500 rounded-full"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </motion.h2>

          <AnimatePresence>
            {error && (
              <motion.div
                role="alert"
                aria-live="polite"
                className="bg-red-100/80 dark:bg-red-900/80 backdrop-blur-sm border border-red-300 dark:border-red-600 text-red-800 dark:text-red-200 px-4 py-2 rounded-xl text-sm text-center mb-4"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-6">
            {[
              {
                label: "Username",
                type: "text",
                name: "username",
                placeholder: "doctor",
                value: username,
                onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                  setUsername(e.target.value),
                required: true,
              },
              {
                label: "Password",
                type: "password",
                name: "password",
                placeholder: "••••••••",
                value: password,
                onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                  setPassword(e.target.value),
                required: true,
              },
            ].map((field, i) => (
              <motion.div
                key={field.name}
                custom={i}
                variants={inputVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
              >
                <label
                  htmlFor={field.name}
                  className="block text-sm font-semibold text-pink-800 dark:text-blue-300 mb-2"
                >
                  {field.label}{" "}
                  {field.required && <span className="text-red-500">*</span>}
                </label>
                <input
                  id={field.name}
                  type={field.type}
                  name={field.name}
                  placeholder={field.placeholder}
                  value={field.value}
                  onChange={field.onChange}
                  required={field.required}
                  className="w-full rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-pink-200 dark:border-blue-800 px-4 py-3 text-gray-900 dark:text-gray-100 shadow-sm focus:ring-2 focus:ring-pink-400 dark:focus:ring-blue-400 focus:outline-none transition duration-200 hover:border-pink-400 dark:hover:border-blue-400"
                />
              </motion.div>
            ))}

            <motion.div
              variants={inputVariants}
              custom={2}
              initial="hidden"
              animate="visible"
            >
              <motion.button
                type="submit"
                disabled={loading}
                className={`w-full bg-gradient-to-r from-pink-600 to-blue-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:from-pink-700 hover:to-blue-700 hover:shadow-[0_0_20px_rgba(236,72,153,0.8)] dark:hover:shadow-[0_0_20px_rgba(59,130,246,0.8)] transition duration-300 disabled:opacity-60 disabled:cursor-not-allowed flex justify-center items-center space-x-2`}
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                aria-busy={loading}
              >
                {loading && (
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    ></path>
                  </svg>
                )}
                <span>Log In</span>
                <motion.div
                  className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0"
                  animate={{ x: ["-100%", "100%"], opacity: [0, 0.4, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                />
              </motion.button>
            </motion.div>
          </form>
        </motion.div>
      </div>
      <Footer />

      <style jsx global>{`
        @keyframes float-particle {
          0% { transform: translateY(0) scale(1); opacity: 0.3; }
          50% { transform: translateY(-50px) scale(1.3); opacity: 0.8; }
          100% { transform: translateY(0) scale(1); opacity: 0.3; }
        }

        @keyframes sparkle {
          0% { transform: scale(0.6) rotate(0deg); opacity: 0.4; }
          50% { transform: scale(1.5) rotate(180deg); opacity: 1; }
          100% { transform: scale(0.6) rotate(360deg); opacity: 0.4; }
        }
        .sparkle {
          animation: sparkle 2.5s infinite;
          pointer-events: none;
          position: absolute;
          background: radial-gradient(circle, rgba(255, 255, 255, 0.9) 10%, rgba(236, 72, 153, 0.7) 90%);
          width: 8px;
          height: 8px;
          border-radius: 50%;
          box-shadow: 0 0 15px rgba(236, 72, 153, 0.8);
        }

        .dark .sparkle {
          background: radial-gradient(circle, rgba(255, 255, 255, 0.9) 10%, rgba(59, 130, 246, 0.7) 90%);
          box-shadow: 0 0 15px rgba(59, 130, 246, 0.8);
        }
      `}</style>
    </>
  );
}
