import React from 'react';

import icons_assign from './../../shared/images/assign.png';

export const Assign = (props: any) => {

    const strokeColor: string = props.isSelecionado ? "#999fff" : "#21965300";

    return (
        <>
            <rect
                key={"Assign" + props.id}
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
                key={"AssignImage_" + props.id}
                xlinkHref={icons_assign}
                height={props.height}
                width={props.width}
                x={props.left}
                y={props.top}
                id={props.id}
            />
        </>
    );
}
