import { Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

export default function Home() {
  return (
    <View className="flex-1 bg-brand-background">
      {/* Background Decorative Glows */}
      <View className="absolute top-[-100] right-[-100] w-80 h-80 bg-brand-primary/20 rounded-full blur-3xl" />
      <View className="absolute bottom-[-50] left-[-50] w-64 h-64 bg-brand-secondary/10 rounded-full blur-3xl" />

      <SafeAreaView className="flex-1 px-8 justify-between py-12">
        <View className="mt-12">
          <View className="flex-row items-center space-x-2 mb-2">
            <View className="w-8 h-[2px] bg-brand-secondary" />
            <Text className="text-brand-secondary text-xs font-bold uppercase tracking-[4px]">
              Antigravity
            </Text>
          </View>
          
          <Text className="text-5xl font-serif text-brand-text leading-[1.15] mb-4">
            Daily{'\n'}
            <Text className="text-brand-secondary italic">Naija</Text>{'\n'}
            Trivia
          </Text>
          
          <View className="w-16 h-1 bg-brand-secondary/30 rounded-full" />
        </View>

        {/* Glassmorphic "Did you know?" Card */}
        <View className="bg-brand-surface/40 p-8 rounded-[40px] border border-brand-text/5 overflow-hidden">
           <View className="absolute top-0 left-0 right-0 bottom-0 bg-white/5" />
           <Text className="text-brand-secondary font-bold mb-3 uppercase text-[10px] tracking-[2px]">
             Cultural Insight
           </Text>
           <Text className="text-xl text-brand-text/90 font-serif leading-relaxed italic">
             "The name 'Nigeria' was suggested by Flora Shaw in 1897, inspired by the great River Niger."
           </Text>
        </View>

        <View className="space-y-6 mb-12">
           <Link href="/game/daily" asChild>
             <TouchableOpacity activeOpacity={0.9}>
               <LinearGradient
                 colors={['#D4AF37', '#B8860B']}
                 start={{ x: 0, y: 0 }}
                 end={{ x: 1, y: 1 }}
                 className="p-5 rounded-2xl shadow-2xl"
               >
                 <Text className="text-brand-primary text-center font-bold text-lg uppercase tracking-widest">
                   Begin Challenge
                 </Text>
               </LinearGradient>
             </TouchableOpacity>
           </Link>
           
           <Link href="/packs" asChild>
             <TouchableOpacity 
               className="bg-brand-surface border border-brand-secondary/20 p-5 rounded-2xl active:opacity-90"
             >
                <Text className="text-brand-secondary text-center font-bold text-lg uppercase tracking-widest">
                  Library
                </Text>
             </TouchableOpacity>
           </Link>
           
           <Text className="text-center text-brand-muted text-xs uppercase tracking-widest mt-6">
             Crafted for the Nigerian Soul
           </Text>
        </View>
      </SafeAreaView>
    </View>
  );
}
