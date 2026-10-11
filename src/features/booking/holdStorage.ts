const getHoldKey = (sessionId: number) => `kinoxii:active-hold:${sessionId}`;

export const saveHoldId = (sessionId: number, holdId: string) => {
  if (typeof window === "undefined") return;

  window.sessionStorage.setItem(getHoldKey(sessionId), holdId);
};

export const getSavedHoldId = (sessionId: number): string | null => {
  if (typeof window === "undefined") return null;

  return window.sessionStorage.getItem(getHoldKey(sessionId));
};

export const clearSavedHoldId = (sessionId: number) => {
  if (typeof window === "undefined") return;

  window.sessionStorage.removeItem(getHoldKey(sessionId));
};
