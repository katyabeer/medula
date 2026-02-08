import React from 'react';
import { COLORS, FONTS } from '../tokens';
import WireLabel from '../components/WireLabel';

export default function CloseConfirmScreen({ showLabels }) {
  return (
    <div style={{ height: '100%', background: COLORS.bg, position: 'relative' }}>
      <WireLabel visible={showLabels} style={{ top: 8, left: 8 }}>07 — ПОДТВЕРЖДЕНИЕ ЗАКРЫТИЯ</WireLabel>

      {/* Dimmed chat behind */}
      <div style={{ opacity: 0.15, padding: '14px 16px', borderBottom: `1px solid ${COLORS.border}` }}>
        <div style={{ fontSize: 9, color: COLORS.textMuted }}>Чат за оверлеем</div>
      </div>

      {/* Overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: COLORS.overlay,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 24,
        }}
      >
        <div
          style={{
            width: '100%',
            background: COLORS.bgSheet,
            borderRadius: 16,
            padding: '20px 18px',
            border: `1px solid ${COLORS.border}`,
            boxShadow: '0 8px 40px rgba(0,0,0,0.5)',
            animation: 'fadeInUp 0.2s ease-out',
          }}
        >
          <div style={{ fontSize: 14, fontFamily: FONTS.display, color: COLORS.text, textAlign: 'center', marginBottom: 6 }}>
            Завершить чат-сессию?
          </div>
          <div style={{ fontSize: 10, color: COLORS.textMuted, fontFamily: FONTS.body, textAlign: 'center', lineHeight: 1.5, marginBottom: 18 }}>
            Чат не сохранится после завершения. Вы сможете скопировать его перед закрытием.
          </div>

          <div
            style={{
              padding: '11px 0',
              borderRadius: 10,
              background: COLORS.errorBg,
              border: `1px solid ${COLORS.errorBorder}`,
              textAlign: 'center',
              fontSize: 12,
              color: COLORS.error,
              fontFamily: FONTS.body,
              marginBottom: 8,
              cursor: 'pointer',
            }}
          >
            Закрыть
          </div>

          <div
            style={{
              padding: '11px 0',
              borderRadius: 10,
              border: `1px solid ${COLORS.border}`,
              textAlign: 'center',
              fontSize: 12,
              color: COLORS.textMuted,
              fontFamily: FONTS.body,
              cursor: 'pointer',
            }}
          >
            Отменить
          </div>
        </div>
      </div>
    </div>
  );
}
