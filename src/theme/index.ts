import { RoleDto, RoleName, UserDto, UserStatus, FrequencyDto, MessageDto, MembershipDto } from "@/lib/types.ts";

export interface DesignTokens {
  colors: {
    primary: string;
    primaryDark: string;
    secondary: string;
    glassBgLight: string;
    glassBgDark: string;
    glassBorderLight: string;
    glassBorderDark: string;
    glassFrostLight: string;
    glassFrostDark: string;
    textStrong: string;
    textStrongDark: string;
  };
  blur: {
    card: string;
    overlay: string;
  };
  opacity: {
    glassLight: number;
    glassDark: number;
  };
  shadows: {
    elevation1: string;
    elevation2: string;
  };
  radii: {
    card: number;
    pill: number;
  };
  typography: {
    fontFamily: string[];
    fontSizes: {
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
    lineHeights: {
      normal: string;
      relaxed: string;
    };
  };
}

export const tokens: DesignTokens = {
  colors: {
    primary: "#0A84FF",
    primaryDark: "#5AC8FA",
    secondary: "#5E5CE6",
    glassBgLight: "rgba(255,255,255,0.6)",
    glassBgDark: "rgba(20,20,25,0.36)",
    glassBorderLight: "rgba(255,255,255,0.4)",
    glassBorderDark: "rgba(255,255,255,0.06)",
    glassFrostLight: "rgba(255,255,255,0.2)",
    glassFrostDark: "rgba(255,255,255,0.04)",
    textStrong: "#0B1220",
    textStrongDark: "#E6EDF3",
  },
  blur: {
    card: "12px",
    overlay: "20px",
  },
  opacity: {
    glassLight: 0.55,
    glassDark: 0.36,
  },
  shadows: {
    elevation1: "0 6px 18px rgba(10,12,20,0.08)",
    elevation2: "0 12px 40px rgba(10,12,20,0.12)",
  },
  radii: {
    card: 12,
    pill: 9999,
  },
  typography: {
    fontFamily: [
      "system-ui",
      "-apple-system",
      "BlinkMacSystemFont",
      "Inter",
      "SF Pro Text",
      "ui-sans-serif",
      "sans-serif",
    ],
    fontSizes: {
      sm: "0.875rem",
      md: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
    },
    lineHeights: {
      normal: "1.4",
      relaxed: "1.6",
    },
  },
};

export type ThemeRole = RoleDto;
export type ThemeUser = UserDto;
export type ThemeFrequency = FrequencyDto;
export type ThemeMessage = MessageDto;
export type ThemeMembership = MembershipDto;
export type ThemeUserStatus = UserStatus;
export type ThemeRoleName = RoleName;
