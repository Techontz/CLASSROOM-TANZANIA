import { redirect } from "next/navigation";

/** The original's settings live inside the Account screen. */
export default function SettingsPage() {
  redirect("/profile");
}
