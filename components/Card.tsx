import { View, ViewProps } from 'react-native';

interface CardProps extends ViewProps {
  elevated?: boolean;
}

export default function Card({ elevated = false, className = '', children, ...props }: CardProps) {
  const bg = elevated ? 'bg-brand-elevated' : 'bg-brand-surface';
  return (
    <View
      className={`${bg} rounded-2xl p-5 border border-white/5 ${className}`}
      {...props}
    >
      {children}
    </View>
  );
}
