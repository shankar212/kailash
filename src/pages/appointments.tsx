import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  collection,
  query,
  orderBy,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../lib/firebase";

type Appointment = {
  id: string;
  name: string;
  email: string;
  contact?: string;
  date: string;
  time: string;
  symptoms: string;
  createdAt: any;
  status: "upcoming" | "completed" | "cancelled";
};

export default function Appointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"upcoming" | "past" | "all">("upcoming");
  const [isDoctorLoggedIn, setIsDoctorLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const loggedIn = localStorage.getItem("isDoctorLoggedIn") === "true";
    setIsDoctorLoggedIn(loggedIn);

    if (!loggedIn) {
      router.replace("/login");
      return;
    }

    fetchAppointments();
  }, [router]);

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const appointmentsRef = collection(db, "appointments");
      const q = query(appointmentsRef, orderBy("date"), orderBy("time"));
      const querySnapshot = await getDocs(q);

      const appts: Appointment[] = [];
      querySnapshot.forEach((docSnap) => {
        const data = docSnap.data();
        appts.push({
          id: docSnap.id,
          name: data.name,
          email: data.email,
          contact: data.contact || "",
          date: data.date,
          time: data.time,
          symptoms: data.symptoms || "",
          createdAt: data.createdAt,
          status: data.status || "upcoming",
        });
      });

      setAppointments(appts);
    } catch (error) {
      console.error("Failed to fetch appointments:", error);
      alert("Failed to load appointments.");
    }
    setLoading(false);
  };

  const filteredAppointments = appointments.filter((appt) => {
    const apptDateTime = new Date(`${appt.date}T${appt.time}`);
    const now = new Date();

    if (filter === "upcoming") {
      return appt.status === "upcoming" && apptDateTime >= now;
    }
    if (filter === "past") {
      return apptDateTime < now || appt.status === "completed" || appt.status === "cancelled";
    }
    return true;
  });

  const markCompleted = async (id: string) => {
    try {
      const apptRef = doc(db, "appointments", id);
      await updateDoc(apptRef, { status: "completed" });
      fetchAppointments();
    } catch (error) {
      console.error("Error updating appointment:", error);
      alert("Failed to update appointment status.");
    }
  };

  const cancelAppointment = async (id: string) => {
    if (!confirm("Are you sure you want to cancel this appointment?")) return;

    try {
      const apptRef = doc(db, "appointments", id);
      await updateDoc(apptRef, { status: "cancelled" });
      fetchAppointments();
    } catch (error) {
      console.error("Error cancelling appointment:", error);
      alert("Failed to cancel appointment.");
    }
  };

  const logout = () => {
    localStorage.removeItem("isDoctorLoggedIn");
    router.replace("/login");
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.1 * i, duration: 0.5, ease: "easeOut" },
    }),
    hover: { scale: 1.03, boxShadow: "0px 8px 24px rgba(236, 72, 153, 0.4)" },
  };

  const buttonVariants = {
    hover: { scale: 1.05, boxShadow: "0px 4px 12px rgba(236, 72, 153, 0.3)" },
    tap: { scale: 0.95 },
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-pink-50/90 via-purple-50/90 to-blue-50/90 dark:from-gray-900/90 dark:via-purple-900/90 dark:to-blue-900/90 px-6 py-12 relative overflow-hidden">
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
          className="max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          role="main"
          aria-labelledby="appointments-title"
        >
          <div className="flex justify-between items-center mb-10">
            <motion.h1
              id="appointments-title"
              className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-blue-600 drop-shadow-md select-none"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Scheduled Appointments
              <motion.span
                className="absolute left-0 right-0 mx-auto bottom-0 w-48 h-1 bg-gradient-to-r from-pink-500 to-blue-500 rounded-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </motion.h1>
            <motion.button
              onClick={logout}
              
            >

            </motion.button>
          </div>

          {/* Filter Buttons with Sliding Underline */}
          <motion.div
            className="relative flex justify-center mb-10 select-none"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {["upcoming", "past", "all"].map((f) => (
              <motion.button
                key={f}
                onClick={() => setFilter(f as any)}
                className={`px-6 py-2 text-lg font-medium relative z-10
                  ${
                    filter === f
                      ? "text-white bg-gradient-to-r from-pink-600 to-blue-600 rounded-full"
                      : "text-pink-700 dark:text-blue-300 hover:text-pink-900 dark:hover:text-blue-400"
                  }
                  transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-pink-400 dark:focus:ring-blue-400`}
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                aria-pressed={filter === f}
                type="button"
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </motion.button>
            ))}
            <motion.span
              className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-pink-500 to-blue-500 rounded-full"
              style={{
                width: "calc(100% / 3)",
                transform:
                  filter === "upcoming"
                    ? "translateX(0%)"
                    : filter === "past"
                    ? "translateX(100%)"
                    : "translateX(200%)",
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            />
          </motion.div>

          {loading ? (
            <motion.div
              className="flex justify-center mt-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <svg
                className="animate-spin h-12 w-12 text-pink-600 dark:text-blue-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                aria-label="Loading spinner"
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
                  d="M4 12a8 8 0 018-8v8H4z"
                ></path>
              </svg>
            </motion.div>
          ) : filteredAppointments.length === 0 ? (
            <motion.p
              className="text-center text-gray-600 dark:text-gray-300 text-xl mt-20 select-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              No appointments found.
            </motion.p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredAppointments.map((appt, i) => {
                const apptDateTime = new Date(`${appt.date}T${appt.time}`);
                const now = new Date();

                const statusColors = {
                  upcoming: "bg-blue-100/80 dark:bg-blue-900/80 text-blue-800 dark:text-blue-200 border-blue-300 dark:border-blue-600",
                  completed: "bg-green-100/80 dark:bg-green-900/80 text-green-800 dark:text-green-200 border-green-300 dark:border-green-600",
                  cancelled: "bg-red-100/80 dark:bg-red-900/80 text-red-800 dark:text-red-200 border-red-300 dark:border-red-600",
                };

                return (
                  <motion.article
                    key={appt.id}
                    custom={i}
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    className={`
                      bg-white/30 dark:bg-gray-900/30 rounded-2xl p-6 shadow-lg backdrop-blur-xl border
                      relative overflow-hidden
                      ${statusColors[appt.status]}
                      ${appt.status === "cancelled" ? "opacity-60 line-through" : ""}
                    `}
                    role="region"
                    aria-label={`Appointment with ${appt.name} on ${appt.date} at ${appt.time}`}
                  >
                    <div className="flex justify-between items-center mb-3">
                      <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 truncate">
                        {appt.name}
                      </h2>
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-sm font-semibold select-none ${statusColors[appt.status]}`}
                        aria-live="polite"
                        aria-atomic="true"
                      >
                        {appt.status.charAt(0).toUpperCase() + appt.status.slice(1)}
                      </span>
                    </div>

                    <p className="text-gray-700 dark:text-gray-300 mb-1 font-mono select-text">
                      <span className="font-semibold">Email: </span>
                      <a href={`mailto:${appt.email}`} className="text-pink-600 dark:text-blue-400 hover:underline">
                        {appt.email}
                      </a>
                    </p>

                    {appt.contact && (
                      <p className="text-gray-700 dark:text-gray-300 mb-1 font-mono select-text">
                        <span className="font-semibold">Contact: </span>
                        <a href={`tel:${appt.contact}`} className="text-pink-600 dark:text-blue-400 hover:underline">
                          {appt.contact}
                        </a>
                      </p>
                    )}

                    <p className="text-gray-700 dark:text-gray-300 mb-4 whitespace-pre-wrap select-text">
                      <span className="font-semibold">Symptoms: </span>
                      {appt.symptoms || "N/A"}
                    </p>

                    <p className="mb-4 text-gray-600 dark:text-gray-400 font-mono select-text">
                      <span className="font-semibold">Date & Time: </span>
                      {appt.date} at {appt.time}
                    </p>

                    {appt.status === "upcoming" && apptDateTime >= now && (
                      <div className="flex space-x-4">
                        <motion.button
                          onClick={() => markCompleted(appt.id)}
                          className="flex-1 px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl shadow hover:from-green-600 hover:to-green-700 hover:shadow-[0_0_15px_rgba(34,197,94,0.8)] transition duration-300"
                          variants={buttonVariants}
                          whileHover="hover"
                          whileTap="tap"
                          aria-label={`Mark appointment with ${appt.name} as completed`}
                        >
                          Mark Completed
                        </motion.button>
                        <motion.button
                          onClick={() => cancelAppointment(appt.id)}
                          className="flex-1 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl shadow hover:from-red-600 hover:to-red-700 hover:shadow-[0_0_15px_rgba(239,68,68,0.8)] transition duration-300"
                          variants={buttonVariants}
                          whileHover="hover"
                          whileTap="tap"
                          aria-label={`Cancel appointment with ${appt.name}`}
                        >
                          Cancel
                        </motion.button>
                      </div>
                    )}
                  </motion.article>
                );
              })}
            </div>
          )}
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
    </>
  );
}