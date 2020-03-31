import React from 'react';

import icons_if from './../../shared/images/if.png';

export const If = (props: any) => {

    const strokeColor: string = props.isSelecionado ? "#999fff" : "#21965300";

    return (
        <>
            <rect
                key={"If" + props.id}
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
                key={"IfImage_" + props.id}
                xlinkHref={icons_if}
                height={props.height}
                width={props.width}
                x={props.left}
                y={props.top}
                id={props.id}
            />
        </>
    );
}
