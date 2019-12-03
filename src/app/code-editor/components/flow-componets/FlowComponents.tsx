import React from 'react';

export const Start = (props: any) => {

    // Configura o top e left do triangulo.
    const left2 = props.left + (props.width / 2);
    const top2 = props.top + (props.height / 2);

    // Cria o triângulo.
    const pgRightRight: number = (left2 + 10);
    const pgBottonLeft: number = left2 - 7;
    const pgBottonTop: number = top2 + 10;
    const pgTopLeft: number = (left2 - 7);
    const pgTopTop: number = (top2 - 12);
    const pgTopRight: number = top2 - 1;

    return (
        <>
            <rect
                stroke={props.isSelecionado ? "#999fff" : "#219653"}
                stroke-linejoin="round"
                height={props.height}
                width={props.width}
                stroke-width="2"
                fill="#1e1e1e"
                x={props.left}
                y={props.top}
                rx="25"
            />
            <polygon
                id={props.id}
                fill="#1e1e1e"
                stroke-width="2"
                stroke={props.isSelecionado ? "#999fff" : "#219653"}
                points={
                    pgTopLeft + ", " +
                    pgTopTop + ", " +
                    pgRightRight + ", " +
                    pgTopRight + ", " +
                    pgBottonLeft + ", " +
                    pgBottonTop
                }
            />
        </>
    );
}
