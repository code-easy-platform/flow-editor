import { observe, selector } from 'react-observing';
import { v4 as uuid } from 'uuid';


export const FlowStore = observe([
  {
    id: observe(uuid()),
    top: observe(450),
    left: observe(450),
    width: observe(80),
    height: observe(40),
    render: () => <span>End</span>
  },
  {
    id: observe(uuid()),
    top: observe(250),
    left: observe(250),
    width: observe(100),
    height: observe(100),
    render: () => <span>Node</span>
  },
  {
    id: observe(uuid()),
    top: observe(50),
    left: observe(50),
    width: observe(80),
    height: observe(40),
    render: () => <span>Start</span>
  },
]);


export const LinesSelector = selector({
  get: ({ get }) => {
    const flow = get(FlowStore);

    return flow;
  }
});
