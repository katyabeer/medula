import React from 'react';

/**
 * Annotation label for wireframe documentation.
 * Appears as a gold badge — visible in wireframe mode, can be toggled off for presentation.
 */
export default function WireLabel({ children, style = {}, visible = true }) {
  if (!visible) return null;

  return (
    <div
      style={{
        position: 'absolute',
        background: 'rgba(192,168,117,0.9)',
        color: '#0A0910',
        fontSize: 7.5,
        padding: '2px 5px',
        borderRadius: 3,
        fontFamily: "'DM Sans', sans-serif",
        fontWeight: 600,
        whiteSpace: 'nowrap',
        zIndex: 10,
        letterSpacing: '0.02em',
        pointerEvents: 'none',
        ...style,
      }}
    >
      {children}
    </div>
  );
}
