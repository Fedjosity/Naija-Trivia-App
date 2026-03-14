import {
  View, Text, TouchableOpacity, ScrollView,
  Animated, Easing,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useEffect, useRef } from 'react';

// ─── Stitch Tokens ────────────────────────────────────────────────────────────
// bg: #0f1412 | surface_container: #1c211e | surface_container_high: #262b29
// primary: #59de9b | secondary/gold: #e9c349 | error_container: #93000a
// on_surface: #dfe4e0 | on_surface_variant: #bfc9c4

const QUESTIONS = [
  {
    id: 1,
    q: 'Which Nigerian state is famously known as the "Gateway State"?',
    options: ['Lagos State', 'Ogun State', 'Oyo State', 'Kwara State'],
    answer: 1,
    fact: 'Ogun State is called the Gateway State because of its strategic location as the main link between Nigeria and its neighboring country, Benin Republic.',
  },
  {
    id: 2,
    q: 'Who was the first Executive President of Nigeria?',
    options: ['Nnamdi Azikiwe', 'Shehu Shagari', 'Yakubu Gowon', 'Obafemi Awolowo'],
    answer: 1,
    fact: 'Shehu Shagari became Nigeria\'s first Executive President in 1979 when the country transitioned from military to civilian rule under the Second Republic.',
  },
  {
    id: 3,
    q: 'What year did Nigeria gain independence from Britain?',
    options: ['1958', '1960', '1963', '1966'],
    answer: 1,
    fact: 'Nigeria gained independence on October 1, 1960. The country later became a republic on October 1, 1963.',
  },
];

const TOTAL = QUESTIONS.length;
const MAX_TIME = 30;
const LETTERS = ['A', 'B', 'C', 'D'];

// ─── Animated Option Button ───────────────────────────────────────────────────
function OptionButton({
  label, letter, onPress, state,
}: {
  label: string;
  letter: string;
  onPress: () => void;
  state: 'idle' | 'correct' | 'wrong' | 'dimmed';
}) {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePress = () => {
    Animated.sequence([
      Animated.timing(scale, { toValue: 0.96, duration: 80, useNativeDriver: true, easing: Easing.out(Easing.quad) }),
      Animated.timing(scale, { toValue: 1, duration: 120, useNativeDriver: true, easing: Easing.out(Easing.quad) }),
    ]).start();
    onPress();
  };

  const colors = {
    idle:    { bg: '#262b29', border: 'transparent', chip: '#e9c349', text: '#dfe4e0' },
    correct: { bg: 'rgba(89,222,155,0.15)', border: '#59de9b', chip: '#59de9b', text: '#dfe4e0' },
    wrong:   { bg: 'rgba(147,0,10,0.2)', border: '#ff4444', chip: '#ff4444', text: '#dfe4e0' },
    dimmed:  { bg: '#1c211e', border: 'transparent', chip: '#3f4945', text: '#89938f' },
  }[state];

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <TouchableOpacity
        onPress={handlePress}
        activeOpacity={state === 'idle' ? 0.8 : 1}
        disabled={state !== 'idle'}
      >
        <View style={{
          flexDirection: 'row', alignItems: 'center',
          backgroundColor: colors.bg,
          borderRadius: 16, paddingVertical: 16, paddingHorizontal: 16,
          borderWidth: state !== 'idle' ? 1.5 : 0,
          borderColor: colors.border,
          marginBottom: 12,
        }}>
          {/* Letter chip */}
          <View style={{
            width: 34, height: 34, borderRadius: 10,
            backgroundColor: colors.chip,
            alignItems: 'center', justifyContent: 'center', marginRight: 14,
          }}>
            <Text style={{ color: '#0f1412', fontWeight: '900', fontSize: 14 }}>{letter}</Text>
          </View>
          <Text style={{ color: colors.text, fontSize: 15, fontWeight: '600', flex: 1, lineHeight: 22 }}>
            {label}
          </Text>
          {state === 'correct' && (
            <View style={{ width: 26, height: 26, borderRadius: 13, backgroundColor: '#59de9b', alignItems: 'center', justifyContent: 'center', marginLeft: 10 }}>
              <Text style={{ color: '#0f1412', fontSize: 12, fontWeight: '900' }}>✓</Text>
            </View>
          )}
          {state === 'wrong' && (
            <View style={{ width: 26, height: 26, borderRadius: 13, backgroundColor: '#93000a', alignItems: 'center', justifyContent: 'center', marginLeft: 10 }}>
              <Text style={{ color: '#dfe4e0', fontSize: 12, fontWeight: '900' }}>✕</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

// ─── Animated Progress Ring ───────────────────────────────────────────────────
function TimerRing({ timeLeft }: { timeLeft: number }) {
  const opacity = useRef(new Animated.Value(1)).current;
  const ringColor = timeLeft > 15 ? '#e9c349' : timeLeft > 8 ? '#F97316' : '#EF4444';

  // Pulse when time is low
  useEffect(() => {
    if (timeLeft <= 8 && timeLeft > 0) {
      Animated.sequence([
        Animated.timing(opacity, { toValue: 0.4, duration: 400, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 1, duration: 400, useNativeDriver: true }),
      ]).start();
    }
  }, [timeLeft]);

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', width: 100, height: 100 }}>
      <View style={{ position: 'absolute', width: 100, height: 100, borderRadius: 50, borderWidth: 6, borderColor: '#262b29' }} />
      <Animated.View style={{
        position: 'absolute', width: 100, height: 100, borderRadius: 50,
        borderWidth: 6, borderColor: ringColor, borderStyle: 'dashed',
        opacity,
      }} />
      <Text style={{ fontSize: 34, fontWeight: '900', color: ringColor }}>{timeLeft}</Text>
      <Text style={{ fontSize: 9, color: '#89938f', letterSpacing: 1, textTransform: 'uppercase' }}>seconds</Text>
    </View>
  );
}

// ─── Main Screen ─────────────────────────────────────────────────────────────
export default function ArenaScreen() {
  const [qIdx, setQIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showFact, setShowFact] = useState(false);
  const [timeLeft, setTimeLeft] = useState(MAX_TIME);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const factAnim = useRef(new Animated.Value(40)).current;
  const factOpacity = useRef(new Animated.Value(0)).current;

  const q = QUESTIONS[qIdx];
  const answered = selected !== null;

  useEffect(() => {
    setTimeLeft(MAX_TIME);
    setSelected(null);
    setShowFact(false);
    factAnim.setValue(40);
    factOpacity.setValue(0);
  }, [qIdx]);

  useEffect(() => {
    if (answered || finished) { if (timerRef.current) clearInterval(timerRef.current); return; }
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(timerRef.current!);
          setSelected(-1);
          revealFact();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [qIdx, answered, finished]);

  const revealFact = () => {
    setShowFact(true);
    Animated.parallel([
      Animated.timing(factAnim, { toValue: 0, duration: 350, useNativeDriver: true, easing: Easing.out(Easing.cubic) }),
      Animated.timing(factOpacity, { toValue: 1, duration: 350, useNativeDriver: true }),
    ]).start();
  };

  const handleSelect = (idx: number) => {
    if (answered) return;
    setSelected(idx);
    if (idx === q.answer) setScore(s => s + 1);
    revealFact();
  };

  const handleNext = () => {
    if (qIdx < TOTAL - 1) setQIdx(i => i + 1);
    else setFinished(true);
  };

  if (finished) {
    return (
      <View style={{ flex: 1, backgroundColor: '#0f1412', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 32 }}>
        <Text style={{ fontSize: 64, marginBottom: 16 }}>🏆</Text>
        <Text style={{ color: '#e9c349', fontSize: 32, fontWeight: '900', textAlign: 'center', marginBottom: 8 }}>Session Complete!</Text>
        <Text style={{ color: '#dfe4e0', fontSize: 20, fontWeight: '700', textAlign: 'center', marginBottom: 4 }}>{score} / {TOTAL} Correct</Text>
        <Text style={{ color: '#bfc9c4', fontSize: 14, textAlign: 'center', marginBottom: 40 }}>
          {score === TOTAL ? '🔥 Perfect score! Grandmaster move.' : 'Great effort — keep sharpening your knowledge!'}
        </Text>
        <TouchableOpacity onPress={() => { setQIdx(0); setScore(0); setFinished(false); }} style={{ backgroundColor: '#59de9b', paddingVertical: 16, paddingHorizontal: 48, borderRadius: 999 }}>
          <Text style={{ color: '#0f1412', fontWeight: '900', fontSize: 16 }}>Play Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#0f1412' }}>
      {/* Ankara watermark pattern */}
      <View style={{ position: 'absolute', inset: 0, opacity: 0.03, pointerEvents: 'none' }}>
        {Array.from({ length: 20 }).map((_, i) => (
          <View key={i} style={{
            position: 'absolute',
            width: 48, height: 48, borderRadius: 4,
            backgroundColor: '#e9c349',
            transform: [{ rotate: '45deg' }],
            top: Math.floor(i / 4) * 120,
            left: (i % 4) * 95,
          }} />
        ))}
      </View>

      <SafeAreaView edges={['top']} style={{ flex: 1 }}>
        {/* Top bar */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 12 }}>
          <TouchableOpacity style={{ backgroundColor: '#1c211e', width: 36, height: 36, borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ color: '#dfe4e0', fontSize: 18 }}>←</Text>
          </TouchableOpacity>
          <Text style={{ color: '#dfe4e0', fontWeight: '800', fontSize: 16 }}>Trivia Arena</Text>
          <View style={{ backgroundColor: '#1c211e', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 }}>
            <Text style={{ color: '#e9c349', fontWeight: '700', fontSize: 12 }}>🔥 {score} pts</Text>
          </View>
        </View>

        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
          {/* Progress bar */}
          <View style={{ marginHorizontal: 20, marginBottom: 24 }}>
            <View style={{ height: 4, backgroundColor: '#262b29', borderRadius: 2 }}>
              <View style={{ height: 4, backgroundColor: '#59de9b', borderRadius: 2, width: `${((qIdx) / TOTAL) * 100}%` }} />
            </View>
            <Text style={{ color: '#89938f', fontSize: 11, marginTop: 6, textAlign: 'right', letterSpacing: 0.5 }}>
              Question {qIdx + 1} of {TOTAL}
            </Text>
          </View>

          {/* Timer + question counter */}
          <View style={{ alignItems: 'center', marginBottom: 20 }}>
            <TimerRing timeLeft={timeLeft} />
          </View>

          {/* Question card */}
          <View style={{ marginHorizontal: 20, backgroundColor: '#1c211e', borderRadius: 24, padding: 24, marginBottom: 24 }}>
            <Text style={{ color: '#89938f', fontSize: 11, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 2, marginBottom: 12 }}>
              ● Question {String(qIdx + 1).padStart(2, '0')} / {String(TOTAL).padStart(2, '0')}
            </Text>
            <Text style={{ color: '#dfe4e0', fontSize: 22, fontWeight: '800', lineHeight: 32 }}>
              {q.q}
            </Text>
          </View>

          {/* Options */}
          <View style={{ paddingHorizontal: 20 }}>
            {q.options.map((opt, i) => {
              let state: 'idle' | 'correct' | 'wrong' | 'dimmed' = 'idle';
              if (answered) {
                if (i === q.answer) state = 'correct';
                else if (i === selected) state = 'wrong';
                else state = 'dimmed';
              }
              return (
                <OptionButton
                  key={i}
                  label={opt}
                  letter={LETTERS[i]}
                  onPress={() => handleSelect(i)}
                  state={state}
                />
              );
            })}
          </View>

          {/* Did You Know — slides up on answer */}
          {showFact && (
            <Animated.View style={{
              marginHorizontal: 20, marginTop: 8,
              transform: [{ translateY: factAnim }],
              opacity: factOpacity,
            }}>
              <View style={{ backgroundColor: 'rgba(26,50,35,0.9)', borderRadius: 20, padding: 20, borderWidth: 1, borderColor: 'rgba(89,222,155,0.2)' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                  <Text style={{ fontSize: 16, marginRight: 8 }}>✦</Text>
                  <Text style={{ color: '#59de9b', fontWeight: '800', fontSize: 13, textTransform: 'uppercase', letterSpacing: 1 }}>
                    Did You Know?
                  </Text>
                </View>
                <Text style={{ color: '#bfc9c4', fontSize: 13, lineHeight: 20 }}>{q.fact}</Text>
                <TouchableOpacity
                  onPress={handleNext}
                  style={{ backgroundColor: '#59de9b', borderRadius: 14, paddingVertical: 14, alignItems: 'center', marginTop: 16 }}
                  activeOpacity={0.85}
                >
                  <Text style={{ color: '#0f1412', fontWeight: '900', fontSize: 14 }}>
                    {qIdx < TOTAL - 1 ? 'Next Question →' : 'See Results →'}
                  </Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
