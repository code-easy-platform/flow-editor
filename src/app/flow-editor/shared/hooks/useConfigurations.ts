import { useRecoilValue } from "recoil";

import { ConfigurationsStore } from "../stores";

export const useConfigs = () => {
    return useRecoilValue(ConfigurationsStore);
}
