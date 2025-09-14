"use client";

import { useState, useEffect } from "react";

// Note: This is a fallback hook for client-side storage
// In Claude artifacts, we use state instead of localStorage
export function useLocalStorage<T>(key: string, initialValue: T) {
  // State to store our value
  const [storedValue, setStoredValue] = useState<T>(() => {
    // In Claude artifacts, we can't use localStorage
    // So we just return the initial value
    return initialValue;
  });

  // Return a wrapped version of useState's setter function that
  // persists the new value to localStorage (or in our case, just state)
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Allow value to be a function so we have the same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;

      // Save state
      setStoredValue(valueToStore);

      // In a real app, you would save to localStorage here:
      // localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error saving to storage:`, error);
    }
  };

  return [storedValue, setValue] as const;
}
