/** The pre-auth splash, ported 1:1 from index.html's `!authChecked` branch. */
export function LoadingScreen() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        minHeight: "100dvh",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/icon-192.png"
        alt=""
        style={{ width: "48px", height: "48px", borderRadius: "12px", marginBottom: "12px" }}
      />
      <p style={{ fontSize: "12px", color: "var(--gray-500)" }}>Loading...</p>
    </div>
  );
}

export default LoadingScreen;
