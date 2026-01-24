import { Text, View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';

export default function Home() {
  return (
    <View className="flex-1 bg-brand-background">
      <SafeAreaView className="flex-1 px-6 justify-between py-12">
        <View className="space-y-2 mt-10">
          <Text className="text-brand-primary text-xl font-bold uppercase tracking-widest">
            Antigravity
          </Text>
          <Text className="text-4xl font-serif text-brand-secondary leading-tight">
            Daily Naija{'\n'}Trivia
          </Text>
        </View>

        <View className="bg-white/80 p-6 rounded-3xl border border-brand-secondary/10 shadow-sm">
           <Text className="text-brand-secondary font-medium mb-2 uppercase text-xs">
             Did you know?
           </Text>
           <Text className="text-lg text-gray-800 font-serif leading-relaxed">
             The name "Nigeria" was suggested by British journalist Flora Shaw in 1897.
           </Text>
        </View>

        <View className="space-y-4 mb-8">
           <Link href="/game/daily" asChild>
             <TouchableOpacity className="bg-brand-primary p-4 rounded-xl shadow-lg active:opacity-90">
                <Text className="text-white text-center font-bold text-lg">
                  Play Daily Trivia
                </Text>
             </TouchableOpacity>
           </Link>
           
           <Link href="/packs" asChild>
             <TouchableOpacity className="bg-brand-secondary p-4 rounded-xl active:opacity-90">
                <Text className="text-white text-center font-bold text-lg">
                  Offline Packs
                </Text>
             </TouchableOpacity>
           </Link>
           
           <Text className="text-center text-brand-secondary/60 text-sm mt-4">
             Works fully offline
           </Text>
        </View>
      </SafeAreaView>
    </View>
  );
}
