import React from 'react';

export const End = (props: any) => {

    // Configura o top e left do quadrado.
    const left2 = props.left + (props.width / 3);
    const top2 = props.top + (props.height / 3);

    return (
        <>
            <rect
                stroke={props.isSelecionado ? "#999fff" : "#219653"}
                key={"End_" + props.id}
                strokeLinejoin="round"
                height={props.height}
                width={props.width}
                strokeWidth="2"
                fill="#1e1e1e"
                x={props.left}
                y={props.top}
                id={props.id}
                rx="25"
            />
            <rect
                stroke={props.isSelecionado ? "#999fff" : "#219653"}
                strokeLinejoin="round"
                height={props.height / 3}
                width={props.width / 3}
                strokeWidth="2"
                fill="#1e1e1e"
                key={props.id}
                id={props.id}
                x={left2}
                y={top2}
            />
        </>
    );
}
