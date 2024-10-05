export function getEdgeCenter({ sourceX, sourceY, targetX, targetY }: { sourceX: number; sourceY: number; targetX: number; targetY: number; }): [number, number, number, number] {
  const xOffset = Math.abs(targetX - sourceX) / 2;
  const centerX = targetX < sourceX ? targetX + xOffset : targetX - xOffset;

  const yOffset = Math.abs(targetY - sourceY) / 2;
  const centerY = targetY < sourceY ? targetY + yOffset : targetY - yOffset;

  return [centerX, centerY, xOffset, yOffset];
}


export type GetStraightPathParams = {
  sourceX: number;
  sourceY: number;
  targetX: number;
  targetY: number;
};

/**
 * Get a straight path from source to target handle
 * @param params.sourceX - The x position of the source handle
 * @param params.sourceY - The y position of the source handle
 * @param params.targetX - The x position of the target handle
 * @param params.targetY - The y position of the target handle
 * @returns A path string you can use in an SVG, the labelX and labelY position (center of path) and offsetX, offsetY between source handle and label
 * @example
 *  const source = { x: 0, y: 20 };
    const target = { x: 150, y: 100 };
    
    const [path, labelX, labelY, offsetX, offsetY] = getStraightPath({
      sourceX: source.x,
      sourceY: source.y,
      sourcePosition: Position.Right,
      targetX: target.x,
      targetY: target.y,
      targetPosition: Position.Left,
    });
 */
export function getStraightPath({ sourceX, sourceY, targetX, targetY, }: GetStraightPathParams) {
  const [labelX, labelY, offsetX, offsetY] = getEdgeCenter({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  return [
    `M ${sourceX},${sourceY}L ${targetX},${targetY}`,
    { labelX, labelY, offsetX, offsetY }
  ] as const;
}