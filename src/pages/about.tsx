import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion} from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 80 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } },
};

const underlineGrow = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: { scaleX: 1, opacity: 1, transition: { duration: 1.2, ease: "easeInOut" } },
};

const textReveal = {
  hidden: { opacity: 0, width: 0 },
  visible: { opacity: 1, width: "auto", transition: { duration: 1.4, ease: "easeOut" } },
};

export default function About() {
  const [hoveredQualification, setHoveredQualification] = useState<number | null>(null);
  const [hoveredExpertise, setHoveredExpertise] = useState<number | null>(null);

  return (
    <>
      <Navbar />

      <main className="relative min-h-screen py-32 px-6 sm:px-10 lg:px-16 overflow-hidden bg-gradient-to-br from-indigo-100/90 via-purple-100/90 to-pink-100/90">
        {/* Enhanced Cosmic Background */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <motion.div
            className="w-full h-full bg-gradient-to-br from-indigo-300/40 via-purple-300/40 to-pink-300/40 animate-starfield"
            animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          >
            <motion.div
              className="absolute w-[80rem] h-[80rem] bg-indigo-400/25 rounded-full blur-5xl -top-[20rem] -left-[20rem]"
              animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute w-[70rem] h-[70rem] bg-pink-400/25 rounded-full blur-4xl -bottom-[15rem] right-[-10rem]"
              animate={{ scale: [1, 1.4, 1], opacity: [0.2, 0.7, 0.2] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute w-[60rem] h-[60rem] bg-purple-400/25 rounded-full blur-3xl top-1/4 left-1/3"
              animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.6, 0.2] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
            {/* Glowing Particles */}
            {[...Array(40)].map((_, i) => (
              <motion.div
                key={`particle-${i}`}
                className="absolute rounded-full bg-gradient-to-r from-indigo-500/60 to-pink-500/60"
                style={{
                  width: `${Math.random() * 12 + 6}px`,
                  height: `${Math.random() * 12 + 6}px`,
                  left: `${Math.random() * 100}%`,
                  bottom: `-${Math.random() * 200}px`,
                }}
                animate={{ y: [-200, -1800], opacity: [0.4, 1, 0], scale: [1, 1.5, 1] }}
                transition={{ duration: Math.random() * 7 + 5, repeat: Infinity, delay: Math.random() * 4 }}
              />
            ))}
            {/* Sparkles */}
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={`sparkle-${i}`}
                className="sparkle"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
                animate={{ scale: [0.7, 1.8, 0.7], opacity: [0.5, 1, 0.5], rotate: [0, 360] }}
                transition={{ duration: 3, repeat: Infinity, delay: Math.random() * 2.5 }}
              />
            ))}
          </motion.div>
        </div>

        <motion.div
          className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.5 } },
          }}
        >
          {/* Holographic Doctor Image with Glow */}
          <motion.div
            className="relative rounded-3xl shadow-2xl overflow-hidden border-2 border-indigo-400/50 cursor-pointer"
            whileHover={{ scale: 1.08, rotateX: 8, rotateY: 8, boxShadow: "0 30px 60px rgba(99, 102, 241, 0.5)" }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            variants={fadeInUp}
            tabIndex={0}
            aria-label="Image of Dr. Rathod Kailash"
          >
            <Image
              src="/doctor1.png"
              alt="Dr. Rathod Kailash"
              width={500}
              height={600}
              className="object-cover"
              priority
              draggable={false}
            />
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-indigo-600/30 to-transparent"
              animate={{ opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute inset-0 border-2 border-gradient-to-r from-indigo-500 to-purple-500 rounded-3xl"
              animate={{ borderColor: ["rgba(99, 102, 241, 0.6)", "rgba(168, 85, 247, 0.6)", "rgba(99, 102, 241, 0.6)"] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            />
            {/* Image Particles */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={`image-particle-${i}`}
                className="absolute rounded-full bg-indigo-400/40"
                style={{
                  width: `${Math.random() * 10 + 5}px`,
                  height: `${Math.random() * 10 + 5}px`,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
                animate={{ y: [-30, -50, 0], opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: Math.random() * 4 + 2, repeat: Infinity, delay: Math.random() * 3 }}
              />
            ))}
          </motion.div>

          {/* Holographic Text Card with Glassmorphism */}
          <motion.div
            variants={fadeInUp}
            className="bg-white/20 dark:bg-gray-900/20 p-10 sm:p-14 rounded-2xl shadow-xl backdrop-blur-xl border border-indigo-300/30"
            whileHover={{ scale: 1.03, boxShadow: "0 25px 50px rgba(99, 102, 241, 0.6)" }}
            transition={{ type: "spring", stiffness: 350 }}
          >
            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-8 relative inline-block overflow-hidden"
              whileHover={{ scale: 1.05 }}
              variants={textReveal}
              transition={{ type: "spring", stiffness: 400 }}
            >
              Meet Dr. Rathod Kailash
              <motion.span
                className="absolute left-0 bottom-0 w-full h-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full"
                initial="hidden"
                animate="visible"
                variants={underlineGrow}
                style={{ originX: 0 }}
              />
            </motion.h1>

            <p className="text-lg sm:text-xl text-gray-800 dark:text-gray-200 mb-8 leading-relaxed">
              Dr. Rathod Kailash is a renowned General Practitioner with over 3 years of experience, committed to providing personalized, compassionate healthcare. His expertise includes family medicine, preventive care, and chronic illness management.
            </p>
            <p className="text-lg sm:text-xl text-gray-800 dark:text-gray-200 mb-12 leading-relaxed">
              Trained ar Rajiv Gandhi Institute Of Medical Sciences (RIMS) Adilbad, Dr. Kailash is celebrated for his patient-centered approach, exceptional diagnostic skills, and dedication to advancing medical care through innovation.
            </p>

            <motion.div
              className="mb-12"
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 350 }}
            >
              <h2 className="text-2xl sm:text-3xl font-semibold text-indigo-600 dark:text-indigo-400 mb-6 relative inline-block">
                Qualifications
                <motion.span
                  className="absolute left-0 bottom-0 w-28 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </h2>
              <ul className="list-disc list-inside space-y-4 text-gray-800 dark:text-gray-200 text-lg sm:text-xl">
                {[
                  "MPHA ",
                  "Diploma in Family Medicine",
                
                ].map((item, i) => (
                  <motion.li
                    key={`qualification-${i}`}
                    onHoverStart={() => setHoveredQualification(i)}
                    onHoverEnd={() => setHoveredQualification(null)}
                    animate={{
                      x: hoveredQualification === i ? 15 : 0,
                      color: hoveredQualification === i ? "#6366f1" : "#1f2937",
                      scale: hoveredQualification === i ? 1.05 : 1,
                    }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              className="mb-16"
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 350 }}
            >
              <h2 className="text-2xl sm:text-3xl font-semibold text-indigo-600 dark:text-indigo-400 mb-6 relative inline-block">
                Areas of Expertise
                <motion.span
                  className="absolute left-0 bottom-0 w-32 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </h2>
              <ul className="list-disc list-inside space-y-4 text-gray-800 dark:text-gray-200 text-lg sm:text-xl">
                {[
                  "General Health Checkups",
                  "Chronic Disease Management (Diabetes, Hypertension)",
                  "Preventive Healthcare & Vaccinations",
                  "Minor Procedures & Wound Care",
                   "Nutrition Education",
                  "Health Education & Counseling",
                  "Prevention of communicable diseases",
                  "Family Medicine",
                  "Geriatric Care",
                  
                ].map((item, i) => (
                  <motion.li
                    key={`expertise-${i}`}
                    onHoverStart={() => setHoveredExpertise(i)}
                    onHoverEnd={() => setHoveredExpertise(null)}
                    animate={{
                      x: hoveredExpertise === i ? 15 : 0,
                      color: hoveredExpertise === i ? "#6366f1" : "#1f2937",
                      scale: hoveredExpertise === i ? 1.05 : 1,
                    }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <p className="text-lg sm:text-xl text-gray-800 dark:text-gray-200 mb-10">
              Dr. Kailash is passionate about fostering trust and delivering exceptional, tailored care. Your health is his mission, driven by innovation and compassion.
            </p>

            <motion.div
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Link href="/appointment" passHref legacyBehavior>
                <motion.button
                  className="relative px-10 py-4 text-lg font-semibold text-white bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full shadow-xl hover:from-indigo-600 hover:to-purple-700 hover:shadow-[0_0_25px_rgba(99,102,241,0.8)] transition-all duration-300"
                  aria-label="Book an Appointment"
                >
                  Book an Appointment
                  <motion.div
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0"
                    animate={{ x: ["-100%", "100%"], opacity: [0, 0.4, 0] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                  />
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </main>

      <Footer />

      <style jsx global>{`
        @keyframes starfield {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-starfield {
          background-size: 500% 500%;
          animation: starfield 12s ease infinite;
        }

        @keyframes float-particle {
          0% { transform: translateY(0) scale(1); opacity: 0.4; }
          50% { opacity: 1; }
          100% { transform: translateY(-1800px) scale(1.5); opacity: 0; }
        }

        @keyframes sparkle {
          0% { transform: scale(0.7) rotate(0deg); opacity: 0.5; }
          50% { transform: scale(1.8) rotate(180deg); opacity: 1; }
          100% { transform: scale(0.7) rotate(360deg); opacity: 0.5; }
        }
        .sparkle {
          animation: sparkle 3s infinite;
          pointer-events: none;
          position: absolute;
          background: radial-gradient(circle, rgba(255, 255, 255, 0.9) 10%, rgba(99, 102, 241, 0.7) 90%);
          width: 10px;
          height: 10px;
          border-radius: 50%;
          box-shadow: 0 0 20px rgba(99, 102, 241, 0.8);
        }
      `}</style>
    </>
  );
}
