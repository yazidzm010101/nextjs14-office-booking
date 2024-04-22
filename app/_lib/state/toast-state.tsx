"use client";

import { IconX } from "@tabler/icons-react";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { createPortal } from "react-dom";

interface Toast {
  title: string;
  message: string;
  type: "success" | "danger" | "info";
}

interface ToastContextType {
  clearToasts: () => void;
  showToast: (toast: Toast) => void;
}

const ToastContext = createContext<ToastContextType>({
  showToast: () => {},
  clearToasts: () => {},
});

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast can only be used inside ToastProvider!");
  }
  return context;
};

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<Record<string, Toast>>({});
  const [mounted, setMounted] = useState(false);

  const showToast = (toast: Toast) => {
    setToasts((prevVal) => {
      const key =
        String(Date.now()) + Object.keys(prevVal).length + toast.title;
      setTimeout(() => {
        dismissToast(key);
      }, 5000);
      return { ...prevVal, [key]: toast };
    });
  };

  const dismissToast = (id: string) => {
    setToasts((prevVals) => {
      const newVals = { ...prevVals };
      if (newVals[id]) {
        delete newVals[id];
      }
      return newVals;
    });
  };

  const clearToasts = () => {
    setToasts({});
  };

  const keysSorted = Object.keys(toasts).sort((prev, next) => {
    return prev > next ? 1 : -1;
  });

  useEffect(() => setMounted(true), []);

  return (
    <ToastContext.Provider value={{ showToast, clearToasts }}>
      {children}
      {mounted ?
        createPortal(
                <ul
                  className={"fixed top-12 right-12 z-20 gap-4 flex flex-col"}
                >
                  <AnimatePresence>
                    {keysSorted.map((key) => (
                      <motion.li
                        key={key}
                        initial={{ opacity: 0, x: 24 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 24 }}
                        layout
                        className={clsx(
                          "w-full md:min-w-80 max-w-md rounded-lg gap-3 px-4 py-3 shadow-lg border dark:border-black/10 dark:bg-opacity-50 backdrop-blur-lg",
                          toasts[key].type == "success" &&
                            "dark:bg-emerald-800",
                          toasts[key].type == "danger" && "dark:bg-rose-800",
                          toasts[key].type == "info" && "dark:bg-zinc-800"
                        )}
                      >
                        <div className="flex items-center w-full gap-2">
                          <h6 className="flex-grow text-lg dark:text-gray-300">
                            {toasts[key].title}
                          </h6>
                          <button
                            onClick={() => dismissToast(key)}
                            className="w-5 -mt-2 text-white rounded-full -me-2 ms-auto aspect-square hover:bg-black/5"
                            type="button"
                          >
                            <IconX className="w-full h-full" />
                          </button>
                        </div>
                        <p className="w-full text-md dark:text-gray-300 pe-6">
                          {toasts[key].message}
                        </p>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              ,
          document.body
        ): null}
    </ToastContext.Provider>
  )
};
