import React, { useMemo } from 'react';
import { ThemeProvider, Theme } from '@emotion/react';

import { FlowEditorBoard } from './FlowEditorBoard';
import { getTheme } from './shared/themes/GetTheme';

export interface IFlowEditorProps {

}
export const FlowEditor: React.FC<IFlowEditorProps> = ({ ...rest }) => {
  const theme = useMemo(() => {
    return getTheme({}).theme as Theme;
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <FlowEditorBoard {...rest} />
    </ThemeProvider>
  );
}
