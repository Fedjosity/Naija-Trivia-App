import { Redirect } from 'expo-router';

// Entry point — redirect straight into the onboarding/auth flow.
export default function Index() {
  return <Redirect href="/(auth)/welcome" />;
}
