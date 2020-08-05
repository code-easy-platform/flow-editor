import { atom } from "recoil";
import { IFlowEditorConfigs } from "../interfaces/FlowEditorInterfaces";

export const ConfigurationsStore = atom<IFlowEditorConfigs>({
    key: '',
    default: {
        selectionBackgroundColor: '#007bff1c',
        toolbarBackgroundColor: '#232323',
        flowItemWarningColor: 'yellow',
        selectionBorderType: 'normal',
        flowItemSelectedColor: 'blue',
        selectionBorderColor: 'blue',
        snapGridWhileDragging: true,
        flowItemTextColor: 'white',
        backgroundColor: '#171717',
        toolbarBorderColor: '#000',
        flowItemErrorColor: 'red',
        commentTextColor: 'white',
        backgroundType: 'dotted',
        selectionBorderWidth: 1,
        disableSelection: false,
        typesAllowedToDrop: [],
        commentColor: 'green',
        toolbarItemWidth: 30,
        disableOpacity: 0.5,
        dotColor: '#484848',
        linesColor: 'gray',
        dottedSize: 15,
        lineWidth: 1,
    }
});
