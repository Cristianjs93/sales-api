export const calculateTotal = (salesLines: { subtotal: number }[]): number => {
  return salesLines.reduce((acc, line) => acc + line.subtotal, 0);
};
