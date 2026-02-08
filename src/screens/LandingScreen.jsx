import React, { useState, useRef, useEffect } from 'react';
import { COLORS, FONTS } from '../tokens';
import Portal from '../components/Portal';
import { IconArrowRight, IconClose, IconLock, IconChevronRight } from '../components/Icons';
import WireLabel from '../components/WireLabel';

const paymentMethods = [
  { label: 'Apple Pay', icon: '' },
  { label: 'Google Pay', icon: '' },
  { label: 'Кредитная карта', icon: '💳' },
];

export default function LandingScreen({ showLabels, onNavigate }) {
  // Slider state
  const [sliderX, setSliderX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(0);
  
  const trackRef = useRef(null);
  const startXRef = useRef(0);
  
  // Calculate max slide distance (track width - handle width - padding)
  const HANDLE_SIZE = 40;
  const TRACK_PADDING = 8;
  const MAX_SLIDE = 280 - 48 - HANDLE_SIZE - TRACK_PADDING; // ~184px
  const THRESHOLD = 0.8; // 80% to trigger

  const handleDragStart = (clientX) => {
    setIsDragging(true);
    startXRef.current = clientX - sliderX;
  };

  const handleDragMove = (clientX) => {
    if (!isDragging) return;
    const newX = Math.max(0, Math.min(clientX - startXRef.current, MAX_SLIDE));
    setSliderX(newX);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    
    // Check if threshold reached
    if (sliderX >= MAX_SLIDE * THRESHOLD) {
      setSliderX(MAX_SLIDE);
      setTimeout(() => setShowPayment(true), 150);
    } else {
      // Snap back
      setSliderX(0);
    }
  };

  // Mouse events
  const onMouseDown = (e) => {
    e.preventDefault();
    handleDragStart(e.clientX);
  };

  // Touch events
  const onTouchStart = (e) => {
    handleDragStart(e.touches[0].clientX);
  };

  // Global move/end handlers
  useEffect(() => {
    const onMouseMove = (e) => handleDragMove(e.clientX);
    const onTouchMove = (e) => handleDragMove(e.touches[0].clientX);
    const onEnd = () => handleDragEnd();

    if (isDragging) {
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onEnd);
      window.addEventListener('touchmove', onTouchMove);
      window.addEventListener('touchend', onEnd);
    }

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onEnd);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onEnd);
    };
  }, [isDragging, sliderX]);

  const closePayment = () => {
    setShowPayment(false);
    setSliderX(0);
  };

  // Calculate text opacity (fades out as slider moves)
  const textOpacity = 1 - (sliderX / MAX_SLIDE) * 1.5;

  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: `radial-gradient(ellipse at 50% 20%, rgba(165,156,217,0.05) 0%, ${COLORS.bg} 60%)`,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <WireLabel visible={showLabels} style={{ top: 8, left: 8 }}>03 — ЛЕНДИНГ</WireLabel>

      {/* Decorative portal */}
      <div style={{ position: 'absolute', top: 30, left: '50%', transform: 'translateX(-50%)' }}>
        <Portal size={160} opacity={0.3} animate />
      </div>

      {/* Hero content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '60px 24px 0' }}>
        <div style={{ fontSize: 28, fontFamily: FONTS.display, color: COLORS.text, letterSpacing: '0.2em', fontWeight: 300, marginBottom: 6 }}>
          MEDULA
        </div>
        <div style={{ width: 32, height: 1, background: `linear-gradient(90deg, transparent, ${COLORS.accent}, transparent)`, marginBottom: 16 }} />
        <div style={{ fontSize: 11, color: COLORS.textMuted, fontFamily: FONTS.body, textAlign: 'center', lineHeight: 1.6, maxWidth: 200, marginBottom: 8 }}>
          Узнай, что скрывает твой путь. Анонимный чат-сеанс с цифровым оракулом.
        </div>
      </div>

      {/* Promo text from backend */}
      <div style={{ padding: '0 24px', marginBottom: 12, position: 'relative' }}>
        <div
          style={{
            padding: '10px 14px',
            borderRadius: 10,
            background: COLORS.accentMuted,
            border: `1px solid rgba(192,168,117,0.12)`,
          }}
        >
          <div style={{ fontSize: 11, color: COLORS.accent, fontFamily: FONTS.body, textAlign: 'center', lineHeight: 1.5 }}>
            ✦ Первый сеанс бесплатный, далее $X за сеанс
          </div>
        </div>
        <WireLabel visible={showLabels} style={{ top: -6, right: -4 }}>Текст из бэкенда</WireLabel>
      </div>

      {/* Slider CTA */}
      <div style={{ padding: '0 24px', marginBottom: 10, position: 'relative' }}>
        <div
          ref={trackRef}
          style={{
            height: 48,
            borderRadius: 24,
            background: `linear-gradient(135deg, ${COLORS.bgElevated}, ${COLORS.bgSheet})`,
            border: `1px solid rgba(192,168,117,0.15)`,
            display: 'flex',
            alignItems: 'center',
            padding: '0 4px',
            position: 'relative',
            overflow: 'hidden',
            cursor: isDragging ? 'grabbing' : 'default',
          }}
        >
          {/* Slider handle */}
          <div
            onMouseDown={onMouseDown}
            onTouchStart={onTouchStart}
            style={{
              width: HANDLE_SIZE,
              height: HANDLE_SIZE,
              borderRadius: HANDLE_SIZE / 2,
              background: `linear-gradient(135deg, ${COLORS.accent}, #D8C39E)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: `0 0 16px ${COLORS.accentGlow}`,
              transform: `translateX(${sliderX}px)`,
              transition: isDragging ? 'none' : 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              cursor: 'grab',
              userSelect: 'none',
              touchAction: 'none',
              zIndex: 1,
            }}
          >
            <IconArrowRight />
          </div>
          {/* Slider text */}
          <div 
            style={{ 
              position: 'absolute',
              left: 0,
              right: 0,
              textAlign: 'center', 
              fontSize: 11, 
              color: COLORS.textMuted, 
              fontFamily: FONTS.body, 
              letterSpacing: '0.05em',
              opacity: Math.max(0, textOpacity),
              transition: isDragging ? 'none' : 'opacity 0.3s ease',
              pointerEvents: 'none',
            }}
          >
            Начать чат-сессию →
          </div>
        </div>
        <WireLabel visible={showLabels} style={{ top: -6, left: 0 }}>Slide-to-start</WireLabel>
      </div>

      {/* Disclaimer */}
      <div style={{ padding: '0 24px 16px', position: 'relative' }}>
        <div style={{ fontSize: 8, color: COLORS.textDim, fontFamily: FONTS.body, textAlign: 'center', lineHeight: 1.5 }}>
          Медула не заменяет профессиональные консультации. Все данные анонимны. Условия использования.
        </div>
        <WireLabel visible={showLabels} style={{ bottom: 2, right: 8 }}>Дисклеймер</WireLabel>
      </div>

      {/* Payment Bottom Sheet Overlay */}
      {showPayment && (
        <>
          {/* Backdrop */}
          <div
            onClick={closePayment}
            style={{
              position: 'absolute',
              inset: 0,
              background: COLORS.overlay,
              animation: 'fadeIn 0.2s ease',
              zIndex: 10,
            }}
          />
          
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
              animation: 'slideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              zIndex: 11,
            }}
          >
            {/* Handle + Close */}
            <div style={{ display: 'flex', justifyContent: 'center', padding: '10px 0 4px', position: 'relative' }}>
              <div style={{ width: 32, height: 3, borderRadius: 2, background: COLORS.textDim }} />
              <div
                onClick={closePayment}
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
                onClick={() => setSelectedPayment(i)}
                style={{
                  padding: '12px 14px',
                  borderRadius: 10,
                  border: `1px solid ${selectedPayment === i ? COLORS.accentBorder : COLORS.border}`,
                  background: selectedPayment === i ? COLORS.accentMuted : COLORS.bgElevated,
                  marginBottom: 8,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontFamily: FONTS.body,
                  fontSize: 12,
                  color: COLORS.text,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                <span>{method.icon} {method.label}</span>
                <IconChevronRight color={selectedPayment === i ? COLORS.accent : COLORS.textMuted} />
              </div>
            ))}

            {/* Next button */}
            <div
              onClick={() => onNavigate && onNavigate('chat')}
              style={{
                padding: '14px',
                borderRadius: 10,
                background: `linear-gradient(135deg, ${COLORS.accent}, #D8C39E)`,
                marginTop: 12,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: FONTS.body,
                fontSize: 13,
                fontWeight: 500,
                color: COLORS.bg,
                cursor: 'pointer',
                boxShadow: `0 4px 16px ${COLORS.accentGlow}`,
              }}
            >
              Далее →
            </div>
          </div>

          {/* CSS Animations */}
          <style>{`
            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            @keyframes slideUp {
              from { transform: translateY(100%); }
              to { transform: translateY(0); }
            }
          `}</style>
        </>
      )}
    </div>
  );
}
