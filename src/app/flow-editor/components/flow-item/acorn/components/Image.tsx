import React, { memo } from 'react';

interface ImageProps {
    imageSrc: string;
    height?: number;
    width?: number;
}
/** Render image icon */
export const ImageView: React.FC<ImageProps> = memo(({ imageSrc, height, width }) => {
    return (
        <image
            style={{ pointerEvents: 'none' }}
            xlinkHref={imageSrc}
            height={height}
            width={width}
        />
    );
});
