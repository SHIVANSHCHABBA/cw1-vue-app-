export const nameOk = s => /^[A-Za-z\s'-]+$/.test(String(s || '').trim());
export const phoneOk = s => /^[0-9]+$/.test(String(s || '').trim());
