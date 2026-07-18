import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { AnalyticsService } from './api/analyticsService';

// Register service worker for offline support
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .catch((err) => console.warn('SW registration failed:', err));
  });
}

// Record session start
AnalyticsService.recordSession();

createRoot(document.getElementById('root')!).render(<App />);
