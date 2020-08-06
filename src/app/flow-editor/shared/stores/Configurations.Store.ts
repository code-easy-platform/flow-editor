import { atom } from "recoil";
import { IFlowEditorConfigs } from "../interfaces/FlowEditorInterfaces";

export const ConfigurationsStore = atom<IFlowEditorConfigs>({
    key: '',
    default: {
        selectionBackgroundColor: '#007bff1c',
        breadcrumbBackgroundColor: '#232323',
        toolbarBackgroundColor: '#232323',
        flowItemWarningColor: 'yellow',
        breadcrumbBorderColor: 'black',
        selectionBorderType: 'normal',
        flowItemSelectedColor: 'blue',
        selectionBorderColor: 'blue',
        breadcrumbTextColor: 'white',
        snapGridWhileDragging: true,
        flowItemTextColor: 'white',
        backgroundColor: '#171717',
        toolbarBorderColor: '#000',
        flowItemErrorColor: 'red',
        commentTextColor: 'white',
        backgroundType: 'dotted',
        selectionBorderWidth: 1,
        disableSelection: false,
        elevationColor: 'black',
        typesAllowedToDrop: [],
        commentColor: 'green',
        toolbarItemWidth: 30,
        useElevation: false,
        disableOpacity: 0.5,
        dotColor: '#484848',
        linesColor: 'gray',
        dottedSize: 15,
        lineWidth: 1,
    }
});
