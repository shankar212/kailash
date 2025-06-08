import { motion } from "framer-motion";
import { Linkedin, Globe, InstagramIcon } from "lucide-react";

export default function Footer() {
  const socialLinks = [
    { href: "https://www.instagram.com/rathod_kailash_8?igsh=MXcxcnBjZXlrMjE4NQ==", icon: <InstagramIcon size={24} />, label: "Instagram" },
    { href: "https://www.linkedin.com/in/shanker-rathod", icon: <Linkedin size={24} />, label: "LinkedIn" },
    { href: "https://shankerr.me", icon: <Globe size={24} />, label: "Portfolio" },
    
  ];

  return (
    <motion.footer
      initial={{ opacity: 0, y: 80 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="relative bg-gradient-to-r from-cyan-100/90 via-white/95 to-purple-100/90 border-t border-cyan-300/40 mt-20 py-16 shadow-xl backdrop-blur-lg text-gray-800 overflow-hidden"
    >
      {/* Wave Animation Background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute bottom-0 w-full h-20 bg-gradient-to-r from-cyan-300/30 to-purple-300/30"
          animate={{
            y: [0, -10, 0],
            scaleY: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-2 h-2 bg-cyan-400 rounded-full"
          animate={{
            x: [0, 80, -80, 0],
            y: [0, -40, 40, 0],
            opacity: [0.3, 0.9, 0.3],
            scale: [1, 1.6, 1],
          }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          style={{ top: "30%", left: "20%" }}
        />
        <motion.div
          className="absolute w-1.5 h-1.5 bg-purple-400 rounded-full"
          animate={{
            x: [-40, 40, -40],
            y: [40, -40, 40],
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.4, 1],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          style={{ top: "65%", left: "75%" }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 text-center space-y-8 relative z-10">
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          className="flex justify-center items-center gap-5"
        >
          <span className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-purple-600 drop-shadow-[0_0_10px_rgba(207,250,254,0.7)] relative group">
            Dr. Rathod Kailash
            <span className="absolute bottom-0 left-0 w-0 h-[4px] bg-gradient-to-r from-cyan-400 to-purple-500 group-hover:w-full transition-all duration-600 rounded-full glow" />
          </span>
          <motion.span
            animate={{ scale: [1, 1.3, 1], y: [0, -12, 0], rotate: [0, 15, -15, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            className="text-4xl text-pink-500 drop-shadow-[0_0_12px_rgba(244,114,182,0.7)]"
            aria-label="medical"
          >
            🩺
          </motion.span>
        </motion.div>

        <div className="flex justify-center gap-8">
          {socialLinks.map(({ href, icon, label }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-cyan-500 transition-all duration-400 p-4 rounded-full bg-gradient-to-r from-white/60 to-white/80 hover:from-cyan-200/70 hover:to-purple-200/70 backdrop-blur-md shadow-lg hover:shadow-[0_0_20px_rgba(103,232,249,0.8)] relative"
              aria-label={label}
              whileHover={{ scale: 1.3, y: -6, rotate: 8 }}
              whileTap={{ scale: 0.95 }}
            >
              {icon}
              <motion.span
                className="absolute inset-0 rounded-full border border-cyan-400/50"
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.a>
          ))}
        </div>

        <motion.div
          className="h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.5, ease: "easeInOut", delay: 0.4 }}
        />

        <div className="text-sm md:text-base space-y-3">
          <p className="font-semibold text-gray-900">
            © {new Date().getFullYear()} <strong>Dr. Rathod Kailash</strong>. All rights reserved.
          </p>

          

          <p className="text-gray-700">
            Developed by{" "}
            <a
              href="https://shankerr.me"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-600 hover:text-cyan-500 transition-all duration-400 hover:underline relative group"
            ><motion.span
              animate={{
                scale: [1, 1.5, 1],
                filter: ["blur(0px)", "blur(3px)", "blur(0px)"],
                y: [0, -10, 0],
              }}
              transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
              className="inline-block text-pink-500 drop-shadow-[0_0_10px_rgba(244,114,182,0.6)]"
              aria-label="love"
            >
              ❤️
            </motion.span>{" "}
              Shanker Rathod
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-cyan-400 to-purple-400 group-hover:w-full transition-all duration-500 rounded-full glow" />
            </a>
          </p>
        </div>

        {/* Enhanced Styles */}
        <style jsx>{`
          footer {
            background: linear-gradient(
              90deg,
              rgba(207, 250, 254, 0.9),
              rgba(255, 255, 255, 0.95),
              rgba(237, 233, 254, 0.9)
            );
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
          }
          .glow {
            box-shadow: 0 0 12px rgba(103, 232, 249, 0.6);
          }
          a:hover {
            transform: translateY(-3px);
            filter: drop-shadow(0 8px 12px rgba(103, 232, 249, 0.5));
          }
          a:focus {
            outline: none;
            box-shadow: 0 0 0 4px rgba(103, 232, 249, 0.6);
          }
        `}</style>
      </div>
    </motion.footer>
  );
}
