import React, { useEffect } from 'react';
import { Button } from './Button';
import canvasConfetti from 'canvas-confetti';

interface ResultScreenProps {
  score: number;
  totalScore: number;
  onRestart: () => void;
  onHome: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({ score, totalScore, onRestart, onHome }) => {
  const percentage = (score / totalScore) * 100;
  
  let stars = 0;
  if (percentage >= 100) stars = 3;
  else if (percentage >= 60) stars = 2;
  else if (percentage > 0) stars = 1;

  useEffect(() => {
    if (stars === 3) {
      const duration = 3000;
      const end = Date.now() + duration;

      const frame = () => {
        canvasConfetti({
          particleCount: 2,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#fde047', '#ffffff']
        });
        canvasConfetti({
          particleCount: 2,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#fde047', '#ffffff']
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();
    }
  }, [stars]);

  return (
    <div className="w-full max-w-md mx-auto p-4 text-center">
      <div className="bg-white rounded-[2rem] p-8 shadow-2xl relative mt-12">
        {/* Stars floating on top */}
        <div className="absolute -top-12 left-0 right-0 flex justify-center space-x-2">
           {[1, 2, 3].map((s) => (
             <div key={s} className={`
               w-20 h-20 flex items-center justify-center text-6xl filter drop-shadow-md
               transform transition-all duration-700
               ${s <= stars ? 'scale-100 opacity-100 rotate-0' : 'scale-75 opacity-30 grayscale rotate-12'}
             `} style={{ transitionDelay: `${s * 200}ms` }}>
               ⭐
             </div>
           ))}
        </div>

        <div className="mt-8">
           <h2 className="text-3xl font-black text-gray-800 mb-2">
             {stars === 3 ? 'Amazing!' : stars === 2 ? 'Great Job!' : 'Good Try!'}
           </h2>
           <p className="text-gray-500 font-medium">You scored</p>
           <div className="text-6xl font-black text-blue-600 my-4">
             {score}
           </div>
           <p className="text-gray-400 text-sm font-bold uppercase tracking-wider mb-8">
             out of {totalScore}
           </p>

           <div className="space-y-3">
             <Button onClick={onRestart} variant="secondary" className="w-full text-lg">
               Play Again 🔄
             </Button>
             <Button onClick={onHome} variant="primary" className="w-full text-lg">
               Home Menu 🏠
             </Button>
           </div>
        </div>
      </div>
    </div>
  );
};