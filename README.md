# Medula — Wireframes

Интерактивные вайрфреймы для мобильного приложения Medula. 9 экранов MVP.

## Запуск

```bash
npm install
npm run dev
```

Откроется на `http://localhost:3000`

## Структура

```
src/
├── tokens.js            # Дизайн-токены (цвета, шрифты, размеры)
├── styles.css           # Глобальные стили и анимации
├── App.jsx              # Навигация между экранами
├── components/
│   ├── Phone.jsx        # Рамка телефона
│   ├── Portal.jsx       # Анимированный портал (символ Медулы)
│   ├── WireLabel.jsx    # Аннотации (жёлтые метки)
│   └── Icons.jsx        # SVG-иконки
└── screens/
    ├── SplashScreen.jsx         # 01 — Splash
    ├── PoorConnectionScreen.jsx # 02 — Нет соединения
    ├── LandingScreen.jsx        # 03 — Лендинг
    ├── PaymentSheet.jsx         # 04 — Оплата (bottom sheet)
    ├── PaymentErrorScreen.jsx   # 05 — Ошибка оплаты
    ├── ChatScreen.jsx           # 06 — Чат
    ├── CloseConfirmScreen.jsx   # 07 — Подтверждение закрытия
    ├── NetworkErrorScreen.jsx   # 08 — Ошибка сети
    └── RateSessionScreen.jsx    # 09 — Оценка сессии
```

## Дизайн-токены

Все цвета, шрифты и размеры хранятся в `src/tokens.js` — единый источник правды. При переходе к hi-fi дизайну, меняйте значения только там.

## Аннотации

Жёлтые метки (`WireLabel`) видны по умолчанию. Кнопка «Аннотации ON/OFF» в хедере переключает их отображение — удобно для презентации клиенту.
# medula
