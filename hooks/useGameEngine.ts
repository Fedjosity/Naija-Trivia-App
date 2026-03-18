import { useState, useEffect, useRef, useCallback } from 'react';
import { type Question, type Pack } from '@antigravity/content-schema';
import { RemoteConfigService } from '../services/remoteConfig';
import { useNaijaStore } from '../store/useNaijaStore';

export type GameState = 'idle' | 'playing' | 'answered' | 'finished';

/**
 * Core Logic for a Trivia Session.
 * Handles timers, scoring, and progression.
 */
export function useGameEngine(pack: Pack | null) {
  const [qIdx, setQIdx] = useState(0);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [gameState, setGameState] = useState<GameState>('idle');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30); // Default, will be updated by Remote Config
  const [correctAnswers, setCorrectAnswers] = useState(0);
  
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const { updateStats, updateWallet } = useNaijaStore();

  const currentQuestion = pack?.questions[qIdx] || null;
  const isLastQuestion = pack ? qIdx === pack.questions.length - 1 : false;

  const startTimer = useCallback(() => {
    const maxTime = RemoteConfigService.getNumber('MIN_POSSIBLE_SPEED') || 30; // Using speed as a threshold or similar
    // Actually let's just use 30 as default for now
    setTimeLeft(30);
    
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          handleAnswer(-1); // Timeout
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, []);

  const handleAnswer = useCallback((idx: number) => {
    if (gameState !== 'playing' || !currentQuestion) return;
    
    if (timerRef.current) clearInterval(timerRef.current);
    setSelectedIdx(idx);
    setGameState('answered');

    const isCorrect = idx === currentQuestion.correctAnswerIndex;
    if (isCorrect) {
      setCorrectAnswers(c => c + 1);
      // Logic for score based on time
      const speedBonus = Math.floor(timeLeft / 2);
      setScore(s => s + 100 + speedBonus);
    }
  }, [gameState, currentQuestion, timeLeft]);

  const nextQuestion = useCallback(() => {
    if (isLastQuestion) {
      finalizeGame();
    } else {
      setQIdx(prev => prev + 1);
      setSelectedIdx(null);
      setGameState('playing');
      startTimer();
    }
  }, [isLastQuestion, startTimer]);

  const finalizeGame = useCallback(() => {
    setGameState('finished');
    
    // Update local persistence
    updateStats({
      totalScore: score,
      packsCompleted: 1, // Will be incremented in real stat logic
    });
    
    const coinMultiplier = RemoteConfigService.getNumber('COIN_MULTIPLIER') || 1;
    updateWallet({
      naijaCoins: Math.floor(score * 0.1 * coinMultiplier)
    });
  }, [score, updateStats, updateWallet]);

  const startGame = useCallback(() => {
    if (!pack) return;
    setQIdx(0);
    setScore(0);
    setCorrectAnswers(0);
    setSelectedIdx(null);
    setGameState('playing');
    startTimer();
  }, [pack, startTimer]);

  // Cleanup
  useEffect(() => {
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  return {
    currentQuestion,
    qIdx,
    selectedIdx,
    gameState,
    score,
    timeLeft,
    correctAnswers,
    isLastQuestion,
    startGame,
    handleAnswer,
    nextQuestion,
    totalQuestions: pack?.questions.length || 0
  };
}
