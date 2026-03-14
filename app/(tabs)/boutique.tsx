import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function BoutiqueScreen() {
  return (
    <View className="flex-1 bg-brand-bg">
      <SafeAreaView className="flex-1 items-center justify-center">
        <Text className="text-brand-gold text-2xl font-bold">Boutique</Text>
        <Text className="text-brand-muted mt-2">Coming in Phase 4</Text>
      </SafeAreaView>
    </View>
  );
}
