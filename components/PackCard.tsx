import { View, Text, Image, TouchableOpacity } from 'react-native';
import Badge from './Badge';

interface PackCardProps {
  title: string;
  description: string;
  imageUri?: string;
  badge?: string;
  questionCount?: number;
  onPress: () => void;
  ctaLabel?: string;
}

export default function PackCard({ title, description, imageUri, badge, questionCount, onPress, ctaLabel = 'Start Pack' }: PackCardProps) {
  return (
    <View className="bg-brand-surface rounded-2xl overflow-hidden border border-white/5 mb-4">
      {imageUri && (
        <Image source={{ uri: imageUri }} className="w-full h-40" resizeMode="cover" />
      )}
      <View className="p-4">
        <View className="flex-row justify-between items-center mb-1">
          <Text className="text-brand-text font-bold text-lg flex-1" numberOfLines={1}>{title}</Text>
          {badge && <Badge label={badge} color="green" />}
        </View>
        <Text className="text-brand-muted text-sm leading-relaxed mb-3" numberOfLines={2}>{description}</Text>
        {questionCount !== undefined && (
          <Text className="text-brand-muted text-xs mb-3">🎯 {questionCount} Questions</Text>
        )}
        <TouchableOpacity
          className="bg-brand-green py-2.5 rounded-xl items-center"
          onPress={onPress}
          activeOpacity={0.85}
        >
          <Text className="text-white font-bold text-sm tracking-wide">{ctaLabel}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
