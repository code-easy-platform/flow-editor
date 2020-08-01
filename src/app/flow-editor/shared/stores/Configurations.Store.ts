import { atom } from "recoil";
import { IFlowEditorConfigs } from "../interfaces/FlowEditorInterfaces";

export const ConfigurationsStore = atom<IFlowEditorConfigs>({
    key: '',
    default: {
        flowItemWarningColor: 'yellow',
        flowItemSelectedColor: 'blue',
        snapGridWhileDragging: true,
        flowItemTextColor: 'white',
        flowItemErrorColor: 'red',
        commentTextColor: 'white',
        backgroundType: 'dotted',
        disableSelection: false,
        typesAllowedToDrop: [],
        commentColor: 'green',
        disableOpacity: 0.5,
        linesColor: 'gray',
        dottedSize: 15,
        lineWidth: 1,
    }
});
