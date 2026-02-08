import React, { useState } from 'react';
import { COLORS, FONTS } from '../tokens';
import Portal from '../components/Portal';
import WireLabel from '../components/WireLabel';

export default function RateSessionScreen({ showLabels, onNavigate }) {
  const [rating, setRating] = useState(0);

  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: `radial-gradient(ellipse at 50% 30%, rgba(165,156,217,0.05) 0%, ${COLORS.bg} 70%)`,
        padding: 24,
        position: 'relative',
      }}
    >
      <WireLabel visible={showLabels} style={{ top: 8, left: 8 }}>09 — ОЦЕНКА СЕССИИ</WireLabel>

      <Portal size={60} opacity={0.4} style={{ marginBottom: 16 }} />

      <div style={{ fontSize: 15, fontFamily: FONTS.display, color: COLORS.text, textAlign: 'center', marginBottom: 4, letterSpacing: '0.04em' }}>
        Чат-сессия завершена
      </div>
      <div style={{ fontSize: 10, color: COLORS.textMuted, fontFamily: FONTS.body, textAlign: 'center', marginBottom: 18 }}>
        Как прошёл сеанс?
      </div>

      {/* Interactive stars */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        {[1, 2, 3, 4, 5].map((star) => (
          <div
            key={star}
            onClick={() => setRating(star)}
            style={{
              fontSize: 22,
              color: star <= rating ? COLORS.accent : COLORS.textDim,
              cursor: 'pointer',
              transition: 'color 0.15s, transform 0.15s',
              transform: star <= rating ? 'scale(1.1)' : 'scale(1)',
            }}
          >
            {star <= rating ? '★' : '☆'}
          </div>
        ))}
      </div>

      {/* Divider */}
      <div
        style={{
          width: 64,
          height: 1,
          background: `linear-gradient(90deg, transparent, ${COLORS.accent}, transparent)`,
          marginBottom: 20,
        }}
      />

      {/* Secondary CTA */}
      <div
        onClick={() => onNavigate && onNavigate('chat')}
        style={{
          width: '100%',
          padding: '13px 0',
          borderRadius: 10,
          background: 'transparent',
          border: `1px solid ${COLORS.accent}`,
          textAlign: 'center',
          fontSize: 13,
          fontWeight: 500,
          color: COLORS.accent,
          fontFamily: FONTS.body,
          cursor: 'pointer',
          boxShadow: `0 0 20px ${COLORS.accentGlow}, inset 0 0 20px rgba(192,168,117,0.05)`,
          marginBottom: 16,
        }}
      >
        Начать новую чат-сессию
      </div>

      {/* Promo */}
      <div
        style={{
          width: '100%',
          padding: '10px 16px',
          textAlign: 'center',
          position: 'relative',
        }}
      >
        <div style={{ fontSize: 11, color: COLORS.accent, fontFamily: FONTS.body, marginBottom: 2 }}>
          ✦ Вернись за новыми знаками
        </div>
        <div style={{ fontSize: 9, color: COLORS.textMuted, fontFamily: FONTS.body }}>
          Следующая чат-сессия по особой цене
        </div>
        <WireLabel visible={showLabels} style={{ top: -6, right: -4 }}>Прощальный промо</WireLabel>
      </div>
    </div>
  );
}
