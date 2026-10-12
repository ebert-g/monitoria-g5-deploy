export function lerId(valor: string | undefined): number | null {
  if (valor === undefined) return null;
  const id = Number(valor);
  return Number.isInteger(id) && id > 0 ? id : null;
}
