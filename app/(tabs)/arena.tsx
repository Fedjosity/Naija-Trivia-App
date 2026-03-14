import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useEffect, useRef } from 'react';

// ─── Mock Data ────────────────────────────────────────────────────────────────
const QUESTIONS = [
  {
    id: 1,
    question: 'Which Nigerian state is famously known as the "Gateway State"?',
    highlight: '"Gateway State"',
    options: ['Lagos State', 'Ogun State', 'Oyo State', 'Kwara State'],
    answer: 1,
    fact: 'Ogun State is called the Gateway State because of its strategic location as the main link between Nigeria and its neighboring country, Benin Republic.',
  },
  {
    id: 2,
    question: 'Who was the first Executive President of Nigeria?',
    highlight: 'first Executive President',
    options: ['Nnamdi Azikiwe', 'Shehu Shagari', 'Yakubu Gowon', 'Obafemi Awolowo'],
    answer: 1,
    fact: 'Shehu Shagari became Nigeria\'s first Executive President in 1979 when the country transitioned from military to civilian rule under the Second Republic.',
  },
  {
    id: 3,
    question: 'What year did Nigeria gain independence from Britain?',
    highlight: 'independence from Britain',
    options: ['1958', '1960', '1963', '1966'],
    answer: 1,
    fact: 'Nigeria gained independence on October 1, 1960. The country later became a republic on October 1, 1963.',
  },
];

const TOTAL = QUESTIONS.length;
const MAX_TIME = 30;
const LETTERS = ['A', 'B', 'C', 'D'];

export default function ArenaScreen() {
  const [questionIdx, setQuestionIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showFact, setShowFact] = useState(false);
  const [timeLeft, setTimeLeft] = useState(MAX_TIME);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const q = QUESTIONS[questionIdx];
  const answered = selected !== null;

  // ── Timer ──
  useEffect(() => {
    setTimeLeft(MAX_TIME);
    setSelected(null);
    setShowFact(false);
  }, [questionIdx]);

  useEffect(() => {
    if (answered || finished) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(timerRef.current!);
          setSelected(-1); // time expired → auto-reveal
          setShowFact(true);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [questionIdx, answered, finished]);

  const handleSelect = (idx: number) => {
    if (answered) return;
    setSelected(idx);
    setShowFact(true);
    if (idx === q.answer) setScore(s => s + 1);
  };

  const handleNext = () => {
    if (questionIdx < TOTAL - 1) {
      setQuestionIdx(i => i + 1);
    } else {
      setFinished(true);
    }
  };

  const handleReset = () => {
    setQuestionIdx(0);
    setScore(0);
    setFinished(false);
  };

  // ── Timer ring ──
  const pct = timeLeft / MAX_TIME;
  const ringColor = timeLeft > 15 ? '#D4AF37' : timeLeft > 8 ? '#F97316' : '#EF4444';

  if (finished) {
    return (
      <View className="flex-1 bg-brand-bg items-center justify-center px-8">
        <Text className="text-6xl mb-4">🏆</Text>
        <Text className="text-brand-gold text-3xl font-bold text-center mb-2">Session Complete!</Text>
        <Text className="text-brand-text text-xl font-bold text-center mb-1">{score} / {TOTAL} Correct</Text>
        <Text className="text-brand-muted text-base text-center mb-10">
          {score === TOTAL ? 'Perfect score! Grandmaster move. 🔥' : 'Great effort — keep sharpening your knowledge!'}
        </Text>
        <TouchableOpacity
          onPress={handleReset}
          className="bg-brand-green py-4 px-10 rounded-full"
        >
          <Text className="text-white font-bold text-base">Play Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-brand-bg">
      {/* Ankara background flecks */}
      <View className="absolute inset-0 opacity-[0.04]">
        {Array.from({ length: 20 }).map((_, i) => (
          <View
            key={i}
            className="absolute bg-brand-gold"
            style={{
              width: 44, height: 44, borderRadius: 4,
              transform: [{ rotate: '45deg' }],
              top: Math.floor(i / 4) * 110 - 10,
              left: (i % 4) * 90 + 10,
            }}
          />
        ))}
      </View>

      <SafeAreaView edges={['top']} className="flex-1">
        {/* Toolbar */}
        <View className="flex-row justify-between items-center px-5 py-3">
          <TouchableOpacity>
            <View className="space-y-1">
              <View className="w-5 h-0.5 bg-brand-text" />
              <View className="w-5 h-0.5 bg-brand-text" />
            </View>
          </TouchableOpacity>
          <Text className="text-brand-text font-bold text-base">Daily Naija Trivia</Text>
          <Text className="text-2xl">🔔</Text>
        </View>

        <ScrollView className="flex-1" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 32 }}>
          {/* Circular Timer */}
          <View className="items-center mt-4 mb-6">
            <View className="items-center justify-center" style={{ width: 90, height: 90 }}>
              <View
                className="absolute rounded-full border-4"
                style={{ width: 86, height: 86, borderColor: '#1A2118' }}
              />
              <View
                className="absolute rounded-full border-4"
                style={{ width: 86, height: 86, borderColor: ringColor, opacity: pct }}
              />
              <Text className="font-bold text-3xl" style={{ color: ringColor }}>{timeLeft}</Text>
              <Text className="text-brand-muted text-[9px] uppercase tracking-wider">Seconds</Text>
            </View>
          </View>

          {/* Progress indicator */}
          <View className="mx-5 flex-row items-center justify-center mb-6">
            <View className="bg-brand-surface px-4 py-1.5 rounded-full flex-row items-center border border-brand-green/30">
              <View className="w-2 h-2 bg-brand-green rounded-full mr-2" />
              <Text className="text-brand-text text-xs font-bold uppercase tracking-widest">
                Question {String(questionIdx + 1).padStart(2, '0')} / {String(TOTAL).padStart(2, '0')}
              </Text>
            </View>
          </View>

          {/* Question */}
          <View className="mx-5 mb-6">
            <Text className="text-brand-text text-2xl font-bold leading-snug text-center">
              {q.question.split(q.highlight).map((part, i) =>
                i === 0
                  ? <Text key={i}>{part}</Text>
                  : <Text key={i}><Text className="text-brand-green italic">"{q.highlight.replace(/"/g,'')}"</Text>{part}</Text>
              )}
            </Text>
          </View>

          {/* Options */}
          <View className="mx-5 space-y-3">
            {q.options.map((opt, i) => {
              const isSelected = selected === i;
              const isCorrect = i === q.answer;
              const showResult = answered;

              let borderColor = 'rgba(255,255,255,0.08)';
              let bgColor = '#1A2118';

              if (showResult) {
                if (isCorrect) { borderColor = '#22C55E'; bgColor = 'rgba(34,197,94,0.12)'; }
                else if (isSelected) { borderColor = '#EF4444'; bgColor = 'rgba(239,68,68,0.12)'; }
              } else if (isSelected) {
                borderColor = '#D4AF37';
              }

              return (
                <TouchableOpacity
                  key={i}
                  onPress={() => handleSelect(i)}
                  activeOpacity={answered ? 1 : 0.8}
                >
                  <View
                    className="flex-row items-center py-4 px-5 rounded-2xl border"
                    style={{ backgroundColor: bgColor, borderColor }}
                  >
                    <View
                      className="w-8 h-8 rounded-lg items-center justify-center mr-4"
                      style={{
                        backgroundColor: (showResult && isCorrect) ? '#22C55E' : (showResult && isSelected ? '#EF4444' : '#D4AF37'),
                      }}
                    >
                      <Text className="text-brand-bg font-bold text-sm">{LETTERS[i]}</Text>
                    </View>
                    <Text className="text-brand-text font-medium text-base flex-1">{opt}</Text>
                    {showResult && isCorrect && (
                      <View className="w-7 h-7 rounded-full bg-brand-correct items-center justify-center ml-2">
                        <Text className="text-white text-xs font-bold">✓</Text>
                      </View>
                    )}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Did You Know */}
          {showFact && (
            <View className="mx-5 mt-5 p-5 rounded-2xl border border-brand-green/30"
              style={{ backgroundColor: 'rgba(26,50,35,0.8)' }}>
              <Text className="text-brand-green text-xs font-bold uppercase tracking-widest mb-2 flex-row">
                ✦ Did You Know?
              </Text>
              <Text className="text-brand-muted text-sm leading-relaxed">{q.fact}</Text>
              <TouchableOpacity
                onPress={handleNext}
                className="mt-4 bg-brand-green py-3 rounded-xl items-center"
              >
                <Text className="text-white font-bold text-sm">
                  {questionIdx < TOTAL - 1 ? 'Next Question →' : 'See Results →'}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
