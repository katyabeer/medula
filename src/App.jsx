import React, { useState } from 'react';
import { COLORS, FONTS } from './tokens';
import Phone from './components/Phone';

// Screens
import SplashScreen from './screens/SplashScreen';
import PoorConnectionScreen from './screens/PoorConnectionScreen';
import LandingScreen from './screens/LandingScreen';
import PaymentSheet from './screens/PaymentSheet';
import PaymentErrorScreen from './screens/PaymentErrorScreen';
import ChatScreen from './screens/ChatScreen';
import CloseConfirmScreen from './screens/CloseConfirmScreen';
import NetworkErrorScreen from './screens/NetworkErrorScreen';
import RateSessionScreen from './screens/RateSessionScreen';

const screens = [
  { id: 'splash',  label: 'Splash',        component: SplashScreen },
  { id: 'poor',    label: 'Нет сети',      component: PoorConnectionScreen },
  { id: 'landing', label: 'Лендинг',       component: LandingScreen },
  { id: 'payment', label: 'Оплата',        component: PaymentSheet },
  { id: 'payerr',  label: 'Ошибка оплаты', component: PaymentErrorScreen },
  { id: 'chat',    label: 'Чат',           component: ChatScreen },
  { id: 'close',   label: 'Закрытие',      component: CloseConfirmScreen },
  { id: 'neterr',  label: 'Ошибка сети',   component: NetworkErrorScreen },
  { id: 'rate',    label: 'Оценка',        component: RateSessionScreen },
];

export default function App() {
  const [activeScreen, setActiveScreen] = useState(0);
  const [showLabels, setShowLabels] = useState(true);

  const ActiveComponent = screens[activeScreen].component;

  // Navigation handler for interactive screens
  const handleNavigate = (screenId) => {
    const index = screens.findIndex(s => s.id === screenId);
    if (index !== -1) {
      setActiveScreen(index);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#06050B' }}>
      {/* Header */}
      <div style={{ padding: '24px 32px 16px', borderBottom: `1px solid ${COLORS.border}` }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
            <span style={{ fontFamily: FONTS.display, fontSize: 22, letterSpacing: '0.15em', fontWeight: 300, color: COLORS.text }}>
              MEDULA
            </span>
            <span style={{ fontSize: 11, color: COLORS.textMuted, fontFamily: FONTS.body, letterSpacing: '0.05em' }}>
              Wireframes · v1.0
            </span>
          </div>

          {/* Labels toggle */}
          <button
            onClick={() => setShowLabels(!showLabels)}
            style={{
              padding: '5px 10px',
              borderRadius: 6,
              border: `1px solid ${showLabels ? COLORS.accentBorder : COLORS.border}`,
              background: showLabels ? COLORS.accentMuted : 'transparent',
              color: showLabels ? COLORS.accent : COLORS.textDim,
              fontSize: 10,
              fontFamily: FONTS.body,
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            {showLabels ? '✦ Аннотации ON' : '○ Аннотации OFF'}
          </button>
        </div>
        <p style={{ fontSize: 11, color: COLORS.textDim, fontFamily: FONTS.body, margin: 0, lineHeight: 1.5 }}>
          9 экранов · User Flow по ТЗ · Жёлтые метки = аннотации для разработчика
        </p>
      </div>

      {/* Tab navigation */}
      <div
        style={{
          display: 'flex',
          gap: 2,
          padding: '12px 32px',
          overflowX: 'auto',
          borderBottom: `1px solid ${COLORS.border}`,
        }}
      >
        {screens.map((s, i) => (
          <button
            key={s.id}
            onClick={() => setActiveScreen(i)}
            style={{
              padding: '6px 12px',
              borderRadius: 6,
              border: 'none',
              background: activeScreen === i ? COLORS.accentMuted : 'transparent',
              color: activeScreen === i ? COLORS.accent : COLORS.textMuted,
              fontSize: 11,
              fontFamily: FONTS.body,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.2s',
            }}
          >
            {String(i + 1).padStart(2, '0')} {s.label}
          </button>
        ))}
      </div>

      {/* Screen display */}
      <div style={{ display: 'flex', justifyContent: 'center', padding: '32px 24px 24px' }}>
        <Phone label={`${String(activeScreen + 1).padStart(2, '0')} — ${screens[activeScreen].label}`}>
          <ActiveComponent showLabels={showLabels} onNavigate={handleNavigate} />
        </Phone>
      </div>

      {/* Flow diagram */}
      <div style={{ padding: '0 32px 16px' }}>
        <div style={{ fontSize: 11, color: COLORS.textMuted, fontFamily: FONTS.body, marginBottom: 10, letterSpacing: '0.05em' }}>
          USER FLOW
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, flexWrap: 'wrap' }}>
          {screens.map((s, i) => (
            <span key={s.id} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <span
                onClick={() => setActiveScreen(i)}
                style={{
                  padding: '3px 8px',
                  borderRadius: 4,
                  background: activeScreen === i ? COLORS.accentMuted : COLORS.bgElevated,
                  color: activeScreen === i ? COLORS.accent : COLORS.textMuted,
                  cursor: 'pointer',
                  border: `1px solid ${activeScreen === i ? COLORS.accentBorder : COLORS.border}`,
                  fontSize: 9,
                  fontFamily: FONTS.body,
                  transition: 'all 0.15s',
                }}
              >
                {s.label}
              </span>
              {i < screens.length - 1 && <span style={{ color: COLORS.textDim, fontSize: 9 }}>→</span>}
            </span>
          ))}
        </div>
      </div>

      {/* Keyboard navigation hint */}
      <div style={{ padding: '0 32px 32px' }}>
        <div style={{ fontSize: 9, color: COLORS.textDim, fontFamily: FONTS.body }}>
          Совет: используй ← → для переключения экранов
        </div>
      </div>
    </div>
  );
}
