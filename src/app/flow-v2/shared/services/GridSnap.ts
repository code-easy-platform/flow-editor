
export const gridSnap = (value: number, snap = 15): number => Math.round(value / snap) * snap;