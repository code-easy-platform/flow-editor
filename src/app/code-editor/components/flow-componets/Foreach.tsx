import React from 'react';

import icons_foreach from './../../shared/images/foreach.png';

export const Foreach = (props: any) => {

    const strokeColor: string = props.isSelecionado ? "#999fff" : "#21965300";

    return (
        <>
            <rect
                key={"Foreach" + props.id}
                width={props.width - 2}
                strokeLinejoin="round"
                height={props.height}
                stroke={strokeColor}
                strokeWidth="1"
                fill="#1e1e1e"
                x={props.left}
                y={props.top}
                id={props.id}
            />
            <image
                key={"ForeachImage_" + props.id}
                xlinkHref={icons_foreach}
                height={props.height}
                width={props.width}
                x={props.left}
                y={props.top}
                id={props.id}
            />
        </>
    );
}