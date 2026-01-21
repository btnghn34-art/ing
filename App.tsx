import React, { useState } from 'react';
import { CategoryMenu } from './components/CategoryMenu';
import { GameScreen } from './components/GameScreen';
import { ResultScreen } from './components/ResultScreen';
import { Category, GameState } from './types';

export default function App() {
  const [gameState, setGameState] = useState<GameState>('MENU');
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);
  const [gameScore, setGameScore] = useState<{ current: number; total: number }>({ current: 0, total: 0 });

  const handleSelectCategory = (category: Category) => {
    setActiveCategory(category);
    setGameState('PLAYING');
  };

  const handleEndGame = (score: number, total: number) => {
    setGameScore({ current: score, total });
    setGameState('RESULT');
  };

  const handleRestart = () => {
    setGameState('PLAYING');
    // Force re-render of GameScreen to reset internal state
  };

  const handleHome = () => {
    setActiveCategory(null);
    setGameState('MENU');
  };

  // Dynamic background based on state/category
  const getBackground = () => {
    if (gameState === 'MENU') return 'from-indigo-500 via-purple-500 to-pink-500';
    if (!activeCategory) return 'from-blue-400 to-indigo-500';
    
    // Match category colors
    const colors: Record<string, string> = {
      blue: 'from-blue-400 to-indigo-500',
      red: 'from-red-400 to-rose-500',
      green: 'from-emerald-400 to-green-600',
      amber: 'from-orange-400 to-amber-500',
      purple: 'from-violet-400 to-fuchsia-500',
    };
    return colors[activeCategory.color] || 'from-gray-400 to-gray-600';
  };

  return (
    <div className={`min-h-screen w-full bg-gradient-to-br ${getBackground()} transition-colors duration-700 flex flex-col items-center justify-center font-sans`}>
      {/* Decorative background patterns */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-10">
        <div className="absolute top-10 left-10 text-9xl transform -rotate-12">✏️</div>
        <div className="absolute bottom-10 right-10 text-9xl transform rotate-12">🅰️</div>
        <div className="absolute top-1/2 left-1/4 text-8xl transform rotate-45">⭐</div>
      </div>

      <div className="z-10 w-full">
        {gameState === 'MENU' && (
          <CategoryMenu onSelectCategory={handleSelectCategory} />
        )}

        {gameState === 'PLAYING' && activeCategory && (
          <GameScreen 
            // Key is essential to reset state when restarting same category
            key={Date.now()}
            category={activeCategory} 
            onEndGame={handleEndGame} 
            onBack={handleHome}
          />
        )}

        {gameState === 'RESULT' && (
          <ResultScreen 
            score={gameScore.current} 
            totalScore={gameScore.total} 
            onRestart={handleRestart} 
            onHome={handleHome} 
          />
        )}
      </div>

      <div className="fixed bottom-2 w-full text-center text-white/40 text-xs font-medium">
        Problem Decomposition: Curriculum &gt; Unit &gt; Word &gt; Recognition
      </div>
    </div>
  );
}