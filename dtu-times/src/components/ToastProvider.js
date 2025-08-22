import React, { createContext, useContext, useState, useCallback } from 'react';

const ToastContext = createContext();

export function useToast() {
  return useContext(ToastContext);
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = 'info', duration = 3000) => {
    // Use a deterministic id for SSR/CSR match (incrementing counter)
    setToasts((prev) => {
      const id = prev.length > 0 ? prev[prev.length - 1].id + 1 : 1;
      setTimeout(() => {
        setToasts((prev2) => prev2.filter((t) => t.id !== id));
      }, duration);
      return [...prev, { id, message, type }];
    });
  }, []);

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed right-6 bottom-8 z-[9999] flex flex-col gap-3 items-end">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={
              `min-w-[220px] max-w-xs px-5 py-3 rounded-lg shadow-lg flex items-center gap-3 text-sm font-medium animate-fadeIn cursor-pointer transition-all duration-300 ` +
              (toast.type === 'success' ? 'bg-green-500 text-white ' : '') +
              (toast.type === 'error' ? 'bg-red-500 text-white ' : '') +
              (toast.type === 'info' ? 'bg-gray-800 text-white ' : '') +
              (toast.type === 'warning' ? 'bg-yellow-500 text-black ' : '')
            }
            onClick={() => removeToast(toast.id)}
            style={{ boxShadow: '0 4px 24px 0 rgba(0,0,0,0.12)' }}
          >
            {toast.type === 'success' && <span>✅</span>}
            {toast.type === 'error' && <span>❌</span>}
            {toast.type === 'info' && <span>ℹ️</span>}
            {toast.type === 'warning' && <span>⚠️</span>}
            <span>{toast.message}</span>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

// Add this to your root layout to enable toasts everywhere
// import { ToastProvider } from '@/components/ToastProvider';
// <ToastProvider>{children}</ToastProvider>
