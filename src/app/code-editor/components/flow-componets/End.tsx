import React from 'react';

import icons_end from './../../shared/images/end.png';

export const End = (props: any) => {

    const strokeColor: string = props.isSelecionado ? "#999fff" : "#21965300";

    return (
        <>
            <rect
                key={"End" + props.id}
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
                key={"EndImage_" + props.id}
                xlinkHref={icons_end}
                height={props.height}
                width={props.width}
                x={props.left}
                y={props.top}
                id={props.id}
            />
        </>
    );
}
