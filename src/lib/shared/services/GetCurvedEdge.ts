export const getCurvedPath = ({ sourceX, sourceY, targetX, targetY }: { sourceX: number; sourceY: number; targetX: number; targetY: number; }, offset: number) => {
  const centerX = (sourceX + targetX) / 2;
  const centerY = (sourceY + targetY) / 2;

  return `M ${sourceX} ${sourceY} Q ${centerX} ${centerY + offset} ${targetX} ${targetY}`;
};