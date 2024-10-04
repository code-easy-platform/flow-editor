

interface IIntersectionNodePosition {
  x: number;
  y: number;
};

interface IIntersectionNode {
  x: number;
  y: number;
  width: number;
  height: number;
}
function getNodeIntersection(intersectionNode: IIntersectionNode, targetNode: IIntersectionNode): IIntersectionNodePosition {
  const intersectionNodeWidth = intersectionNode.width;
  const intersectionNodeHeight = intersectionNode.height;
  const intersectionNodePosition = { x: intersectionNode.x, y: intersectionNode.y };

  const targetPosition = { x: targetNode.x, y: targetNode.y };

  const w = intersectionNodeWidth / 2;
  const h = intersectionNodeHeight / 2;

  const x2 = intersectionNodePosition.x + w;
  const y2 = intersectionNodePosition.y + h;
  const x1 = targetPosition.x + targetNode.width / 2; // should be "measured".width
  const y1 = targetPosition.y + targetNode.height / 2; // should be "measured".width

  const xx1 = (x1 - x2) / (2 * w) - (y1 - y2) / (2 * h);
  const yy1 = (x1 - x2) / (2 * w) + (y1 - y2) / (2 * h);
  const a = 1 / (Math.abs(xx1) + Math.abs(yy1) || 1);
  const xx3 = a * xx1;
  const yy3 = a * yy1;
  const x = w * (xx3 + yy3) + x2;
  const y = h * (-xx3 + yy3) + y2;

  return { x, y };
}

// returns the position (top,right,bottom or right) passed node compared to the intersection point
function getEdgePosition(node: IIntersectionNode, intersectionPoint: IIntersectionNodePosition) {
  const n = { ...{ x: node.x, y: node.y }, measured: { width: node.width, height: node.height }, ...node };

  const nx = Math.round(n.x);
  const ny = Math.round(n.y);
  const px = Math.round(intersectionPoint.x);
  const py = Math.round(intersectionPoint.y);

  if (px <= nx + 1) {
    return 'left';
  }
  if (px >= nx + n.measured.width - 1) {
    return 'right';
  }
  if (py <= ny + 1) {
    return 'top';
  }
  if (py >= n.y + n.measured.height - 1) {
    return 'bottom';
  }

  return 'top';
}

// returns the parameters (sx, sy, tx, ty, sourcePos, targetPos) you need to create an edge
export function getEdgeParams(source: IIntersectionNode, target: IIntersectionNode) {
  const sourceIntersectionPoint = getNodeIntersection(source, target);
  const targetIntersectionPoint = getNodeIntersection(target, source);

  const sourcePos = getEdgePosition(source, sourceIntersectionPoint);
  const targetPos = getEdgePosition(target, targetIntersectionPoint);

  return {
    sx: sourceIntersectionPoint.x,
    sy: sourceIntersectionPoint.y,
    tx: targetIntersectionPoint.x,
    ty: targetIntersectionPoint.y,
    sourcePos,
    targetPos,
  };
}
/* 
export function createNodesAndEdges() {
  const nodes = [];
  const edges = [];
  const center = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

  nodes.push({ id: 'target', data: { label: 'Target' }, position: center });

  for (let i = 0; i < 8; i++) {
    const degrees = i * (360 / 8);
    const radians = degrees * (Math.PI / 180);
    const x = 250 * Math.cos(radians) + center.x;
    const y = 250 * Math.sin(radians) + center.y;

    nodes.push({ id: `${i}`, data: { label: 'Source' }, position: { x, y } });

    edges.push({
      id: `edge-${i}`,
      target: 'target',
      source: `${i}`,
      type: 'floating',
      markerEnd: {
        type: MarkerType.Arrow,
      },
    });
  }

  return { nodes, edges };
} */
