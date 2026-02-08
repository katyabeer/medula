import React from 'react';
import { COLORS, FONTS } from '../tokens';
import { IconClose, IconCopy, IconSend, IconWarning } from '../components/Icons';
import WireLabel from '../components/WireLabel';

export default function NetworkErrorScreen({ showLabels }) {
  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: COLORS.bg,
        position: 'relative',
      }}
    >
      <WireLabel visible={showLabels} style={{ top: 8, left: 50 }}>08 — ОШИБКА СЕТИ (чат)</WireLabel>

      {/* Chat header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 16px 8px', borderBottom: `1px solid ${COLORS.border}` }}>
        <IconClose />
        <div style={{ fontSize: 10, fontFamily: FONTS.body, color: COLORS.textDim }}>⏱ 23:42:08</div>
        <IconCopy />
      </div>

      {/* Messages */}
      <div style={{ flex: 1, padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {/* Medula message */}
        <div
          style={{
            maxWidth: '82%',
            padding: '10px 12px',
            borderRadius: '2px 12px 12px 12px',
            background: COLORS.bgElevated,
            border: `1px solid ${COLORS.lavenderBorder}`,
            fontSize: 11,
            color: COLORS.text,
            fontFamily: FONTS.body,
            lineHeight: 1.55,
          }}
        >
          Расскажи подробнее о ситуации...
        </div>

        {/* User message with error */}
        <div style={{ alignSelf: 'flex-end', position: 'relative' }}>
          <div
            style={{
              maxWidth: '78%',
              padding: '10px 12px',
              borderRadius: '12px 2px 12px 12px',
              background: COLORS.accentMuted,
              fontSize: 11,
              color: COLORS.text,
              fontFamily: FONTS.body,
              lineHeight: 1.55,
            }}
          >
            Я хочу начать свой бизнес, но не знаю...
            {/* Error indicator */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 6 }}>
              <IconWarning />
              <span style={{ fontSize: 9, color: COLORS.error, fontFamily: FONTS.body }}>Не доставлено</span>
            </div>
          </div>
          <WireLabel visible={showLabels} style={{ bottom: -10, right: 0 }}>Ошибка отправки</WireLabel>
        </div>
      </div>

      {/* Retry banner */}
      <div style={{ padding: '0 14px 4px' }}>
        <div
          style={{
            padding: '8px 12px',
            borderRadius: 10,
            background: COLORS.errorBg,
            border: `1px solid rgba(212,115,106,0.1)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ fontSize: 9, color: COLORS.error, fontFamily: FONTS.body }}>Нет ответа от сервера</div>
          <div style={{ fontSize: 9, color: COLORS.accent, fontFamily: FONTS.body, fontWeight: 600, cursor: 'pointer' }}>Повторить ↻</div>
        </div>
      </div>

      {/* Input */}
      <div style={{ padding: '8px 12px 12px', borderTop: `1px solid ${COLORS.border}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 12px', borderRadius: 20, background: COLORS.bgElevated, border: `1px solid ${COLORS.border}` }}>
          <div style={{ flex: 1, fontSize: 11, color: COLORS.textDim, fontFamily: FONTS.body }}>Задайте вопрос...</div>
          <div style={{ width: 28, height: 28, borderRadius: '50%', background: COLORS.accentMuted, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <IconSend />
          </div>
        </div>
      </div>
    </div>
  );
}
