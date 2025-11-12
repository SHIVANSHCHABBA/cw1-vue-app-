export function nameOk(s) {
  const trimmed = String(s ?? '').trim();
  return /^[A-Za-z\s'-]+$/.test(trimmed);
}

export function phoneOk(s) {
  const trimmed = String(s ?? '').trim();
  return /^[0-9]+$/.test(trimmed);
}
