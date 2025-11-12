/**
 * Theme utilities to bridge DaisyUI CSS variables with component libraries
 */

export const getThemeColor = (variable: string): string => {
  if (typeof window === "undefined") return "#000000";
  return getComputedStyle(document.documentElement)
    .getPropertyValue(variable)
    .trim();
};

export const getMantineTheme = () => {
  return {
    colors: {
      primary: getThemeColor("--color-primary"),
      secondary: getThemeColor("--color-secondary"),
      accent: getThemeColor("--color-accent"),
      neutral: getThemeColor("--color-neutral"),
      success: getThemeColor("--color-success"),
      warning: getThemeColor("--color-warning"),
      error: getThemeColor("--color-error"),
      info: getThemeColor("--color-info"),
    },
    fontFamily: '"Noto Sans", sans-serif',
    borderRadius: getThemeColor("--radius-selector"),
    spacing: {
      xs: getThemeColor("--size-selector"),
      sm: getThemeColor("--size-field"),
      md: getThemeColor("--size-selector"),
      lg: getThemeColor("--size-selector"),
    },
    shadows: {
      sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
      md: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
      lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
    },
  };
};

export const getDaisyUIColors = () => {
  return {
    background: getThemeColor("--color-base-100"),
    foreground: getThemeColor("--color-base-content"),
    primary: getThemeColor("--color-primary"),
    secondary: getThemeColor("--color-secondary"),
    accent: getThemeColor("--color-accent"),
    neutral: getThemeColor("--color-neutral"),
    success: getThemeColor("--color-success"),
    warning: getThemeColor("--color-warning"),
    error: getThemeColor("--color-error"),
    info: getThemeColor("--color-info"),
    base200: getThemeColor("--color-base-200"),
    base300: getThemeColor("--color-base-300"),
  };
};
