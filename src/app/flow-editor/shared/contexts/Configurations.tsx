import React, { createContext, useState, memo } from 'react';

import { IFlowEditorConfigs } from '../interfaces';

interface IConfigurationContextData {
    configs: IFlowEditorConfigs
}
export const ConfigurationContext = createContext<IConfigurationContextData>({} as IConfigurationContextData);

export const ConfigurationProvider: React.FC<{ configs: IFlowEditorConfigs }> = memo(({ children, configs }) => {

    /** Default values from configs */
    const {
        selectionBackgroundColor = '#007bff1c',
        breadcrumbBackgroundColor = '#232323',
        toolbarBackgroundColor = '#232323',
        flowItemWarningColor = 'yellow',
        breadcrumbBorderColor = 'black',
        selectionBorderType = 'normal',
        flowItemSelectedColor = 'blue',
        selectionBorderColor = 'blue',
        breadcrumbTextColor = 'white',
        snapGridWhileDragging = true,
        flowItemTextColor = 'white',
        backgroundColor = '#171717',
        toolbarBorderColor = '#000',
        flowItemErrorColor = 'red',
        commentTextColor = 'white',
        backgroundType = 'dotted',
        selectionBorderWidth = 1,
        disableSelection = false,
        elevationColor = 'black',
        typesAllowedToDrop = [],
        commentColor = 'green',
        toolbarItemWidth = 30,
        useElevation = false,
        disableOpacity = 0.5,
        dotColor = '#484848',
        linesColor = 'gray',
        dottedSize = 15,
        lineWidth = 1,
    } = configs;

    const [state] = useState<IConfigurationContextData>({
        configs: {
            ...configs,
            selectionBackgroundColor,
            breadcrumbBackgroundColor,
            toolbarBackgroundColor,
            breadcrumbBorderColor,
            flowItemSelectedColor,
            snapGridWhileDragging,
            selectionBorderColor,
            selectionBorderWidth,
            flowItemWarningColor,
            selectionBorderType,
            breadcrumbTextColor,
            typesAllowedToDrop,
            toolbarBorderColor,
            flowItemErrorColor,
            flowItemTextColor,
            commentTextColor,
            toolbarItemWidth,
            disableSelection,
            backgroundColor,
            backgroundType,
            elevationColor,
            disableOpacity,
            useElevation,
            commentColor,
            linesColor,
            dottedSize,
            lineWidth,
            dotColor,
        }
    });

    return (
        <ConfigurationContext.Provider value={state} >
            {children}
        </ConfigurationContext.Provider>
    );
});
