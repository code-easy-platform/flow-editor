import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { IObservable, useObserver, useObserverValue } from 'react-observing';

import { useSizeByText } from '../../../../shared/hooks';

interface TextOverItemProps {
    onMouseDown?(event: React.MouseEvent<SVGTextElement, MouseEvent>): void;
    isEditableOnDoubleClick: IObservable<boolean | undefined>;
    isEditing: IObservable<boolean | undefined>;
    label: IObservable<string | undefined>;
    textColor?: string;
    left?: number;
}
export const TextOverItem: React.FC<TextOverItemProps> = ({ textColor, left = 0, onMouseDown, ...props }) => {
    const isEditableOnDoubleClick = useObserverValue(props.isEditableOnDoubleClick);
    const [isEditing, setIsEditing] = useObserver(props.isEditing);
    const [label] = useObserver(props.label);

    if (!isEditing) return (
        <text // Move element and display their title
            onDoubleClick={isEditableOnDoubleClick ? () => setIsEditing(true) : undefined}
            onMouseDown={onMouseDown}
            textAnchor={"middle"}
            fontSize={"small"}
            fill={textColor}
            x={left}
            y={-5}
        >{label}</text>
    );

    return (
        <TextOverLineEditor
            left={left}
            labelObservable={props.label}
            isEditingObservable={props.isEditing}
        />
    );
};

interface ITextOverLineEditorProps {
    left?: number;
    isEditingObservable: IObservable<boolean | undefined>;
    labelObservable: IObservable<string | undefined>;
}
const TextOverLineEditor: React.FC<ITextOverLineEditorProps> = ({ left = 0, labelObservable, isEditingObservable }) => {
    const [isEditing, setIsEditing] = useObserver(isEditingObservable);
    const [label, setLabel] = useObserver(labelObservable);

    const inputRef = useRef<HTMLInputElement>(null);

    const getSizeByText = useSizeByText();

    useEffect(() => {
        if (inputRef.current && isEditing) {
            inputRef.current.select();
            inputRef.current.focus();
        }
    }, [isEditing]);

    const { width, height } = useMemo(() => {
        const sizes = getSizeByText(label || '');
        const width = (sizes.width > 90 ? 90 : sizes.width) + 20;
        const height = (sizes.height || 10) + 10;

        return { width, height };
    }, [getSizeByText, label]);


    const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            inputRef.current?.blur();
            setIsEditing(false);
        } else if (e.key === 'Escape') {
            inputRef.current?.blur();
            setIsEditing(false);
        }
        e.stopPropagation();
    }, [setIsEditing]);

    return (
        <foreignObject
            y={-height}
            width={width}
            height={height}
            x={-(width / 2) + left}
            style={{ zIndex: 10, maxWidth: 100 }}
        >
            <input
                value={label}
                ref={inputRef}
                onKeyDown={handleKeyDown}
                onBlur={() => setIsEditing(false)}
                onChange={e => setLabel(e.target.value)}
                style={{
                    width: '100%',
                    maxWidth: 100,
                    height: '100%',
                    padding: 'unset',
                    fontSize: 'smaller',
                    textAlign: 'center',
                }}
            />
        </foreignObject>
    );
}
