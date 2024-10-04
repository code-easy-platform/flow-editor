
export const getCurvedPath = ({ sourceX, sourceY, targetX, targetY }: { sourceX: number; sourceY: number; targetX: number; targetY: number; }, { offset }: { offset: number }) => {
  const centerX = (sourceX + targetX) / 2;
  const centerY = (sourceY + targetY) / 2;

  const angle = Math.atan2(targetY - sourceY, targetX - sourceX);

  const minOffset = offset;
  const adjustedOffset = offset >= 0 ? Math.max(offset, minOffset) : Math.min(offset, -minOffset);

  const finalOffset = -Math.abs(adjustedOffset);

  const offsetX = finalOffset * Math.cos(angle + Math.PI / 2);
  const offsetY = finalOffset * Math.sin(angle + Math.PI / 2);

  const controlX = centerX + offsetX;
  const controlY = centerY + offsetY;

  return `M ${sourceX} ${sourceY} Q ${controlX} ${controlY} ${targetX} ${targetY}`;
};
