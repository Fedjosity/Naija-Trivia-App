import { View, Text } from 'react-native';

type BadgeColor = 'gold' | 'green' | 'red' | 'muted';

interface BadgeProps {
  label: string;
  color?: BadgeColor;
}

const styles: Record<BadgeColor, string> = {
  gold:  'bg-brand-gold/20 border-brand-gold/40',
  green: 'bg-brand-green/20 border-brand-green/40',
  red:   'bg-brand-wrong/20 border-brand-wrong/40',
  muted: 'bg-white/5 border-white/10',
};

const textStyles: Record<BadgeColor, string> = {
  gold:  'text-brand-gold',
  green: 'text-brand-correct',
  red:   'text-brand-wrong',
  muted: 'text-brand-muted',
};

export default function Badge({ label, color = 'muted' }: BadgeProps) {
  return (
    <View className={`px-2 py-0.5 rounded-full border ${styles[color]} self-start`}>
      <Text className={`text-[10px] font-bold uppercase tracking-widest ${textStyles[color]}`}>
        {label}
      </Text>
    </View>
  );
}
