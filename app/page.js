"use client";
import React, { useState } from "react";
import { FaPlay, FaTimes, FaSpinner } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { FaXTwitter } from "react-icons/fa6";

export default function Home() {
  const [email, setEmail] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [consent, setConsent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleJoinWhitelist = () => {
    if (!email.trim()) {
      toast.error("Please enter your email address");
      return;
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async () => {
    if (!consent) {
      toast.error("Please consent to data processing");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post("/api/whitelist", {
        email: email.trim(),
        consent: true,
      });

      toast.success("🎉 Successfully joined the whitelist!");
      setEmail("");
      setConsent(false);
      setIsModalOpen(false);
    } catch (error) {
      const errorMessage = error.response?.data?.error || "An error occurred";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setConsent(false);
  };

  return (
    <div className="h-screen relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/background.png')",
        }}
      />

      <div className="absolute inset-0">
        <img
          src="/rectangle.png"
          alt=""
          className="absolute top-0 left-0 w-full h-full object-cover pointer-events-none opacity-80"
        />
      </div>

      <div className="relative z-10 h-screen flex flex-col">
        <div className="absolute left-2 sm:left-4 md:left-6 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-2 sm:gap-3 md:gap-4">
          <a
            href="#"
            className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-sm border-2 border-white flex items-center justify-center hover:opacity-80 transition-opacity"
            style={{ backgroundColor: "#193361BF" }}
          >
            <FaXTwitter className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-white" />
          </a>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 text-center">
          <div className="mb-6 sm:mb-8 md:mb-12">
            <img
              src="/logo.png"
              alt="Nitro Machines"
              className="h-20 sm:h-24 md:h-28 lg:h-32 xl:h-36 mx-auto drop-shadow-lg filter"
              style={{ filter: "drop-shadow(0 4px 12px rgba(0, 0, 0, 0.3))" }}
            />
          </div>

          <div
            className="mb-6 sm:mb-8"
            style={{ fontFamily: "Sofia Sans Condensed, sans-serif" }}
          >
            <h1
              className="font-black mb-1 sm:mb-2 uppercase text-center leading-none tracking-wider text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl"
              style={{
                fontWeight: 800,
                letterSpacing: "2%",
              }}
            >
              <span style={{ color: "#FFFFFF" }}>YOUR</span>{" "}
              <span style={{ color: "#7BFFF2" }}>RIDE,</span>{" "}
              <span style={{ color: "#FFFFFF" }}>YOUR</span>{" "}
              <span style={{ color: "#7BFFF2" }}>RULES</span>
            </h1>
            <h2
              className="font-black uppercase text-center leading-none tracking-wider text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl"
              style={{
                fontWeight: 800,
                letterSpacing: "2%",
              }}
            >
              <span style={{ color: "#FFEB01" }}>INFINITE</span>{" "}
              <span style={{ color: "#FFFFFF" }}>CUSTOMIZATION</span>
            </h2>
          </div>

          {/* <button
            className="mb-4 sm:mb-6 md:mb-16 px-4 sm:px-6 md:px-8 py-3 sm:py-4 rounded-sm border-2 border-white flex items-center gap-2 sm:gap-3 text-white font-semibold hover:opacity-80 transition-opacity"
            style={{ backgroundColor: "#193361BF" }}
          >
            <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-white rounded-full flex items-center justify-center">
              <FaPlay className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 text-black ml-0.5" />
            </div>
            <span className="text-sm sm:text-base md:text-lg font-bold">
              WATCH TRAILER
            </span>
          </button> */}

          <div className="flex md:hidden justify-center gap-4 mb-8 sm:mb-12">
            <a
              href="#"
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-sm border-2 border-white flex items-center justify-center hover:opacity-80 transition-opacity"
              style={{ backgroundColor: "#193361BF" }}
            >
              <FaXTwitter className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </a>
          </div>
        </div>

        <div className="pb-4 sm:pb-6 md:pb-8 px-4 sm:px-6 md:px-8">
          <div className="max-w-2xl mx-auto flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
            <button
              onClick={handleJoinWhitelist}
              className="hover:opacity-80 transition-opacity h-10 sm:h-12 md:h-14 flex items-center cursor-pointer w-full sm:w-auto justify-center sm:justify-start"
            >
              <img
                src="/button.png"
                alt="JOIN WHITELIST"
                className="h-full w-auto"
              />
            </button>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full sm:flex-1 px-4 sm:px-5 md:px-6 py-2.5 mb-6 sm:mb-0 sm:py-3 h-10 sm:h-11 md:h-12 bg-black/50 backdrop-blur-sm border border-white/20 rounded text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 transition-colors text-base sm:text-lg min-w-0"
            />
          </div>
        </div>

        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: "#1F2937",
              color: "#F9FAFB",
              border: "1px solid #374151",
              borderRadius: "12px",
              backdropFilter: "blur(8px)",
              fontSize: "14px",
            },
            success: {
              style: {
                background: "#059669",
                color: "#FFFFFF",
                border: "1px solid #10B981",
              },
            },
            error: {
              style: {
                background: "#DC2626",
                color: "#FFFFFF",
                border: "1px solid #EF4444",
              },
            },
          }}
        />

        <AnimatePresence>
          {isModalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-md"
              onClick={closeModal}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                onClick={(e) => e.stopPropagation()}
                className="bg-gray-900/95 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-4 sm:p-6 md:p-8 max-w-sm sm:max-w-md w-full mx-4 shadow-2xl"
              >
                <div className="flex justify-between items-center mb-4 sm:mb-5 md:mb-6">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white">
                    Join Whitelist
                  </h3>
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={closeModal}
                    className="text-gray-400 hover:text-white transition-colors p-1.5 sm:p-2 rounded-full hover:bg-gray-800/50"
                  >
                    <FaTimes className="w-3 h-3 sm:w-4 sm:h-4" />
                  </motion.button>
                </div>

                <div className="mb-4 sm:mb-5 md:mb-6">
                  <label className="block text-gray-300 text-xs sm:text-sm font-medium mb-2 sm:mb-3">
                    Email Address
                  </label>
                  <motion.input
                    whileFocus={{ scale: 1.02 }}
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-800/50 backdrop-blur-sm border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 focus:bg-gray-800 transition-all duration-300 text-sm sm:text-base"
                    placeholder="Enter your email"
                    disabled={isLoading}
                  />
                </div>

                <div className="mb-6 sm:mb-7 md:mb-8">
                  <motion.label
                    className="flex items-start gap-3 sm:gap-4 cursor-pointer group"
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="relative mt-0.5 sm:mt-1">
                      <input
                        type="checkbox"
                        checked={consent}
                        onChange={(e) => setConsent(e.target.checked)}
                        className="sr-only"
                        disabled={isLoading}
                      />
                      <motion.div
                        animate={{
                          backgroundColor: consent ? "#FBBF24" : "transparent",
                          borderColor: consent ? "#FBBF24" : "#6B7280",
                          scale: consent ? 1.1 : 1,
                        }}
                        transition={{ duration: 0.2 }}
                        className="w-5 h-5 sm:w-6 sm:h-6 rounded-lg border-2 flex items-center justify-center"
                      >
                        <motion.div
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{
                            opacity: consent ? 1 : 0,
                            scale: consent ? 1 : 0,
                          }}
                          transition={{ duration: 0.2 }}
                          className="text-xs sm:text-sm"
                        >
                          ✓
                        </motion.div>
                      </motion.div>
                    </div>
                    <span className="text-xs sm:text-sm text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors">
                      ✅ I consent to the processing of my email address by{" "}
                      <span className="text-yellow-400 font-medium">
                        Nitro Machines
                      </span>{" "}
                      for project updates and announcements.
                    </span>
                  </motion.label>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={closeModal}
                    className="cursor-pointer flex-1 px-4 sm:px-6 py-2.5 sm:py-3 bg-gray-700/50 backdrop-blur-sm text-white rounded-xl hover:bg-gray-600/50 transition-all duration-300 disabled:opacity-50 text-sm sm:text-base"
                    disabled={isLoading}
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: consent && !isLoading ? 1.02 : 1 }}
                    whileTap={{ scale: consent && !isLoading ? 0.98 : 1 }}
                    onClick={handleSubmit}
                    disabled={!consent || isLoading}
                    className="cursor-pointer flex-1 px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 rounded-xl hover:from-yellow-300 hover:to-yellow-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-semibold text-sm sm:text-base"
                  >
                    {isLoading ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        >
                          <FaSpinner className="w-3 h-3 sm:w-4 sm:h-4" />
                        </motion.div>
                        <span className="text-xs sm:text-sm">Joining...</span>
                      </>
                    ) : (
                      "Join Whitelist"
                    )}
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="fixed bottom-2 left-1/2 transform -translate-x-1/2 sm:left-auto sm:right-4 sm:transform-none z-20">
          <img
            src="/sei-red-white.svg"
            alt="SEI"
            className="h-6 w-auto sm:h-8 md:h-10 opacity-90 hover:opacity-100 transition-opacity duration-300"
          />
        </div>
      </div>
    </div>
  );
}
