

export const getIsMAcOS = () => {
  return navigator.userAgent.toUpperCase().includes('MAC');
}

export const getCtrlKeyBySystem = (event: MouseEvent) => {
  if (getIsMAcOS()) {
    return event.metaKey;
  } else {
    return event.ctrlKey;
  }
}
