import { useState } from 'react';
import { useNavigate, Routes, Route, useLocation } from 'react-router-dom';
import { Lightbulb } from 'lucide-react';
import Layout from './components/Layout';
import Home from './pages/Home';
import Game from './pages/Game';
import Result from './pages/Result';
import Guide from './pages/Guide';
import NotFound from './pages/NotFound';

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const isWelcomePage = location.pathname === '/';

  const playAmbientSound = () => {
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const audioContext = new AudioContextClass();
      const now = audioContext.currentTime;

      const lowFreq = audioContext.createOscillator();
      const lowGain = audioContext.createGain();
      lowFreq.connect(lowGain);
      lowGain.connect(audioContext.destination);
      lowFreq.frequency.value = 60;
      lowFreq.type = 'sine';
      lowGain.gain.setValueAtTime(0.15, now);
      lowGain.gain.exponentialRampToValueAtTime(0.01, now + 1.5);
      lowFreq.start(now);
      lowFreq.stop(now + 1.5);

      const windFreq = audioContext.createOscillator();
      const windGain = audioContext.createGain();
      windFreq.connect(windGain);
      windGain.connect(audioContext.destination);
      windFreq.frequency.setValueAtTime(150, now);
      windFreq.frequency.exponentialRampToValueAtTime(80, now + 2);
      windFreq.type = 'square';
      windGain.gain.setValueAtTime(0.08, now);
      windGain.gain.exponentialRampToValueAtTime(0.01, now + 2);
      windFreq.start(now);
      windFreq.stop(now + 2);
    } catch {
      console.log('Audio not supported');
    }
  };

  const handleStartGame = () => {
    playAmbientSound();
    navigate('/home');
  };

  if (isWelcomePage) {
    return <WelcomePage onStart={handleStartGame} />;
  }

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/home" element={<Home />} />
        <Route path="/game" element={<Game />} />
        <Route path="/result" element={<Result />} />
        <Route path="/guide" element={<Guide />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

function WelcomePage({ onStart }: { onStart: () => void }) {
  const [stars] = useState<Array<{ id: number; x: number; y: number; size: number; opacity: number; animationDuration: string }>>(() => {
    return Array.from({ length: 60 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.7 + 0.3,
      animationDuration: `${Math.random() * 3 + 2}s`,
    }));
  });

  const handleStartGame = () => {
    onStart();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-purple-900 to-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;700&display=swap');

        @keyframes shake {
          0%, 100% { transform: translateX(0) translateY(0); }
          10% { transform: translateX(-2px) translateY(1px); }
          20% { transform: translateX(2px) translateY(-1px); }
          30% { transform: translateX(-2px) translateY(0px); }
          40% { transform: translateX(1px) translateY(-1px); }
          50% { transform: translateX(-1px) translateY(1px); }
          60% { transform: translateX(2px) translateY(0px); }
          70% { transform: translateX(-1px) translateY(-1px); }
          80% { transform: translateX(1px) translateY(1px); }
          90% { transform: translateX(-2px) translateY(0px); }
        }

        .handwriting {
          font-family: 'Caveat', cursive;
          text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.5);
        }

        .oracle-turtle {
          font-size: 5rem;
          font-weight: bold;
          background: linear-gradient(135deg, #1a0033 0%, #330066 50%, #1a0033 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          filter: drop-shadow(0 0 20px rgba(128, 0, 128, 0.8)) drop-shadow(0 0 10px rgba(139, 0, 139, 0.6));
          animation: oraclePulse 2.5s ease-in-out infinite, oracleRotate 6s linear infinite;
        }

        @keyframes oraclePulse {
          0%, 100% {
            filter: drop-shadow(0 0 20px rgba(128, 0, 128, 0.8)) drop-shadow(0 0 10px rgba(139, 0, 139, 0.6));
            transform: scale(1);
          }
          50% {
            filter: drop-shadow(0 0 40px rgba(128, 0, 128, 1)) drop-shadow(0 0 20px rgba(139, 0, 139, 0.8));
            transform: scale(1.05);
          }
        }

        @keyframes oracleRotate {
          0% { transform: rotateZ(0deg) scaleY(1); }
          25% { transform: rotateZ(8deg) scaleY(1); }
          50% { transform: rotateZ(0deg) scaleY(1); }
          75% { transform: rotateZ(-8deg) scaleY(1); }
          100% { transform: rotateZ(0deg) scaleY(1); }
        }

        .broken-button {
          clip-path: polygon(
            0% 5%, 3% 0%, 8% 2%, 15% 0%, 22% 3%, 28% 1%, 35% 4%, 42% 0%, 50% 2%,
            58% 0%, 65% 3%, 72% 1%, 80% 4%, 85% 0%, 92% 3%, 97% 1%, 100% 5%,
            100% 20%, 98% 25%, 100% 32%, 99% 40%, 100% 48%, 99% 55%, 100% 62%, 98% 70%, 100% 78%, 99% 85%, 100% 92%, 97% 98%,
            95% 100%, 88% 98%, 82% 100%, 75% 99%, 68% 100%, 60% 98%, 52% 100%, 45% 99%, 38% 100%, 30% 98%, 22% 100%, 15% 99%, 8% 100%, 3% 98%,
            0% 95%, 2% 85%, 0% 78%, 1% 70%, 0% 62%, 1% 55%, 0% 48%, 1% 40%, 0% 32%, 2% 25%
          );
          position: relative;
        }

        .button-shake:hover {
          animation: shake 0.5s ease-in-out;
          box-shadow:
            0 0 30px rgba(139, 0, 139, 0.8),
            0 0 60px rgba(128, 0, 128, 0.5),
            inset 0 0 20px rgba(255, 0, 127, 0.3);
        }
      `}</style>

      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white animate-pulse"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            animationDuration: star.animationDuration,
          }}
        />
      ))}

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0.7s' }}></div>
        <div className="absolute top-1/2 right-1/3 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.4s' }}></div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-950/30 to-slate-950/50 pointer-events-none"></div>

      <div className="relative max-w-2xl w-full z-10">
        <div className="text-center space-y-8 backdrop-blur-lg bg-slate-900/50 p-8 md:p-12 rounded-3xl border border-purple-500/30 shadow-2xl">
          <div className="flex justify-center mb-4">
            <div className="oracle-turtle">🐢</div>
          </div>

          <div className="space-y-3">
            <h1 className="text-5xl md:text-7xl font-bold handwriting text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-pink-300 to-purple-400 relative">
              <span className="block">AI海龟汤</span>
            </h1>
            <p className="text-gray-300 text-lg md:text-xl font-light tracking-widest handwriting">
              一场推理与真相的神秘之旅
            </p>
          </div>

          <div className="bg-gradient-to-br from-slate-900/70 to-slate-900/50 rounded-2xl p-6 md:p-8 border border-purple-500/20 space-y-5">
            <div className="flex items-center gap-3 justify-center">
              <Lightbulb className="w-6 h-6 text-purple-300 drop-shadow-lg" />
              <h2 className="text-2xl font-semibold handwriting text-purple-200">游戏规则</h2>
            </div>

            <div className="text-left space-y-4">
              <div className="flex gap-4 items-start group">
                <span className="text-purple-400 font-bold text-xl flex-shrink-0 w-6 h-6 flex items-center justify-center bg-purple-400/20 rounded-full group-hover:bg-purple-400/40 transition">1</span>
                <p className="text-gray-200 leading-relaxed pt-0.5 handwriting">AI会给出一个看似不合理的神秘情景</p>
              </div>
              <div className="flex gap-4 items-start group">
                <span className="text-purple-400 font-bold text-xl flex-shrink-0 w-6 h-6 flex items-center justify-center bg-purple-400/20 rounded-full group-hover:bg-purple-400/40 transition">2</span>
                <p className="text-gray-200 leading-relaxed pt-0.5 handwriting">你可以提出是非问题，AI只会回答"是"、"否"或"无关"</p>
              </div>
              <div className="flex gap-4 items-start group">
                <span className="text-purple-400 font-bold text-xl flex-shrink-0 w-6 h-6 flex items-center justify-center bg-purple-400/20 rounded-full group-hover:bg-purple-400/40 transition">3</span>
                <p className="text-gray-200 leading-relaxed pt-0.5 handwriting">通过不断提问，逐步还原事件的真相</p>
              </div>
              <div className="flex gap-4 items-start group">
                <span className="text-purple-400 font-bold text-xl flex-shrink-0 w-6 h-6 flex items-center justify-center bg-purple-400/20 rounded-full group-hover:bg-purple-400/40 transition">4</span>
                <p className="text-gray-200 leading-relaxed pt-0.5 handwriting">考验你的逻辑推理和脑洞能力</p>
              </div>
            </div>
          </div>

          <button
            onClick={handleStartGame}
            className={`
              button-shake broken-button group relative px-12 py-4 text-lg font-semibold
              bg-gradient-to-r from-red-900 to-red-800 text-white
              transform transition-all duration-300 ease-out
              hover:scale-105 active:scale-95 overflow-visible
            `}
          >
            <span className="relative z-10 flex items-center justify-center gap-2 handwriting text-xl">
              开始游戏
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                ✨
              </span>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-600 opacity-0 group-hover:opacity-100 blur transition-opacity duration-300 pointer-events-none" style={{ clipPath: 'inherit' }}></div>
          </button>

          <p className="text-gray-300 text-sm handwriting">
            准备好挑战你的智慧了吗？
          </p>
        </div>
      </div>
    </div>
  );
}
