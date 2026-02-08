import React from 'react';
import { COLORS, FONTS } from '../tokens';
import { IconError } from '../components/Icons';
import WireLabel from '../components/WireLabel';

export default function PaymentErrorScreen({ showLabels }) {
  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: COLORS.bg,
        padding: 28,
        position: 'relative',
      }}
    >
      <WireLabel visible={showLabels} style={{ top: 8, left: 8 }}>05 — ОШИБКА ОПЛАТЫ</WireLabel>

      <div
        style={{
          width: 44, height: 44,
          borderRadius: '50%',
          background: COLORS.errorBg,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 16,
        }}
      >
        <IconError />
      </div>

      <div style={{ fontSize: 15, color: COLORS.text, fontFamily: FONTS.display, textAlign: 'center', marginBottom: 6 }}>
        Оплата не прошла
      </div>

      <div style={{ fontSize: 10, color: COLORS.textMuted, fontFamily: FONTS.body, textAlign: 'center', lineHeight: 1.5, marginBottom: 24, maxWidth: 180 }}>
        Попробуйте другой метод оплаты или повторите попытку
      </div>

      <div
        style={{
          width: '100%',
          padding: '12px 0',
          borderRadius: 10,
          background: `linear-gradient(135deg, rgba(192,168,117,0.15), rgba(192,168,117,0.08))`,
          border: `1px solid ${COLORS.accentBorder}`,
          textAlign: 'center',
          fontSize: 12,
          color: COLORS.accent,
          fontFamily: FONTS.body,
          marginBottom: 10,
          cursor: 'pointer',
        }}
      >
        Повторить оплату
      </div>

      <div
        style={{
          width: '100%',
          padding: '12px 0',
          borderRadius: 10,
          border: `1px solid ${COLORS.border}`,
          textAlign: 'center',
          fontSize: 12,
          color: COLORS.textMuted,
          fontFamily: FONTS.body,
          cursor: 'pointer',
        }}
      >
        Вернуться
      </div>
    </div>
  );
}
