import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import * as FileSystem from 'expo-file-system';

export default function GameScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPack();
  }, [id]);

  const loadPack = async () => {
    try {
        if (!(FileSystem as any).documentDirectory) throw new Error("No FS");
        const fileUri = `${(FileSystem as any).documentDirectory}${id}.json`;
        const fileContent = await FileSystem.readAsStringAsync(fileUri);
        const pack = JSON.parse(fileContent);
        if (pack.questions && pack.questions.length > 0) {
            setQuestions(pack.questions);
        } else {
            Alert.alert("Error", "This pack is empty.");
            router.back();
        }
    } catch (e) {
        // Fallback or Alert
        Alert.alert("Error", "Could not load pack. Make sure you downloaded it.");
        router.back();
    } finally {
        setLoading(false);
    }
  };

  const handleAnswer = (index: number) => {
    if (answered) return;
    setSelected(index);
    setAnswered(true);
  };
  
  const nextQuestion = () => {
      if (currentIndex < questions.length - 1) {
          setCurrentIndex(curr => curr + 1);
          setSelected(null);
          setAnswered(false);
      } else {
          Alert.alert("Pack Complete", "You finished this pack!", [
              { text: "Awesome", onPress: () => router.back() }
          ]);
      }
  };

  if (loading) return <View className="flex-1 bg-brand-background justify-center items-center"><Text>Loading...</Text></View>;
  if (questions.length === 0) return <View className="flex-1 bg-brand-background justify-center items-center"><Text>No Questions</Text></View>;

  const currentQuestion = questions[currentIndex];
  const isCorrect = selected === currentQuestion.correctAnswerIndex;

  return (
    <View className="flex-1 bg-brand-background">
      <SafeAreaView className="flex-1">
        <ScrollView contentContainerClassName="p-6 pb-12">

           {/* Header */}
           <View className="flex-row justify-between items-center mb-10">
              <TouchableOpacity onPress={() => router.back()}>
                <Text className="text-brand-secondary">← Back</Text>
              </TouchableOpacity>
              <Text className="font-mono text-xs uppercase text-brand-secondary/50">
                Question {currentIndex + 1}/{questions.length}
              </Text>
           </View>

           {/* Question Card */}
           <View className="bg-white p-8 rounded-3xl shadow-sm border border-brand-secondary/5 mb-8">
              <Text className="text-2xl font-serif text-brand-secondary leading-normal">
                {currentQuestion.text}
              </Text>
           </View>

           {/* Options */}
           <View className="space-y-4">
              {currentQuestion.options.map((option: string, index: number) => {
                let bgClass = "bg-white border-brand-secondary/10";
                if (answered) {
                   if (index === currentQuestion.correctAnswerIndex) bgClass = "bg-green-100 border-green-500";
                   else if (index === selected) bgClass = "bg-red-100 border-red-500";
                   else bgClass = "opacity-50";
                }

                return (
                  <TouchableOpacity 
                    key={index}
                    activeOpacity={0.8}
                    className={`p-5 rounded-xl border-2 ${bgClass}`}
                    onPress={() => handleAnswer(index)}
                  >
                    <Text className="text-lg font-medium text-brand-secondary">{option}</Text>
                  </TouchableOpacity>
                )
              })}
           </View>

           {/* Feedback */}
           {answered && (
             <View className="mt-8 bg-brand-secondary/5 p-6 rounded-2xl animate-fade-in-up">
                <Text className={`text-xl font-bold mb-2 ${isCorrect ? 'text-green-600' : 'text-brand-primary'}`}>
                  {isCorrect ? 'Correct!' : 'Not quite.'}
                </Text>
                <Text className="text-gray-800 leading-relaxed mb-4">
                  {currentQuestion.explanation}
                </Text>
                
                <View className="bg-brand-accent/20 p-4 rounded-lg">
                   <Text className="text-xs font-bold uppercase text-brand-secondary mb-1">
                     Cultural Context
                   </Text>
                   <Text className="text-sm italic text-gray-700">
                     {currentQuestion.culturalContext}
                   </Text>
                </View>

                <TouchableOpacity 
                  className="mt-6 bg-brand-secondary p-4 rounded-xl"
                  onPress={nextQuestion}
                >
                  <Text className="text-white text-center font-bold">
                      {currentIndex < questions.length - 1 ? "Next Question" : "Finish Pack"}
                  </Text>
                </TouchableOpacity>
             </View>
           )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
