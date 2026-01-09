"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

const BALLOON_EMOJIS = ['🎈','🎉','🎊','🎈','🎉','🎊','🎈','🎉','🎊','🎈'];

export default function BirthdayPage() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  const [balloons, setBalloons] = useState<{emoji: string, x: number, delay: number, duration: number}[]>([]);

  useEffect(() => {
    const width = window.innerWidth - 50; // margin so balloons don't go off-screen
    setBalloons(
      BALLOON_EMOJIS.map((emoji) => ({
        emoji,
        x: Math.random() * width,
        delay: Math.random() * 5,
        duration: 8 + Math.random() * 5,
      }))
    );
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setPlaying(!playing);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-pink-400 via-purple-400 to-indigo-500 p-6 relative overflow-hidden text-center text-3xl">
      <audio ref={audioRef} loop>
        <source src="/music.mp3" type="audio/mpeg" />
      </audio>

      {/* Floating balloons */}
      {balloons.map((b, i) => (
        <motion.div
          key={i}
          initial={{ y: 800, x: b.x }}
          animate={{ y: -200 }}
          transition={{
            duration: b.duration,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear",
            delay: b.delay,
          }}
          className="absolute text-4xl"
        >
          {b.emoji}
        </motion.div>
      ))}

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl max-w-3xl w-full p-12"
      >
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-4xl font-bold text-pink-600"
        >
          Շնորհավոր ծնունդդ <br/>💖 Էվա ջան 💖
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-6 text-xl whitespace-pre-line text-gray-900"
        >
          {`🌸 Թող քո կյանքը միշտ լեցուն լինի ուրախությամբ,🌸
💖 ժպիտներով ու անսահման սիրով, 💖
🎁🎀 իսկ յուրաքանչյուր օրը քեզ նոր հաճելի անակնկալներ բերի 🎁🎀
`}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mt-10 flex flex-col items-center gap-6"
        >
          <button
            onClick={toggleMusic}
            className="px-8 py-4 rounded-full bg-pink-500 text-white font-bold shadow-md hover:bg-pink-600 transition text-xl"
          >
            {playing ? "Pause Music 🎵" : "Play Music 🎶"}
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
