import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      alert("Please enter a valid email address.");
      setLoading(false);
      return;
    }

    // Mock email sending to shankerr7780@gmail.com
    try {
      console.log("Sending message to shankerr7780@gmail.com:", {
        from: form.email,
        name: form.name,
        message: form.message,
      });

      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setSubmitted(true);
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setSubmitted(false), 5000); // Hide success message after 5s
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message. Please try again later.");
    }

    setLoading(false);
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
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.2 * i, duration: 0.6, ease: "easeOut" },
    }),
    hover: { scale: 1.02, boxShadow: "0px 4px 12px rgba(236, 72, 153, 0.3)" },
  };

  const buttonVariants = {
    hover: { scale: 1.05, boxShadow: "0px 8px 24px rgba(236, 72, 153, 0.4)" },
    tap: { scale: 0.95 },
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-pink-50/90 via-purple-50/90 to-blue-50/90 dark:from-gray-900/90 dark:via-purple-900/90 dark:to-blue-900/90 transition-colors">
      <Navbar />

      <main className="flex-grow container mx-auto max-w-3xl p-6 sm:p-10 lg:p-16 relative overflow-hidden">
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
          className="relative z-10 bg-white/30 dark:bg-gray-900/30 shadow-2xl rounded-2xl p-8 sm:p-12 backdrop-blur-xl border border-pink-200/50 dark:border-blue-900/50"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          role="main"
          aria-labelledby="contact-title"
        >
          <motion.h1
            id="contact-title"
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-blue-600 mb-8 text-center"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            Connect With Us
            <motion.span
              className="absolute left-0 right-0 mx-auto bottom-0 w-32 h-1 bg-gradient-to-r from-pink-500 to-blue-500 rounded-full"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </motion.h1>

          <AnimatePresence>
            {submitted && (
              <motion.div
                role="alert"
                aria-live="polite"
                className="mb-8 rounded-xl bg-pink-100/80 dark:bg-blue-900/80 backdrop-blur-sm border border-pink-300 dark:border-blue-600 text-pink-800 dark:text-blue-200 px-6 py-4 flex items-center space-x-3"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <svg
                  className="w-6 h-6 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <p className="font-medium">
                  Thank you, {form.name}! Your message has been sent to shankerr7780@gmail.com.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            {[
              {
                label: "Your Name",
                type: "text",
                name: "name",
                placeholder: "Enter your full name",
                required: true,
              },
              {
                label: "Your Email",
                type: "email",
                name: "email",
                placeholder: "example@domain.com",
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
                  type={field.type}
                  id={field.name}
                  name={field.name}
                  placeholder={field.placeholder}
                  value={form[field.name as keyof typeof form]}
                  onChange={handleChange}
                  required={field.required}
                  className="w-full rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-pink-200 dark:border-blue-800 px-4 py-3 text-gray-900 dark:text-gray-100 shadow-sm focus:ring-2 focus:ring-pink-400 dark:focus:ring-blue-400 focus:outline-none transition duration-200 hover:border-pink-400 dark:hover:border-blue-400"
                  aria-describedby={
                    field.name === "email" ? "emailHelp" : undefined
                  }
                />
                {field.name === "email" && (
                  <small
                    id="emailHelp"
                    className="text-xs text-gray-600 dark:text-gray-400 mt-1 block"
                  >
                    We'll respond to this email address
                  </small>
                )}
              </motion.div>
            ))}

            <motion.div
              variants={inputVariants}
              custom={2}
              initial="hidden"
              animate="visible"
              whileHover="hover"
            >
              <label
                htmlFor="message"
                className="block text-sm font-semibold text-pink-800 dark:text-blue-300 mb-2"
              >
                Your Message <span className="text-red-500">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                placeholder="Tell us how we can assist you"
                value={form.message}
                onChange={handleChange}
                rows={6}
                required
                className="w-full rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-pink-200 dark:border-blue-800 px-4 py-3 text-gray-900 dark:text-gray-100 shadow-sm focus:ring-2 focus:ring-pink-400 dark:focus:ring-blue-400 focus:outline-none transition duration-200 hover:border-pink-400 dark:hover:border-blue-400 resize-none"
              />
            </motion.div>

            <motion.div
              variants={inputVariants}
              custom={3}
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
                <span>Send Message</span>
                <motion.div
                  className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0"
                  animate={{ x: ["-100%", "100%"], opacity: [0, 0.4, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                />
              </motion.button>
            </motion.div>

            <motion.div
              variants={inputVariants}
              custom={4}
              initial="hidden"
              animate="visible"
              className="mt-6 text-center"
            >
              <p className="text-sm font-semibold text-pink-800 dark:text-blue-300">
                Emergency Contact:{" "}
                <a
                  href="tel:+918897557320"
                  className="text-pink-600 dark:text-blue-400 hover:underline"
                  aria-label="Emergency contact number"
                >
                  +91 8897557320
                </a>
              </p>
            </motion.div>
          </form>
        </motion.div>
      </main>

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
    </div>
  );
}