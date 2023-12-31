// Action types
export const TOGGLE_FALLBACK = 'TOGGLE_FALLBACK';
export const TOGGLE_SYSTEM_FALLBACK = 'TOGGLE_SYSTEM_FALLBACK';

// Action creator for toggling alerts fallback
export const toggleFallback = (isChecked) => ({
  type: TOGGLE_FALLBACK,
  payload: isChecked,
});

// Action creator for toggling system fallback
export const toggleSystemFallback = (isChecked) => ({
  type: TOGGLE_SYSTEM_FALLBACK,
  payload: isChecked,
});