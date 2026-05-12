/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState, useRef } from 'react';
import { motion } from 'motion/react';
import Marquee from 'react-fast-marquee';
import confetti from 'canvas-confetti';
import { PartyPopper, Sparkles, Star, Music, Heart, Gift } from 'lucide-react';

export default function App() {
  const [mounted, setMounted] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [velocity, setVelocity] = useState(0);
  const spinRef = useRef<number | null>(null);
  const velocityRef = useRef(0);

  useEffect(() => {
    setMounted(true);
    triggerConfetti();

    // Continuous random confetti
    const interval = setInterval(() => {
      randomConfetti();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // 物理旋轉邏輯
  useEffect(() => {
    velocityRef.current = velocity;
  }, [velocity]);

  useEffect(() => {
    if (velocity === 0) return;

    const updateRotation = () => {
      setRotation((prev) => {
        const newRotation = (prev + velocityRef.current) % 360;
        return newRotation;
      });

      setVelocity((prev) => {
        // 漸進減速，模擬摩擦力
        const newVelocity = prev * 0.97;

        // 當速度足夠小時停止旋轉
        if (Math.abs(newVelocity) < 0.1) {
          return 0;
        }
        return newVelocity;
      });

      spinRef.current = requestAnimationFrame(updateRotation);
    };

    spinRef.current = requestAnimationFrame(updateRotation);

    return () => {
      if (spinRef.current !== null) {
        cancelAnimationFrame(spinRef.current);
      }
    };
  }, []);

  const triggerConfetti = () => {
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  const randomConfetti = () => {
    confetti({
      angle: Math.random() * 360,
      spread: Math.random() * 60 + 30,
      particleCount: Math.random() * 50 + 50,
      origin: {
        x: Math.random(),
        y: Math.random() - 0.2
      },
      colors: ['#ff00de', '#00ffff', '#fffc00', '#ffffff'],
      disableForReducedMotion: true
    });
  };

  const handlePhotoClick = () => {
    // 基礎旋轉速度 (度數/幀)
    const baseSpeed = 15;

    // 每次點擊增加速度
    const newVelocity = baseSpeed + Math.random() * 10;

    setVelocity(newVelocity);

    // 觸發一個慶祝效果
    randomConfetti();
  };

  const letters = "邱毓庭".split('');

  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-hidden font-sans relative selection:bg-pink-500 selection:text-white pb-20">
      
      {/* Background radial gradients for extra flair */}
      <div className="fixed inset-0 z-0 pointer-events-none flex justify-center items-center">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-fuchsia-600/20 blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-cyan-600/20 blur-[120px] animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10">
        
        {/* Top Marquee */}
        <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 py-3 shadow-[0_0_20px_rgba(236,72,153,0.5)] transform -skew-y-2 mt-8 z-20">
          <Marquee speed={80} gradient={false} className="overflow-hidden">
            <span className="text-2xl md:text-4xl font-black uppercase tracking-widest mx-4 text-white drop-shadow-md flex items-center gap-4">
              <Sparkles className="text-yellow-300" /> HAPPY 22ND BIRTHDAY <Sparkles className="text-yellow-300" />
            </span>
            <span className="text-2xl md:text-4xl font-black uppercase tracking-widest mx-4 text-white drop-shadow-md flex items-center gap-4">
              <Star className="text-yellow-300" /> 邱毓庭 生日快樂 <Star className="text-yellow-300" />
            </span>
            <span className="text-2xl md:text-4xl font-black uppercase tracking-widest mx-4 text-white drop-shadow-md flex items-center gap-4">
              <PartyPopper className="text-yellow-300" /> 2004.05.12 <PartyPopper className="text-yellow-300" />
            </span>
            <span className="text-2xl md:text-4xl font-black uppercase tracking-widest mx-4 text-white drop-shadow-md flex items-center gap-4">
              <Heart className="text-yellow-300" fill="currentColor" /> 好黑 <Heart className="text-yellow-300" fill="currentColor" />
            </span>
          </Marquee>
        </div>

        <div className="container mx-auto px-4 mt-16 md:mt-24 flex flex-col items-center">
          
          {/* Main Title Animation */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.5 }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-4 tracking-widest uppercase">
              Welcome to the era of 22
            </h2>
            
            <div className="flex justify-center flex-wrap gap-2 md:gap-4 my-8">
              {letters.map((letter, index) => (
                <motion.span
                  key={index}
                  initial={{ y: -100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ 
                    delay: 0.5 + (index * 0.2), 
                    type: "spring", 
                    stiffness: 100 
                  }}
                  className={`text-6xl md:text-[8rem] font-black animate-neon-pulse
                    ${index === 0 ? 'neon-text-pink' : index === 1 ? 'neon-text-cyan' : 'neon-text-yellow'}`}
                  style={{ display: 'inline-block' }}
                  whileHover={{ scale: 1.2, rotate: (Math.random() - 0.5) * 20 }}
                >
                  {letter}
                </motion.span>
              ))}
            </div>
            
            <motion.h1 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 1 }}
              className="text-5xl md:text-7xl font-bold mt-4 neon-text-pink"
            >
              HAPPY BIRTHDAY!
            </motion.h1>
          </motion.div>

          {/* Photo Section with 3D Float Effect */}
          <motion.div 
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.8, type: "spring" }}
            className="mt-16 md:mt-24 relative group"
          >
            {/* Cool background frames for the photo */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-pink-500 to-yellow-400 rounded-3xl transform rotate-3 scale-105 group-hover:rotate-6 transition-transform duration-300 opacity-70 animate-pulse"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500 to-blue-600 rounded-3xl transform -rotate-3 scale-105 group-hover:-rotate-6 transition-transform duration-300 opacity-70"></div>
            
            <div
              className="relative bg-black p-2 rounded-3xl z-10 animate-float border-4 border-transparent bg-clip-padding cursor-pointer select-none transition-transform"
              style={{
                borderImage: 'linear-gradient(to right, #00ffff, #ff00de) 1',
                transform: `rotate(${rotation}deg)`,
                transformOrigin: 'center'
              }}
              onClick={handlePhotoClick}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handlePhotoClick();
                }
              }}
            >
              <div className="relative overflow-hidden rounded-2xl w-[280px] h-[350px] md:w-[400px] md:h-[500px] bg-zinc-900 flex items-center justify-center border-2 border-zinc-800">
                {/*
                  Note: Using a placeholder visually if the image path isn't perfectly mapped.
                  In AI Studio, you can drag your photo into the file explorer and name it photo.jpg
                  to replace this. Or just rely on the assumption that we format it as 'photo.jpg'.
                */}
                <img
                  src={`${import.meta.env.BASE_URL}photo.jpg`}
                  alt="邱毓庭帥照/美照"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-110 pointer-events-none"
                  onError={(e) => {
                    // Fallback visually if image not found
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement?.classList.add('bg-gradient-animated');
                    if (e.currentTarget.parentElement) {
                      e.currentTarget.parentElement.innerHTML = '<div class="text-center p-6"><div class="text-6xl mb-4">🎂</div><p class="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">請在專案中上傳<br/>photo.jpg</p></div>';
                    }
                  }}
                />
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60"></div>
                
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-2xl font-bold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] flex items-center gap-2">
                    <Music size={24} className="text-pink-400 animate-bounce" />
                    Rocking at 22
                  </p>
                </div>
              </div>
            </div>
            
            <motion.div 
              className="absolute -right-12 -top-12 z-20"
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            >
              <div className="bg-yellow-400 text-black font-black w-24 h-24 rounded-full flex items-center justify-center flex-col shadow-[0_0_30px_#fffc00] transform -rotate-12 border-4 border-white">
                <span className="text-sm">EST.</span>
                <span className="text-xl">2004</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Interactive Blast Button */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3, duration: 1 }}
            className="mt-20 z-20 flex flex-col items-center"
          >
            <p className="text-gray-400 mb-6 flex justify-center w-full uppercase tracking-widest text-sm text-center">
              Tap the button for a surprise
            </p>
            <button 
              onClick={triggerConfetti}
              className="group relative px-8 py-4 font-bold text-white rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 overflow-hidden transform hover:scale-110 transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,255,255,0.8)] active:scale-95"
            >
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-pink-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <span className="relative z-10 flex items-center gap-3 text-xl">
                <Gift size={24} className="group-hover:animate-bounce" /> 
                GIVE ME MORE MAGIC! 
                <Sparkles size={24} className="group-hover:animate-spin" />
              </span>
            </button>
          </motion.div>

        </div>
        
        {/* Bottom Marquee */}
        <div className="fixed bottom-0 left-0 w-full bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 py-2 z-50 shadow-[0_0_15px_rgba(255,200,0,0.5)]">
          <Marquee speed={60} gradient={false} direction="right">
            {Array.from({ length: 10 }).map((_, i) => (
              <span key={i} className="text-lg md:text-xl font-bold uppercase mx-8 text-black drop-shadow-sm flex items-center gap-2">
                22 YEARS OF AWESOME 🚀
              </span>
            ))}
          </Marquee>
        </div>

      </div>
    </div>
  );
}
