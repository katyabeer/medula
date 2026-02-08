import React from 'react';
import { COLORS, FONTS } from '../tokens';
import { IconWifi } from '../components/Icons';
import WireLabel from '../components/WireLabel';

export default function PoorConnectionScreen({ showLabels }) {
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
      <WireLabel visible={showLabels} style={{ top: 8, left: 8 }}>02 — ПЛОХОЕ СОЕДИНЕНИЕ</WireLabel>

      <div
        style={{
          width: 40, height: 40,
          borderRadius: '50%',
          border: `1.5px solid ${COLORS.textDim}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 16,
        }}
      >
        <IconWifi />
      </div>

      <div style={{ fontSize: 15, color: COLORS.text, fontFamily: FONTS.display, textAlign: 'center', marginBottom: 8, letterSpacing: '0.02em' }}>
        Нет соединения
      </div>

      <div style={{ fontSize: 11, color: COLORS.textMuted, fontFamily: FONTS.body, textAlign: 'center', lineHeight: 1.5, marginBottom: 24 }}>
        Проверьте подключение к интернету и попробуйте снова
      </div>

      <div
        style={{
          width: '100%',
          padding: '11px 0',
          borderRadius: 10,
          border: `1px solid ${COLORS.border}`,
          background: COLORS.bgElevated,
          textAlign: 'center',
          fontSize: 12,
          color: COLORS.text,
          fontFamily: FONTS.body,
          cursor: 'pointer',
        }}
      >
        Попробовать снова
      </div>
    </div>
  );
}
