const ACCENT_TONES: Record<string, { foreground: string; light: string }> = {
  "#F2A429": { foreground: "#3D2606", light: "#F5BC60" }, // Gold
  "#1C8CA1": { foreground: "#FFF9EE", light: "#6FB2BC" }, // Teal
  "#C67139": { foreground: "#FFF9EE", light: "#D99A6C" }, // Rust
};

const DEFAULT_TONE = { foreground: "#3D2606", light: "#F5BC60" };

export function getAccentStyle(accentColor: string): React.CSSProperties {
  const tone = ACCENT_TONES[accentColor] ?? DEFAULT_TONE;
  return {
    "--accent": accentColor,
    "--accent-foreground": tone.foreground,
    "--accent-light": tone.light,
  } as React.CSSProperties;
}
