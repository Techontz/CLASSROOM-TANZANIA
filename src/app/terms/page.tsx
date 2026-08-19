"use client";

import { useRouter } from "next/navigation";
import TermsScreen from "@/components/auth/TermsScreen";

export default function TermsPage() {
  const router = useRouter();
  return <TermsScreen onBack={() => router.back()} />;
}
