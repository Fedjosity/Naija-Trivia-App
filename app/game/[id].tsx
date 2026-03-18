import { View, Text, TouchableOpacity, ScrollView, Animated, Easing, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState, useEffect, useRef } from 'react';
import * as FileSystem from 'expo-file-system';
import { LinearGradient } from 'expo-linear-gradient';
import { useGameEngine } from '../../hooks/useGameEngine';
import { PackSchema, type Pack } from '@antigravity/content-schema';

// Reuse components or styles from arena if needed, but here we build the dynamic version
const LETTERS = ['A', 'B', 'C', 'D'];

export default function GameScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [pack, setPack] = useState<Pack | null>(null);
  const [loading, setLoading] = useState(true);

  const {
    currentQuestion,
    qIdx,
    selectedIdx,
    gameState,
    score,
    timeLeft,
    isLastQuestion,
    startGame,
    handleAnswer,
    nextQuestion,
    totalQuestions
  } = useGameEngine(pack);

  useEffect(() => {
    loadPack();
  }, [id]);

  const loadPack = async () => {
    try {
      const fileUri = `${(FileSystem as any).documentDirectory}packs/${id}.json`;
      const fileContent = await FileSystem.readAsStringAsync(fileUri);
      const data = JSON.parse(fileContent);
      const validation = PackSchema.safeParse(data);
      if (validation.success) {
        setPack(validation.data);
      } else {
        throw new Error("Invalid Pack format");
      }
    } catch (e) {
      console.error(e);
      Alert.alert("Error", "Could not load pack. Returning to dashboard.");
      router.back();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (pack && gameState === 'idle') {
      startGame();
    }
  }, [pack, gameState, startGame]);

  if (loading || !pack || !currentQuestion) {
    return (
      <View style={{ flex: 1, backgroundColor: '#0f1412', alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ color: '#e9c349', fontWeight: '800' }}>INITIALIZING ARENA...</Text>
      </View>
    );
  }

  if (gameState === 'finished') {
    return (
      <View style={{ flex: 1, backgroundColor: '#0f1412', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 32 }}>
        <Text style={{ fontSize: 64, marginBottom: 16 }}>🏆</Text>
        <Text style={{ color: '#e9c349', fontSize: 32, fontWeight: '900', textAlign: 'center', marginBottom: 8 }}>Pack Complete!</Text>
        <Text style={{ color: '#dfe4e0', fontSize: 20, fontWeight: '700', textAlign: 'center', marginBottom: 40 }}>Score: {score}</Text>
        <TouchableOpacity onPress={() => router.replace('/(tabs)')} style={{ backgroundColor: '#59de9b', paddingVertical: 16, paddingHorizontal: 48, borderRadius: 999 }}>
          <Text style={{ color: '#0f1412', fontWeight: '900', fontSize: 16 }}>Return Home</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#0f1412' }}>
      <SafeAreaView edges={['top']} style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 12 }}>
          <TouchableOpacity onPress={() => router.back()} style={{ backgroundColor: '#1c211e', width: 36, height: 36, borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ color: '#dfe4e0', fontSize: 18 }}>←</Text>
          </TouchableOpacity>
          <Text style={{ color: '#dfe4e0', fontWeight: '800', fontSize: 16 }}>{pack.id}</Text>
          <View style={{ backgroundColor: '#1c211e', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 }}>
            <Text style={{ color: '#e9c349', fontWeight: '700', fontSize: 12 }}>{score} XP</Text>
          </View>
        </View>

        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
          {/* Progress & Timer */}
          <View style={{ marginHorizontal: 20, marginBottom: 24 }}>
             <View style={{ height: 4, backgroundColor: '#262b29', borderRadius: 2 }}>
               <View style={{ height: 4, backgroundColor: '#59de9b', borderRadius: 2, width: `${((qIdx + 1) / totalQuestions) * 100}%` }} />
             </View>
             <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 }}>
                <Text style={{ color: '#89938f', fontSize: 12 }}>{timeLeft}s remaining</Text>
                <Text style={{ color: '#89938f', fontSize: 12, fontWeight: '700' }}>Q{qIdx + 1}/{totalQuestions}</Text>
             </View>
          </View>

          {/* Question Card */}
          <View style={{ marginHorizontal: 20, backgroundColor: '#1c211e', borderRadius: 24, padding: 24, marginBottom: 24 }}>
            <Text style={{ color: '#dfe4e0', fontSize: 22, fontWeight: '800', lineHeight: 32 }}>
              {currentQuestion.text}
            </Text>
          </View>

          {/* Options */}
          <View style={{ paddingHorizontal: 20 }}>
            {currentQuestion.options.map((opt, i) => {
              const isSelected = selectedIdx === i;
              const isCorrect = i === currentQuestion.correctAnswerIndex;
              const answered = gameState === 'answered';

              let borderColor = 'transparent';
              let bgColor = '#262b29';
              if (answered) {
                if (isCorrect) {
                    borderColor = '#59de9b';
                    bgColor = 'rgba(89,222,155,0.1)';
                } else if (isSelected) {
                    borderColor = '#ff4444';
                    bgColor = 'rgba(255,68,68,0.1)';
                }
              }

              return (
                <TouchableOpacity
                  key={i}
                  onPress={() => handleAnswer(i)}
                  disabled={answered}
                  style={{
                    backgroundColor: bgColor,
                    borderRadius: 16, padding: 20, marginBottom: 12,
                    borderWidth: 2, borderColor,
                    flexDirection: 'row', alignItems: 'center'
                  }}
                >
                  <View style={{ width: 30, height: 30, borderRadius: 15, backgroundColor: isSelected ? '#59de9b' : '#3f4945', alignItems: 'center', justifyContent: 'center', marginRight: 12 }}>
                    <Text style={{ color: '#0f1412', fontWeight: '900' }}>{LETTERS[i]}</Text>
                  </View>
                  <Text style={{ color: '#dfe4e0', fontSize: 16, fontWeight: '600', flex: 1 }}>{opt}</Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Feedback */}
          {gameState === 'answered' && (
            <View style={{ marginHorizontal: 20, marginTop: 10, padding: 20, backgroundColor: 'rgba(89,222,155,0.05)', borderRadius: 20, borderWidth: 1, borderColor: 'rgba(89,222,155,0.1)' }}>
               <Text style={{ color: '#59de9b', fontWeight: '800', marginBottom: 8, fontSize: 13, textTransform: 'uppercase' }}>Context & Insight</Text>
               <Text style={{ color: '#bfc9c4', lineHeight: 22, fontSize: 14 }}>{currentQuestion.explanation}</Text>
               {currentQuestion.culturalContext && (
                 <View style={{ marginTop: 16, padding: 12, backgroundColor: 'rgba(233,195,73,0.05)', borderRadius: 12 }}>
                    <Text style={{ color: '#e9c349', fontSize: 11, fontWeight: '800', marginBottom: 4 }}>CULTURAL TIDBIT</Text>
                    <Text style={{ color: '#dfe4e0', fontSize: 13, fontStyle: 'italic' }}>{currentQuestion.culturalContext}</Text>
                 </View>
               )}
               <TouchableOpacity
                 onPress={nextQuestion}
                 style={{ marginTop: 20, backgroundColor: '#59de9b', padding: 16, borderRadius: 12, alignItems: 'center' }}
               >
                 <Text style={{ color: '#0f1412', fontWeight: '900' }}>
                   {isLastQuestion ? "FINISH SESSION" : "NEXT QUESTION"}
                 </Text>
               </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
