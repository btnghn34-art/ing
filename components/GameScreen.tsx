import React, { useState, useEffect } from 'react';
import { Category, Question, WordItem } from '../types';
import { generateQuiz } from '../utils';
import canvasConfetti from 'canvas-confetti';
import { Button } from './Button';

interface GameScreenProps {
  category: Category;
  onEndGame: (score: number, total: number) => void;
  onBack: () => void;
}

export const GameScreen: React.FC<GameScreenProps> = ({ category, onEndGame, onBack }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  // Initialize Quiz
  useEffect(() => {
    const quiz = generateQuiz(category);
    setQuestions(quiz);
  }, [category]);

  // Audio effects
  const playSound = (type: 'correct' | 'wrong') => {
    // Using SpeechSynthesis for feedback to avoid external audio file dependencies
    const synth = window.speechSynthesis;
    const utter = new SpeechSynthesisUtterance(type === 'correct' ? "Correct!" : "Try again");
    utter.lang = 'en-US';
    utter.rate = 1.2;
    synth.speak(utter);
  };
  
  const speakWord = (text: string) => {
    const synth = window.speechSynthesis;
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = 'en-US';
    synth.speak(utter);
  };

  const handleOptionClick = (option: WordItem) => {
    if (selectedOption !== null) return; // Prevent multiple clicks

    const currentQuestion = questions[currentIndex];
    const correct = option.id === currentQuestion.target.id;

    setSelectedOption(option.id);
    setIsCorrect(correct);

    if (correct) {
      setScore((prev) => prev + 10);
      playSound('correct');
      canvasConfetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#22c55e', '#fbbf24']
      });
    } else {
      playSound('wrong');
    }

    // Auto advance
    setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex((prev) => prev + 1);
        setSelectedOption(null);
        setIsCorrect(null);
      } else {
        // Game Over
        onEndGame(correct ? score + 10 : score, questions.length * 10);
      }
    }, 1500);
  };

  if (questions.length === 0) return <div className="text-white text-center text-2xl animate-pulse">Loading Mission...</div>;

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex) / questions.length) * 100;

  return (
    <div className="w-full max-w-xl mx-auto p-4 flex flex-col h-full min-h-[500px]">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 text-white">
        <button onClick={onBack} className="p-2 hover:bg-white/20 rounded-full transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
        <div className="flex flex-col items-center">
          <span className="text-xs font-bold uppercase tracking-widest opacity-80">{category.title}</span>
          <div className="bg-black/20 rounded-full h-2 w-32 mt-2 overflow-hidden">
            <div 
              className="bg-yellow-400 h-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        <div className="bg-white/20 px-3 py-1 rounded-full font-bold">
          {score} pts
        </div>
      </div>

      {/* Card */}
      <div className="bg-white rounded-3xl shadow-2xl p-6 flex-1 flex flex-col items-center justify-between relative overflow-hidden">
        
        {/* Question Area */}
        <div className="flex flex-col items-center justify-center flex-1 w-full mb-8">
           <button 
             onClick={() => speakWord(currentQuestion.target.word)}
             className="mb-4 bg-blue-100 hover:bg-blue-200 text-blue-600 p-3 rounded-full transition-colors"
             aria-label="Listen"
           >
             <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0117 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0113 10a3.983 3.983 0 01-1.172-2.828 1 1 0 010-1.415z" clipRule="evenodd" />
             </svg>
           </button>
           <h2 className="text-5xl font-black text-gray-800 tracking-tight text-center animate-bounce-short">
             {currentQuestion.target.word}
           </h2>
           <p className="text-gray-400 font-semibold mt-2">Which one is it?</p>
        </div>

        {/* Options */}
        <div className="grid grid-cols-3 gap-3 w-full">
          {currentQuestion.options.map((option) => {
            let btnClass = "bg-gray-50 border-gray-200 hover:border-blue-400";
            
            if (selectedOption) {
              if (option.id === currentQuestion.target.id) {
                btnClass = "bg-green-100 border-green-500 ring-2 ring-green-500 scale-105"; // Correct
              } else if (option.id === selectedOption) {
                btnClass = "bg-red-100 border-red-500 opacity-80"; // Wrong selected
              } else {
                btnClass = "opacity-40 grayscale"; // Others
              }
            }

            return (
              <button
                key={option.id}
                onClick={() => handleOptionClick(option)}
                disabled={selectedOption !== null}
                className={`
                  aspect-square rounded-2xl border-b-4 flex items-center justify-center text-5xl md:text-6xl
                  transition-all duration-300 transform active:scale-90
                  ${btnClass}
                `}
              >
                {option.emoji}
              </button>
            );
          })}
        </div>

        {/* Feedback Text Overlay */}
        {selectedOption && (
          <div className={`
            absolute top-0 left-0 w-full p-2 text-center font-black text-white text-lg tracking-widest uppercase
            ${isCorrect ? 'bg-green-500' : 'bg-red-500'}
            transition-transform duration-300 transform translate-y-0
          `}>
            {isCorrect ? 'Correct! 🎉' : 'Oops! 😅'}
          </div>
        )}
      </div>
      
      <div className="mt-4 text-center text-white/60 text-sm font-semibold">
        Level {currentIndex + 1} of {questions.length}
      </div>
    </div>
  );
};