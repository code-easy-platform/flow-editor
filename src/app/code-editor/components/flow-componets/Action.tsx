import React from 'react';

import icons_action from './../../shared/images/action.png';

export const Action = (props: any) => {

    const strokeColor: string = props.isSelecionado ? "#999fff" : "#21965300";

    return (
        <>
            <rect
                key={"Action" + props.id}
                strokeLinejoin="round"
                height={props.height}
                stroke={strokeColor}
                width={props.width}
                strokeWidth="1"
                fill="#1e1e1e"
                x={props.left}
                y={props.top}
                id={props.id}
            />
            <image
                key={"ActionImage_" + props.id}
                xlinkHref={icons_action}
                height={props.height}
                width={props.width}
                x={props.left}
                y={props.top}
                id={props.id}
            />
        </>
    );
}
