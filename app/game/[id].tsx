import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import * as FileSystem from 'expo-file-system';
import { LinearGradient } from 'expo-linear-gradient';

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

  if (loading) return (
    <View className="flex-1 bg-brand-background justify-center items-center">
      <Text className="text-brand-secondary font-serif uppercase tracking-[5px]">Loading...</Text>
    </View>
  );

  const currentQuestion = questions[currentIndex];
  const isCorrect = selected === currentQuestion.correctAnswerIndex;

  return (
    <View className="flex-1 bg-brand-background">
      {/* Decorative Glows */}
      <View className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/10 rounded-full blur-3xl" />
      <View className="absolute bottom-20 left-[-50] w-80 h-80 bg-brand-secondary/5 rounded-full blur-3xl" />

      <SafeAreaView className="flex-1">
        <ScrollView contentContainerClassName="p-8 pb-16">

           {/* Elegant Header */}
           <View className="flex-row justify-between items-center mb-12">
              <TouchableOpacity onPress={() => router.back()} className="flex-row items-center">
                <Text className="text-brand-secondary text-base">←</Text>
                <Text className="text-brand-text/60 ml-2 font-medium">Exit</Text>
              </TouchableOpacity>
              
              <View className="items-center">
                 <Text className="font-serif text-brand-secondary text-lg italic">
                   {currentIndex + 1} of {questions.length}
                 </Text>
                 <View className="w-12 h-[1px] bg-brand-secondary/30 mt-1" />
              </View>
              
              <View className="w-12" /> {/* Spacer */}
           </View>

           {/* Question Card - Luxury Scroll Style */}
           <View className="bg-brand-surface/60 p-10 rounded-[48px] border border-brand-text/5 mb-10 shadow-2xl overflow-hidden">
              <View className="absolute top-0 left-0 right-0 h-[100px] bg-brand-secondary/5" />
              <Text className="text-3xl font-serif text-brand-text leading-tight mb-2">
                {currentQuestion.text}
              </Text>
           </View>

           {/* Options Grid-like List */}
           <View className="space-y-5">
              {currentQuestion.options.map((option: string, index: number) => {
                let borderClass = "border-brand-secondary/20";
                let textClass = "text-brand-text/80";
                let bgClass = "bg-brand-surface/30";

                if (answered) {
                   if (index === currentQuestion.correctAnswerIndex) {
                      borderClass = "border-green-500/50";
                      bgClass = "bg-green-500/10";
                      textClass = "text-green-400 font-bold";
                   } else if (index === selected) {
                      borderClass = "border-brand-primary/50";
                      bgClass = "bg-brand-primary/10";
                      textClass = "text-brand-primary font-bold";
                   } else {
                      bgClass = "opacity-30";
                   }
                }

                return (
                  <TouchableOpacity 
                    key={index}
                    activeOpacity={0.8}
                    className={`p-6 rounded-[24px] border ${borderClass} ${bgClass}`}
                    onPress={() => handleAnswer(index)}
                  >
                    <View className="flex-row items-center">
                      <View className={`w-8 h-8 rounded-full border ${borderClass} items-center justify-center mr-4`}>
                        <Text className={`text-xs ${textClass}`}>
                          {String.fromCharCode(65 + index)}
                        </Text>
                      </View>
                      <Text className={`text-lg transition-all duration-300 ${textClass}`}>{option}</Text>
                    </View>
                  </TouchableOpacity>
                )
              })}
           </View>

           {/* Feedback Modal-like View */}
           {answered && (
             <View className="mt-12 bg-brand-surface/80 p-8 rounded-[40px] border border-brand-secondary/10">
                <View className="flex-row items-center mb-6">
                   <View className={`w-3 h-3 rounded-full mr-3 ${isCorrect ? 'bg-green-500' : 'bg-brand-primary'}`} />
                   <Text className={`text-2xl font-serif italic ${isCorrect ? 'text-green-400' : 'text-brand-primary'}`}>
                     {isCorrect ? 'Stellar' : 'Not quite'}
                   </Text>
                </View>
                
                <Text className="text-brand-text/70 leading-relaxed text-lg mb-8">
                  {currentQuestion.explanation}
                </Text>
                
                <View className="bg-brand-primary/5 p-6 rounded-3xl border border-brand-primary/10 mb-10">
                   <Text className="text-[10px] font-bold uppercase text-brand-secondary tracking-[2px] mb-3">
                     Cultural Context
                   </Text>
                   <Text className="text-base italic text-brand-muted/90 leading-relaxed">
                     {currentQuestion.culturalContext}
                   </Text>
                </View>

                <TouchableOpacity 
                  onPress={nextQuestion}
                  activeOpacity={0.9}
                >
                  <LinearGradient
                    colors={['#D4AF37', '#B8860B']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    className="p-5 rounded-2xl shadow-lg"
                  >
                    <Text className="text-brand-primary text-center font-bold text-lg uppercase tracking-widest">
                        {currentIndex < questions.length - 1 ? "Next Insight" : "Finish Pack"}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
             </View>
           )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
