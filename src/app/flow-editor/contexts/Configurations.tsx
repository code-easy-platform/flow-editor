import React, { createContext, useState, useContext, memo } from 'react';

import { IFlowEditorConfigs } from '../shared/interfaces/FlowEditorInterfaces';

interface IConfigurationContextData {
    configs: IFlowEditorConfigs
}

const ConfigurationContext = createContext<IConfigurationContextData>({} as IConfigurationContextData);

export const ConfigurationProvider: React.FC<{ configs: IFlowEditorConfigs }> = memo(({ children, configs }) => {

    /** Default values from configs */
    const {
        flowItemWarningColor = 'yellow',
        flowItemSelectedColor = 'blue',
        snapGridWhileDragging = true,
        flowItemTextColor = 'white',
        flowItemErrorColor = 'red',
        backgroundType = 'dotted',
        disableSelection = false,
        typesAllowedToDrop = [],
        disableOpacity = 0.5,
        dottedSize = 15,
        lineWidth = 1,
    } = configs;

    const [state] = useState<IConfigurationContextData>({
        configs: {
            ...configs,
            flowItemWarningColor,
            flowItemSelectedColor,
            snapGridWhileDragging,
            typesAllowedToDrop,
            flowItemErrorColor,
            flowItemTextColor,
            disableSelection,
            backgroundType,
            disableOpacity,
            dottedSize,
            lineWidth,
        }
    });

    return (
        <ConfigurationContext.Provider value={state} >
            {children}
        </ConfigurationContext.Provider>
    );
});

export const useConfigs = () => useContext(ConfigurationContext).configs;
