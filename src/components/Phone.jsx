import React from 'react';
import { COLORS, SIZES } from '../tokens';

export default function Phone({ children, label }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
      <div
        style={{
          width: SIZES.phone.width,
          height: SIZES.phone.height,
          borderRadius: SIZES.phone.radius,
          background: COLORS.bg,
          border: `1px solid ${COLORS.phoneBorder}`,
          overflow: 'hidden',
          position: 'relative',
          boxShadow: `
            0 0 0 1px rgba(165,156,217,0.1),
            0 4px 24px rgba(0,0,0,0.4),
            0 0 80px ${COLORS.phoneGlow},
            inset 0 0 40px rgba(0,0,0,0.3)
          `,
        }}
      >
        {/* Status bar */}
        <div
          style={{
            height: SIZES.phone.statusBar,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 20px',
            fontSize: 10,
            color: COLORS.textMuted,
            fontFamily: 'system-ui',
          }}
        >
          <span>9:41</span>
          <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
            <div
              style={{
                width: 12, height: 7,
                border: `1px solid ${COLORS.textMuted}`,
                borderRadius: 1.5,
                position: 'relative',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  right: 1, top: 1, bottom: 1, left: 2,
                  background: COLORS.textMuted,
                  borderRadius: 0.5,
                }}
              />
            </div>
          </div>
        </div>

        {/* Content */}
        <div style={{ height: `calc(100% - ${SIZES.phone.statusBar}px)`, overflow: 'hidden', position: 'relative' }}>
          {children}
        </div>
      </div>

      <span
        style={{
          fontSize: 11,
          color: COLORS.textMuted,
          fontFamily: "'DM Sans', sans-serif",
          letterSpacing: '0.03em',
        }}
      >
        {label}
      </span>
    </div>
  );
}
