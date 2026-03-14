import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

type Variant = 'gold' | 'green' | 'outlined' | 'ghost';

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: Variant;
  loading?: boolean;
  className?: string;
}

export default function Button({ label, onPress, variant = 'gold', loading = false, className = '' }: ButtonProps) {
  if (variant === 'gold') {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.85} disabled={loading}>
        <LinearGradient
          colors={['#F5C518', '#D4AF37']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className={`px-6 py-4 rounded-full items-center flex-row justify-center ${className}`}
        >
          {loading
            ? <ActivityIndicator color="#0D1410" />
            : <Text className="text-brand-bg font-bold text-base tracking-wide">{label}</Text>
          }
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  if (variant === 'green') {
    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.85}
        disabled={loading}
        className={`bg-brand-green px-6 py-4 rounded-full items-center flex-row justify-center ${className}`}
      >
        {loading
          ? <ActivityIndicator color="#fff" />
          : <Text className="text-white font-bold text-base tracking-wide">{label}</Text>
        }
      </TouchableOpacity>
    );
  }

  if (variant === 'outlined') {
    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.85}
        disabled={loading}
        className={`border border-brand-gold px-6 py-4 rounded-full items-center ${className}`}
      >
        <Text className="text-brand-text font-bold text-base">{label}</Text>
      </TouchableOpacity>
    );
  }

  // ghost
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7} disabled={loading} className={`items-center py-3 ${className}`}>
      <Text className="text-brand-gold font-semibold text-base">{label}</Text>
    </TouchableOpacity>
  );
}
