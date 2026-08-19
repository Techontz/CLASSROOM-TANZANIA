import { Suspense } from "react";
import LoadingScreen from "@/components/layout/LoadingScreen";
import ResetPasswordScreen from "@/components/auth/ResetPasswordScreen";

export default function ResetPasswordPage() {
  // useSearchParams needs a suspense boundary during prerender.
  return (
    <Suspense fallback={<LoadingScreen />}>
      <ResetPasswordScreen />
    </Suspense>
  );
}
