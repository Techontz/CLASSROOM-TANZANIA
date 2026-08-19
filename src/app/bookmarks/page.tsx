import RequireAuth from "@/components/layout/RequireAuth";
import BookmarksScreen from "@/components/dashboard/BookmarksScreen";

export default function BookmarksPage() {
  return (
    <RequireAuth>
      <BookmarksScreen />
    </RequireAuth>
  );
}
