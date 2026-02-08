/**
 * Medula Design Tokens
 * Single source of truth for all design values
 */

export const COLORS = {
  // Backgrounds
  bg:           '#0A0910',
  bgCard:       '#13111D',
  bgElevated:   '#1A1726',
  bgSheet:      '#1E1B2E',

  // Accent
  accent:       '#C0A875',
  accentMuted:  'rgba(192,168,117,0.15)',
  accentGlow:   'rgba(192,168,117,0.3)',
  accentBorder: 'rgba(192,168,117,0.2)',

  // Secondary accent
  lavender:       '#A59CD9',
  lavenderMuted:  'rgba(165,156,217,0.12)',
  lavenderGlow:   'rgba(165,156,217,0.15)',
  lavenderBorder: 'rgba(165,156,217,0.08)',

  // Text
  text:     '#E8E4F0',
  textMuted:'#8B8499',
  textDim:  '#5A5468',

  // Semantic
  error:    '#D4736A',
  errorBg:  'rgba(212,115,106,0.1)',
  errorBorder: 'rgba(212,115,106,0.15)',
  success:  '#7ABBA0',

  // Utility
  border:   'rgba(165,156,217,0.08)',
  overlay:  'rgba(10,9,16,0.85)',

  // Phone frame
  phoneBorder: 'rgba(165,156,217,0.18)',
  phoneGlow:   'rgba(165,156,217,0.12)',
};

export const FONTS = {
  display: "'Cormorant Garamond', serif",
  body:    "'DM Sans', sans-serif",
  system:  "system-ui, sans-serif",
};

export const SIZES = {
  phone: {
    width: 280,
    height: 560,
    radius: 32,
    statusBar: 36,
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 24,
    xxxl: 32,
  },
  radius: {
    sm: 6,
    md: 10,
    lg: 12,
    xl: 16,
    pill: 20,
    round: '50%',
  },
};
