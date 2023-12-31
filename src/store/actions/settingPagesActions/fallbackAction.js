// Action types
export const TOGGLE_FALLBACK = 'TOGGLE_FALLBACK';

// Action creator for toggling alerts fallback
export const toggleFallback = (isChecked) => ({
  type: TOGGLE_FALLBACK,
  payload: isChecked,
});