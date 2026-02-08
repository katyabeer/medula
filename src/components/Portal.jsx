import React from 'react';

export default function Portal({ size = 120, opacity = 0.6, animate = false, style = {} }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        border: `1.5px solid rgba(165,156,217,${opacity * 0.4})`,
        boxShadow: `0 0 ${size * 0.4}px rgba(165,156,217,${opacity * 0.15}), inset 0 0 ${size * 0.3}px rgba(165,156,217,${opacity * 0.08})`,
        position: 'relative',
        animation: animate ? 'portalPulse 4s ease-in-out infinite' : 'none',
        ...style,
      }}
    >
      {/* Inner ring */}
      <div
        style={{
          position: 'absolute',
          inset: size * 0.12,
          borderRadius: '50%',
          border: `1px solid rgba(192,168,117,${opacity * 0.25})`,
          boxShadow: `0 0 ${size * 0.2}px rgba(192,168,117,${opacity * 0.1})`,
          animation: animate ? 'portalRotate 12s linear infinite' : 'none',
        }}
      />
      {/* Core glow */}
      <div
        style={{
          position: 'absolute',
          inset: size * 0.28,
          borderRadius: '50%',
          background: `radial-gradient(circle, rgba(165,156,217,${opacity * 0.08}) 0%, transparent 70%)`,
        }}
      />
    </div>
  );
}
