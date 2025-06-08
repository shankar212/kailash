import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "../lib/firebase";

export default function Appointment() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    contact: "",
    date: "",
    time: "",
    symptoms: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@gmail\.com$/.test(email);
  };

  const validateTime = (time: string) => {
    const [hoursStr, minutesStr] = time.split(":");
    const hours = Number(hoursStr);
    const minutes = Number(minutesStr);
    return hours >= 9 && (hours < 20 || (hours === 20 && minutes === 0));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const appointmentDate = new Date(`${form.date}T${form.time}`);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const appointmentDay = new Date(appointmentDate);
    appointmentDay.setHours(0, 0, 0, 0);

    if (appointmentDay.getTime() <= today.getTime()) {
      alert("Appointments cannot be scheduled for today or earlier. Please choose a future date.");
      setLoading(false);
      return;
    }

    if (!validateEmail(form.email)) {
      alert("Please enter a valid Gmail address.");
      setLoading(false);
      return;
    }

    if (!validateTime(form.time)) {
      alert("Appointments must be between 9:00 AM and 8:00 PM.");
      setLoading(false);
      return;
    }

    try {
      await addDoc(collection(db, "appointments"), {
        ...form,
        createdAt: Timestamp.now(),
      });

      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 5000); // Reset success message after 5s
      setForm({
        name: "",
        email: "",
        contact: "",
        date: "",
        time: "",
        symptoms: "",
      });
    } catch (error) {
      console.error("Error submitting appointment:", error);
      alert("Failed to submit appointment. Please try again later.");
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
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { delay: 0.2 * i, duration: 0.5, ease: "easeOut" },
    }),
    hover: { scale: 1.02, transition: { duration: 0.2 } },
  };

  const buttonVariants = {
    hover: { scale: 1.05, boxShadow: "0px 8px 24px rgba(59, 130, 246, 0.3)" },
    tap: { scale: 0.95 },
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Dynamic Background Elements */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute w-96 h-96 bg-blue-200 rounded-full opacity-20 blur-3xl -top-20 -left-20"
            animate={{ scale: [1, 1.2, 1], rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute w-96 h-96 bg-purple-200 rounded-full opacity-20 blur-3xl bottom-0 right-0"
            animate={{ scale: [1.2, 1, 1.2], rotate: -360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          />
        </div>

        <motion.div
          className="max-w-3xl w-full bg-white/30 backdrop-blur-lg rounded-3xl shadow-2xl p-10 md:p-16 border border-white/20"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          role="main"
          aria-labelledby="appointment-title"
        >
          <motion.h1
            id="appointment-title"
            className="text-5xl font-bold text-indigo-900 mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            Book Your Appointment
          </motion.h1>

          <AnimatePresence>
            {submitted && (
              <motion.div
                role="alert"
                aria-live="polite"
                className="mb-8 rounded-xl bg-green-100/80 backdrop-blur-sm border border-green-300 text-green-800 px-6 py-4 flex items-center space-x-3"
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
                <p className="font-medium">Appointment booked successfully!</p>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            {[
              {
                label: "Full Name",
                type: "text",
                name: "name",
                placeholder: "Your full name",
                required: true,
              },
              {
                label: "Gmail Address",
                type: "email",
                name: "email",
                placeholder: "example@gmail.com",
                required: true,
              },
              {
                label: "Contact Number",
                type: "tel",
                name: "contact",
                placeholder: "e.g., 9876543210",
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
                  className="block text-sm font-semibold text-indigo-800 mb-2"
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
                  className="w-full rounded-xl bg-white/50 backdrop-blur-sm border border-indigo-200 px-4 py-3 text-gray-900 shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none transition duration-200 hover:border-indigo-400"
                  aria-describedby={
                    field.name === "email" ? "emailHelp" : undefined
                  }
                />
                {field.name === "email" && (
                  <small
                    id="emailHelp"
                    className="text-xs text-gray-600 mt-1 block"
                  >
                    Only Gmail addresses are accepted
                  </small>
                )}
              </motion.div>
            ))}

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              variants={inputVariants}
              custom={3}
              initial="hidden"
              animate="visible"
            >
              <div>
                <label
                  htmlFor="date"
                  className="block text-sm font-semibold text-indigo-800 mb-2"
                >
                  Appointment Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl bg-white/50 backdrop-blur-sm border border-indigo-200 px-4 py-3 text-gray-900 shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none transition duration-200 hover:border-indigo-400"
                />
              </div>

              <div>
                <label
                  htmlFor="time"
                  className="block text-sm font-semibold text-indigo-800 mb-2"
                >
                  Appointment Time <span className="text-red-500">*</span>
                </label>
                <input
                  type="time"
                  id="time"
                  name="time"
                  value={form.time}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl bg-white/50 backdrop-blur-sm border border-indigo-200 px-4 py-3 text-gray-900 shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none transition duration-200 hover:border-indigo-400"
                />
              </div>
            </motion.div>

            <motion.div
              variants={inputVariants}
              custom={4}
              initial="hidden"
              animate="visible"
              whileHover="hover"
            >
              <label
                htmlFor="symptoms"
                className="block text-sm font-semibold text-indigo-800 mb-2"
              >
                Symptoms / Reason for Visit
              </label>
              <textarea
                id="symptoms"
                name="symptoms"
                placeholder="Describe your symptoms or reason for the visit"
                value={form.symptoms}
                onChange={handleChange}
                rows={5}
                className="w-full rounded-xl bg-white/50 backdrop-blur-sm border border-indigo-200 px-4 py-3 text-gray-900 shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none transition duration-200 hover:border-indigo-400 resize-none"
              />
            </motion.div>

            <motion.div
              variants={inputVariants}
              custom={5}
              initial="hidden"
              animate="visible"
            >
              <motion.button
                type="submit"
                disabled={submitted || loading}
                className={`w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:from-indigo-700 hover:to-purple-700 transition disabled:opacity-60 disabled:cursor-not-allowed flex justify-center items-center space-x-2`}
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
                <span>{submitted ? "Request Submitted" : "Book Appointment Now"}</span>
              </motion.button>
            </motion.div>
          </form>
        </motion.div>
      </main>

      <Footer />
    </>
  );
}