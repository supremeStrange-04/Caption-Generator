import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { AnimatePresence, motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import CaptionGenerator from "./components/CaptionGenerator";
import CaptionCard from "./components/CaptionCard";
import { Caption } from "./types/Caption";

function App() {
  const [captions, setCaptions] = useState<Caption[]>([]);
  const [isDark, setIsDark] = useState(true);

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDark
          ? "bg-gray-900"
          : "bg-gradient-to-br from-indigo-50 to-indigo-100"
      }`}
    >
      <motion.button
        onClick={() => setIsDark(!isDark)}
        className={`fixed z-10 top-4 right-4 p-3 rounded-full shadow-lg transition-colors duration-300 ${
          isDark ? "bg-gray-800 text-yellow-400" : "bg-white text-gray-800"
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isDark ? <Sun size={20} /> : <Moon size={20} />}
      </motion.button>

      <div className="p-4 sm:p-6 md:p-8">
        <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 gap-6">
          <motion.div
            className={`rounded-2xl p-6 shadow-lg backdrop-blur-sm transition-colors duration-300 ${
              isDark
                ? "bg-gray-800/50 border border-gray-700"
                : "bg-white/80 border border-gray-100"
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <CaptionGenerator onGenerate={setCaptions} isDark={isDark} />
          </motion.div>
          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {captions.map((caption, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <CaptionCard caption={caption} isDark={isDark} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: isDark ? "#374151" : "#ffffff",
            color: isDark ? "#ffffff" : "#1f2937",
          },
        }}
      />
    </div>
  );
}

export default App;
