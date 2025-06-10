import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

// Enhanced 3D tilt effect on cards with glow
const cardHover3D = {
  scale: 1.1,
  rotateX: -8,
  rotateY: 8,
  boxShadow: "0 20px 40px rgba(99, 102, 241, 0.4), 0 0 20px rgba(168, 85, 247, 0.3)",
  transition: { duration: 0.4, ease: "easeOut" },
};

// Stagger animation for cards container with spring effect
const cardsContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.25,
      delayChildren: 0.3,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.85 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: "easeOut", type: "spring", bounce: 0.4 },
  },
};

// Floating shapes with parallax and glow
const floatingShapeVariants = {
  float: {
    y: [0, -30, 0],
    x: [0, 20, 0],
    rotate: [0, 20, 0],
    scale: [1, 1.1, 1],
    transition: {
      duration: 7,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

// Hero text animation with letter stagger
const heroTextVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03,
    },
  },
};

const letterVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function Home() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, 50]);

  // Split text into letters for animation
  const heroText = "Dr. Rathod Kailash Compassionate Care, Trusted Expertise";
  const heroLetters = heroText.split("");

  return (
    <>
      <Navbar />

      <main
        ref={ref}
        className="relative bg-gradient-to-br from-indigo-50 via-white to-purple-100 min-h-screen flex flex-col items-center justify-center px-6 py-16 md:py-24 overflow-hidden select-none"
      >
        {/* Enhanced animated floating gradient shapes with parallax */}
        <motion.div
          className="absolute top-5 left-5 w-56 h-56 bg-gradient-to-tr from-indigo-500 to-cyan-400 rounded-full opacity-25 blur-3xl"
          variants={floatingShapeVariants}
          animate="float"
          style={{
            filter: "drop-shadow(0 0 15px rgba(6, 182, 212, 0.8))",
            zIndex: 0,
          }}
        />
        <motion.div
          className="absolute bottom-10 right-5 w-72 h-72 bg-gradient-to-tr from-purple-500 to-pink-600 rounded-full opacity-20 blur-3xl"
          variants={floatingShapeVariants}
          animate="float"
          transition={{ duration: 9, repeatDelay: 1 }}
          style={{
            filter: "drop-shadow(0 0 25px rgba(236, 72, 153, 0.7))",
            zIndex: 0,
          }}
        />
        <motion.div
          className="absolute top-1/3 left-1/4 w-48 h-48 bg-gradient-to-br from-pink-400 to-orange-400 rounded-full opacity-15 blur-3xl"
          variants={floatingShapeVariants}
          animate="float"
          transition={{ duration: 8, repeatDelay: 2 }}
          style={{
            filter: "drop-shadow(0 0 20px rgba(251, 113, 133, 0.6))",
            zIndex: 0,
          }}
        />

        <motion.div
          className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10"
          style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 1, ease: "easeOut" },
            },
          }}
        >
          {/* Left Text Section with Staggered Letters */}
          <div>
            <motion.h1
              className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 via-purple-600 to-pink-600 drop-shadow-lg"
              variants={heroTextVariants}
              initial="hidden"
              animate="visible"
              aria-label="Welcome to Dr. Rathod Kailash Clinic"
            >
              {heroLetters.map((letter, index) => (
                <motion.span key={index} variants={letterVariants}>
                  {letter}
                </motion.span>
              ))}
            </motion.h1>
            <motion.div
              className="h-1 w-full max-w-sm rounded-full bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 shadow-lg"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
            />
            <motion.p
              className="text-lg md:text-xl text-gray-700 mt-8 mb-8 drop-shadow-sm max-w-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
            >
              Expert healthcare and personalized treatment from a trusted General Practitioner. Caring for you and your family with compassion and advanced medical knowledge.
            </motion.p>
            <div className="flex space-x-6">
              <motion.a
                href="/appointment"
                whileHover={{
                  scale: 1.15,
                  boxShadow: "0 0 40px rgba(168, 85, 247, 0.9), 0 0 20px rgba(99, 102, 241, 0.5)",
                  backgroundImage:
                    "linear-gradient(45deg, #4f46e5, #a855f7, #ec4899)",
                }}
                whileTap={{ scale: 0.9 }}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-xl text-lg font-semibold shadow-xl transition-all duration-300"
              >
                Book an Appointment
              </motion.a>
              <motion.a
                href="/contact"
                whileHover={{
                  scale: 1.15,
                  boxShadow: "0 0 30px rgba(168, 85, 247, 0.6)",
                  backgroundColor: "rgba(168, 85, 247, 0.2)",
                }}
                whileTap={{ scale: 0.9 }}
                className="border-2 border-purple-600 text-purple-600 px-8 py-3 rounded-xl text-lg font-semibold hover:bg-purple-100 transition-all duration-300"
              >
                Contact Us
              </motion.a>
            </div>
          </div>

          {/* Right Image Section with Parallax and Glow */}
          <motion.div
            className="flex justify-center md:justify-end"
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          >
            <motion.div
              whileHover={{
                scale: 1.08,
                rotate: 3,
                boxShadow: "0 25px 50px rgba(168, 85, 247, 0.6), 0 0 30px rgba(99, 102, 241, 0.4)",
              }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              className="rounded-2xl overflow-hidden shadow-2xl cursor-pointer relative"
              aria-label="Doctor working image"
            >
              <Image
                src="/doctor4.png"
                alt="Doctor Working"
                width={500}
                height={450}
                draggable={false}
                className="rounded-2xl object-cover"
                priority
              />
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-indigo-500/20 to-transparent"
                animate={{ opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Features Section with Enhanced Animations */}
        <motion.section
          className="mt-24 w-full max-w-6xl relative z-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: { opacity: 0, y: 60 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 1, ease: "easeOut", delay: 0.4 },
            },
          }}
          aria-label="Why Choose Us features section"
        >
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12 relative inline-block drop-shadow-md">
            Why Choose Us?
            <motion.span
              className="absolute left-1/2 transform -translate-x-1/2 bottom-0 w-32 h-1 rounded-full shadow-lg"
              style={{
                background:
                  "linear-gradient(270deg, #a855f7, #3b82f6, #ec4899, #a855f7)",
                backgroundSize: "600% 600%",
                animation: "shimmerGradient 5s ease-in-out infinite",
              }}
            />
          </h2>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center"
            variants={cardsContainerVariants}
            initial="hidden"
            animate="visible"
          >
            {[
              {
                src: "/icons/logo1.jpg",
                alt: "Experience Icon",
                title: "Experienced Care",
                desc: "Over 3 years of trusted medical expertise in general practice.",
              },
              {
                src: "/icons/logo2.jpg",
                alt: "Compassion Icon",
                title: "Compassionate Approach",
                desc: "Personalized treatments focused on your well-being and comfort.",
              },
              {
                src: "/icons/logo3.webp",
                alt: "Technology Icon",
                title: "Advanced Technology",
                desc: "Utilizing the latest medical tools and AI for precise diagnosis.",
              },
            ].map(({ src, alt, title, desc }) => (
              <motion.div
                key={title}
                className="bg-white p-8 rounded-2xl shadow-xl cursor-pointer select-none border border-transparent hover:border-purple-400 transition-all duration-300 bg-opacity-90 backdrop-blur-sm"
                whileHover={cardHover3D}
                variants={cardVariants}
                tabIndex={0}
                role="button"
                aria-label={`Feature: ${title}`}
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Image
                    src={src}
                    alt={alt}
                    width={160}
                    height={160}
                    className="mx-auto mb-6 rounded-full object-cover shadow-md"
                    draggable={false}
                  />
                </motion.div>
                <h3 className="text-2xl font-bold mb-3 text-gray-800 drop-shadow-sm">
                  {title}
                </h3>
                <p className="text-gray-600 text-lg">{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* Shimmer Gradient Keyframe */}
        <style jsx global>{`
          @keyframes shimmerGradient {
            0% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
            100% {
              background-position: 0% 50%;
            }
          }
        `}</style>
      </main>

      <Footer />
    </>
  );
}
