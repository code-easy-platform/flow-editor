import styled from '@emotion/styled';

import { ICustomTheme } from '../themes/ICustomTheme';

interface IStyledPanelProps extends ICustomTheme {
  zoom?: number;
  isDotted?: boolean;
  dottedSize?: number;
}
export const StyledPanel = styled.div(() => ({
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  width: '100%',
  height: '100%',
  position: 'absolute',
  backgroundColor: 'transparent'
}));
export const StyledSvgPanel = styled.svg(() => ({
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  width: '100%',
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  backgroundColor: 'transparent'
}));

export const StyledPanelWrapper = styled.div<IStyledPanelProps>(({ theme, isDotted, dottedSize = 15, zoom = 1 }) => ({
  margin: 0,
  padding: 0,
  width: '100%',
  height: '100%',
  display: 'block',
  backgroundImage: `radial-gradient(${theme.background.paper} 5%, ${theme.background.default} 5%)`,
  backgroundSize: isDotted ? `${(dottedSize / zoom) / devicePixelRatio}px ${(dottedSize / zoom) / devicePixelRatio}px` : undefined,
}));


