import React, { useState, useRef, useEffect } from 'react';
import { COLORS, FONTS } from '../tokens';
import { IconClose, IconHistory, IconSend } from '../components/Icons';
import WireLabel from '../components/WireLabel';

// Mini avatar component mimicking Portal circles
const MedulaAvatar = ({ size = 28 }) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: '50%',
      border: '1px solid rgba(165,156,217,0.4)',
      boxShadow: '0 0 12px rgba(165,156,217,0.2), inset 0 0 8px rgba(165,156,217,0.1)',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    {/* Inner ring */}
    <div
      style={{
        position: 'absolute',
        width: size * 0.65,
        height: size * 0.65,
        borderRadius: '50%',
        border: '1px solid rgba(192,168,117,0.35)',
        boxShadow: '0 0 6px rgba(192,168,117,0.15)',
      }}
    />
    {/* Core glow */}
    <div
      style={{
        width: size * 0.35,
        height: size * 0.35,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(165,156,217,0.25) 0%, transparent 70%)',
      }}
    />
  </div>
);

export default function ChatScreen({ showLabels, onNavigate }) {
  const [inputValue, setInputValue] = useState('');
  const [showCloseSheet, setShowCloseSheet] = useState(false);
  const [isEnding, setIsEnding] = useState(false);
  const [visibleMessages, setVisibleMessages] = useState(0);
  const textareaRef = useRef(null);

  // Staggered message appearance
  useEffect(() => {
    const timers = [
      setTimeout(() => setVisibleMessages(1), 300),
      setTimeout(() => setVisibleMessages(2), 1200),
      setTimeout(() => setVisibleMessages(3), 2000),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const handleEndSession = () => {
    setIsEnding(true);
    setTimeout(() => {
      if (onNavigate) onNavigate('rate');
    }, 1200);
  };

  const handleInputChange = (e) => {
    const textarea = e.target;
    setInputValue(textarea.value);
    
    // Reset height to recalculate
    textarea.style.height = 'auto';
    // Set to scrollHeight, capped at max (4 lines)
    const maxHeight = 66;
    textarea.style.height = Math.min(textarea.scrollHeight, maxHeight) + 'px';
  };

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
      {/* Placeholder color styling and animations (inline styles don't support ::placeholder) */}
      <style>{`
        .chat-input::placeholder {
          color: ${COLORS.textDim};
        }
        @keyframes slideUp {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes messageAppear {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
      <WireLabel visible={showLabels} style={{ top: 8, left: 50 }}>06 — ЧАТ</WireLabel>

      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '6px 16px 8px',
          borderBottom: `1px solid ${COLORS.border}`,
        }}
      >
        <div
          onClick={() => setShowCloseSheet(true)}
          style={{ width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', cursor: 'pointer' }}
        >
          <IconClose />
          <WireLabel visible={showLabels} style={{ top: -4, left: -4 }}>Закрыть</WireLabel>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <MedulaAvatar size={28} />
          <span style={{ fontSize: 13, fontFamily: FONTS.display, color: COLORS.text, letterSpacing: '0.08em' }}>
            Медула
          </span>
        </div>
        <div style={{ width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', cursor: 'pointer' }}>
          <IconHistory />
          <WireLabel visible={showLabels} style={{ top: -4, right: -8 }}>История</WireLabel>
        </div>
      </div>

      {/* Chat messages */}
      <div style={{ flex: 1, padding: '12px 14px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {/* Medula message */}
        {visibleMessages >= 1 && (
          <div style={{ position: 'relative', animation: 'messageAppear 0.4s ease-out' }}>
            <div
              style={{
                maxWidth: '82%',
                padding: '10px 12px 6px',
                borderRadius: '2px 12px 12px 12px',
                background: `linear-gradient(135deg, ${COLORS.bgElevated}, rgba(165,156,217,0.06))`,
                border: `1px solid ${COLORS.lavenderBorder}`,
                fontSize: 11,
                color: COLORS.text,
                fontFamily: FONTS.body,
                lineHeight: 1.55,
                boxShadow: `0 0 20px rgba(165,156,217,0.04)`,
              }}
            >
              Добро пожаловать. Я Медула. Расскажи, что тебя беспокоит — и я покажу, что скрывают знаки.
              <div style={{ fontSize: 9, color: COLORS.textDim, fontFamily: FONTS.body, marginTop: 4, textAlign: 'right' }}>
                19:05
              </div>
            </div>
            <WireLabel visible={showLabels} style={{ top: -6, left: 0 }}>Сообщение Медулы — свечение</WireLabel>
          </div>
        )}

        {/* User message */}
        {visibleMessages >= 2 && (
          <div style={{ alignSelf: 'flex-end', animation: 'messageAppear 0.4s ease-out' }}>
            <div
              style={{
                maxWidth: '78%',
                padding: '10px 12px 6px',
                borderRadius: '12px 2px 12px 12px',
                background: COLORS.accentMuted,
                border: `1px solid rgba(192,168,117,0.1)`,
                fontSize: 11,
                color: COLORS.text,
                fontFamily: FONTS.body,
                lineHeight: 1.55,
              }}
            >
              Мне 34, думаю менять работу. Что покажут знаки?
              <div style={{ fontSize: 9, color: COLORS.textDim, fontFamily: FONTS.body, marginTop: 4, textAlign: 'right' }}>
                19:06
              </div>
            </div>
          </div>
        )}

        {/* Typing indicator */}
        {visibleMessages >= 3 && (
          <div style={{ position: 'relative', animation: 'messageAppear 0.4s ease-out' }}>
            <div
              style={{
                display: 'inline-flex',
                gap: 5,
                padding: '10px 16px',
                borderRadius: '2px 12px 12px 12px',
                background: COLORS.bgElevated,
                border: `1px solid ${COLORS.lavenderBorder}`,
                alignItems: 'center',
              }}
            >
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  style={{
                    width: 5,
                    height: 5,
                    borderRadius: '50%',
                    background: COLORS.lavender,
                    animation: `dotPulse 1.2s ease-in-out ${i * 0.2}s infinite`,
                  }}
                />
              ))}
            </div>
            <WireLabel visible={showLabels} style={{ top: -6, left: 0 }}>Анимация «пишет...»</WireLabel>
          </div>
        )}
      </div>

      {/* Input */}
      <div style={{ padding: '8px 12px 12px', borderTop: `1px solid ${COLORS.border}`, position: 'relative' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '10px 12px',
            borderRadius: 20,
            background: COLORS.bgElevated,
            border: `1px solid ${COLORS.border}`,
          }}
        >
          <textarea
            ref={textareaRef}
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Задайте вопрос..."
            rows={1}
            className="chat-input"
            style={{
              flex: 1,
              fontSize: 11,
              color: COLORS.text,
              fontFamily: FONTS.body,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              resize: 'none',
              maxHeight: 66,
              overflowY: 'auto',
              lineHeight: 1.5,
            }}
          />
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: '50%',
              background: COLORS.accentMuted,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            <IconSend />
          </div>
        </div>
        <WireLabel visible={showLabels} style={{ bottom: 0, left: 12 }}>Расширяется вверх при длинном тексте</WireLabel>
      </div>

      {/* Close confirmation bottom sheet */}
      {showCloseSheet && (
        <>
          {/* Overlay backdrop */}
          <div
            onClick={() => setShowCloseSheet(false)}
            style={{
              position: 'absolute',
              inset: 0,
              background: COLORS.overlay,
              animation: 'fadeIn 0.2s ease-out',
            }}
          />
          {/* Bottom sheet */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              background: COLORS.bgSheet,
              borderRadius: '16px 16px 0 0',
              padding: '20px 18px',
              border: `1px solid ${COLORS.border}`,
              borderBottom: 'none',
              boxShadow: '0 -8px 40px rgba(0,0,0,0.5)',
              animation: 'slideUp 0.25s ease-out',
            }}
          >
            <div style={{ fontSize: 14, fontFamily: FONTS.display, color: COLORS.text, textAlign: 'center', marginBottom: 6 }}>
              Завершить чат-сессию?
            </div>
            <div style={{ fontSize: 10, color: COLORS.textMuted, fontFamily: FONTS.body, textAlign: 'center', lineHeight: 1.5, marginBottom: 18 }}>
              Чат не сохранится после завершения. Вы сможете скопировать его перед закрытием.
            </div>

            <div
              onClick={!isEnding ? handleEndSession : undefined}
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
                cursor: isEnding ? 'default' : 'pointer',
                opacity: isEnding ? 0.9 : 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                minHeight: 42,
              }}
            >
              {isEnding ? (
                <>
                  <div
                    style={{
                      width: 14,
                      height: 14,
                      border: `2px solid ${COLORS.errorBorder}`,
                      borderTop: `2px solid ${COLORS.error}`,
                      borderRadius: '50%',
                      animation: 'spin 0.8s linear infinite',
                    }}
                  />
                  <span>Завершение...</span>
                </>
              ) : (
                'Завершить сессию'
              )}
            </div>

            <div
              onClick={!isEnding ? () => setShowCloseSheet(false) : undefined}
              style={{
                padding: '11px 0',
                borderRadius: 10,
                border: `1px solid ${COLORS.border}`,
                textAlign: 'center',
                fontSize: 12,
                color: COLORS.textMuted,
                fontFamily: FONTS.body,
                cursor: isEnding ? 'default' : 'pointer',
                opacity: isEnding ? 0.5 : 1,
              }}
            >
              Отменить
            </div>
          </div>
        </>
      )}
    </div>
  );
}
