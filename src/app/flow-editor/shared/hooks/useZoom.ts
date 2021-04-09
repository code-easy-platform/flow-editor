import { useContext } from "react";

import { ZoomContext } from "../contexts";

export const useZoom = () => {
    return useContext(ZoomContext);
}
