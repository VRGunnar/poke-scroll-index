export function Loader({ loading }: { loading: boolean }) {
  return (
    <div
      className="absolute inset-0 bg-[#0a0a12] z-30 transition-opacity duration-300 flex items-center justify-center"
      style={{
        display: loading ? "flex" : "none",
        opacity: loading ? 1 : 0,
      }}
      aria-live="polite"
    >
      <div className="w-12 h-12 rounded-full border-2 border-t-transparent border-[#ff3b3b] animate-spin" />
    </div>
  );
}
