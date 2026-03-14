import { View, Text } from 'react-native';

interface StatWidgetProps {
  icon: string;
  label: string;
  value: string;
  sub?: string;
  subColor?: string;
}

export default function StatWidget({ icon, label, value, sub, subColor = 'text-brand-muted' }: StatWidgetProps) {
  return (
    <View className="bg-brand-surface rounded-2xl p-4 flex-1 border border-white/5">
      <View className="flex-row justify-between items-start mb-2">
        <Text className="text-2xl">{icon}</Text>
        {sub && <Text className={`text-xs font-bold uppercase tracking-wide ${subColor}`}>{sub}</Text>}
      </View>
      <Text className="text-brand-muted text-xs mb-1 uppercase tracking-widest">{label}</Text>
      <Text className="text-brand-text text-2xl font-bold">{value}</Text>
    </View>
  );
}
