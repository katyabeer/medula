import React from 'react';
import { COLORS, FONTS } from '../tokens';
import { IconClose, IconLock, IconChevronRight } from '../components/Icons';
import WireLabel from '../components/WireLabel';

const paymentMethods = [
  { label: 'Apple Pay', icon: '' },
  { label: 'Google Pay', icon: '' },
  { label: 'Кредитная карта', icon: '💳' },
];

export default function PaymentSheet({ showLabels }) {
  return (
    <div
      style={{
        height: '100%',
        position: 'relative',
        background: `radial-gradient(ellipse at 50% 20%, rgba(165,156,217,0.04) 0%, ${COLORS.bg} 60%)`,
      }}
    >
      <WireLabel visible={showLabels} style={{ top: 8, left: 8 }}>04 — ОПЛАТА (bottom sheet)</WireLabel>

      {/* Dimmed landing behind */}
      <div style={{ opacity: 0.3, padding: '40px 24px', textAlign: 'center' }}>
        <div style={{ fontSize: 22, fontFamily: FONTS.display, color: COLORS.text, letterSpacing: '0.15em' }}>MEDULA</div>
        <div style={{ fontSize: 9, color: COLORS.textDim, marginTop: 6, fontFamily: FONTS.body }}>Лендинг виден за sheet</div>
      </div>

      {/* Bottom Sheet */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          background: COLORS.bgSheet,
          borderRadius: '20px 20px 0 0',
          padding: '0 20px 20px',
          boxShadow: '0 -10px 40px rgba(0,0,0,0.5)',
          border: `1px solid ${COLORS.border}`,
          borderBottom: 'none',
        }}
      >
        {/* Handle + Close */}
        <div style={{ display: 'flex', justifyContent: 'center', padding: '10px 0 4px', position: 'relative' }}>
          <div style={{ width: 32, height: 3, borderRadius: 2, background: COLORS.textDim }} />
          <div
            style={{
              position: 'absolute',
              right: 0,
              top: 8,
              width: 24,
              height: 24,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            <IconClose size={12} />
          </div>
          <WireLabel visible={showLabels} style={{ top: 6, left: 0 }}>Кнопка Х</WireLabel>
        </div>

        <div style={{ fontSize: 15, fontFamily: FONTS.display, color: COLORS.text, textAlign: 'center', margin: '10px 0 4px', letterSpacing: '0.04em' }}>
          Выбери метод оплаты
        </div>

        {/* Anonymity notice */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            padding: '8px 10px',
            borderRadius: 8,
            background: COLORS.lavenderMuted,
            marginBottom: 12,
          }}
        >
          <IconLock />
          <div style={{ fontSize: 8.5, color: COLORS.lavender, fontFamily: FONTS.body, lineHeight: 1.4 }}>
            Данные оплаты не прикреплены к чат-сессии. Messages are encrypted.
          </div>
        </div>

        {/* Payment buttons */}
        {paymentMethods.map((method, i) => (
          <div
            key={i}
            style={{
              padding: '12px 14px',
              borderRadius: 10,
              border: `1px solid ${i === 0 ? COLORS.accentBorder : COLORS.border}`,
              background: i === 0 ? COLORS.accentMuted : COLORS.bgElevated,
              marginBottom: 8,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontFamily: FONTS.body,
              fontSize: 12,
              color: COLORS.text,
              cursor: 'pointer',
            }}
          >
            <span>{method.icon} {method.label}</span>
            <IconChevronRight />
          </div>
        ))}

        <div style={{ fontSize: 8, color: COLORS.textDim, textAlign: 'center', marginTop: 4, fontFamily: FONTS.body }}>
          → Далее: страница оплаты агрегатора
        </div>
      </div>
    </div>
  );
}
