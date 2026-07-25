import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from 'react';

const ToastContext = createContext<(msg: string) => void>(() => {});

export function ToastProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState('');
  const [show, setShow] = useState(false);
  const timerRef = useRef<number | undefined>(undefined);

  const showToast = useCallback((msg: string) => {
    setMessage(msg);
    setShow(true);
    window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => setShow(false), 3200);
  }, []);

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      <div className={`toast${show ? ' show' : ''}`}>
        <span className="dot">●</span>
        <span>{message}</span>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
