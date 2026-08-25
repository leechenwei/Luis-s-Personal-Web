/* Slow-drifting color fields behind the paper — alive, never loud. */

export default function AmbientBackground() {
  return (
    <div aria-hidden className="fixed inset-0 -z-10 overflow-hidden">
      <div className="aurora" />
      <div className="grain" />
      <div
        className="blob"
        style={{
          width: 520,
          height: 520,
          top: "-8%",
          right: "-6%",
          background: "rgba(36, 86, 240, 0.10)",
        }}
      />
      <div
        className="blob"
        style={{
          width: 460,
          height: 460,
          top: "38%",
          left: "-10%",
          background: "rgba(109, 40, 217, 0.07)",
          animationDuration: "34s",
          animationDelay: "-8s",
        }}
      />
      <div
        className="blob"
        style={{
          width: 420,
          height: 420,
          bottom: "-6%",
          right: "18%",
          background: "rgba(14, 124, 102, 0.07)",
          animationDuration: "30s",
          animationDelay: "-16s",
        }}
      />
    </div>
  );
}
