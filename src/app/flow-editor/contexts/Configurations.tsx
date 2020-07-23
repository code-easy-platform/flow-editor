import React, { createContext, useState, useContext, memo } from 'react';

import { IFlowEditorConfigs } from '../shared/interfaces/FlowEditorInterfaces';

interface IConfigurationContextData {
    configs: IFlowEditorConfigs
}

const ConfigurationContext = createContext<IConfigurationContextData>({} as IConfigurationContextData);

export const ConfigurationProvider: React.FC<{ configs: IFlowEditorConfigs }> = memo(({ children, configs }) => {

    const [state] = useState<IConfigurationContextData>({ configs });

    return (
        <ConfigurationContext.Provider value={state} >
            {children}
        </ConfigurationContext.Provider>
    );
});

export const useConfigs = () => useContext(ConfigurationContext).configs;
