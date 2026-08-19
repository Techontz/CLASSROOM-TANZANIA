import { redirect } from "next/navigation";

/** Alias kept for the requested route layout; the screen itself is /performance. */
export default function ProgressPage() {
  redirect("/performance");
}
