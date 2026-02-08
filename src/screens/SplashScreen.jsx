import React from 'react';
import { COLORS, FONTS } from '../tokens';
import Portal from '../components/Portal';
import WireLabel from '../components/WireLabel';

export default function SplashScreen({ showLabels }) {
  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: `radial-gradient(ellipse at 50% 40%, rgba(165,156,217,0.06) 0%, ${COLORS.bg} 70%)`,
        position: 'relative',
      }}
    >
      <WireLabel visible={showLabels} style={{ top: 8, left: 8 }}>01 — SPLASH SCREEN</WireLabel>

      <Portal size={100} opacity={0.8} animate />

      <div
        style={{
          marginTop: 20,
          fontSize: 22,
          fontFamily: FONTS.display,
          color: COLORS.text,
          letterSpacing: '0.18em',
          fontWeight: 300,
        }}
      >
        MEDULA
      </div>

      {/* Loading dots */}
      <div style={{ marginTop: 32, display: 'flex', gap: 6, alignItems: 'center' }}>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              width: 4,
              height: 4,
              borderRadius: '50%',
              background: COLORS.lavender,
              animation: `dotPulse 1.2s ease-in-out ${i * 0.15}s infinite`,
            }}
          />
        ))}
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: 16,
          fontSize: 8,
          color: COLORS.textDim,
          fontFamily: FONTS.body,
        }}
      >
        Анимация портала + загрузка
      </div>
    </div>
  );
}
