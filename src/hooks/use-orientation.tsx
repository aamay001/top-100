import { useCallback, useEffect, useState } from 'react';

const useOrientation = (onOrientationChange?: (orientation:OrientationType) => void) => {
  const [orientation, setOrientation] = useState<OrientationType>(screen.orientation.type);
  const [initialize, setInitialize] = useState<boolean>(true);

  const onScreenOrientationChange = useCallback(() => {
    const { orientation: { type }} = screen;
    if (onOrientationChange) {
      onOrientationChange(type);
    }
    setOrientation(type);
  }, [onOrientationChange]);

  const onScreenSizeChange = useCallback(() => {
    if (window.innerHeight > window.innerWidth) {
      if (onOrientationChange) {
        onOrientationChange('portrait-secondary');
      }
      return 'portrait-secondary';
    }
    else {
      if (onOrientationChange) {
        onOrientationChange('landscape-secondary');
      }
      return 'landscape-secondary';
    }
  }, [onOrientationChange]);

  useEffect(() => {

    if (initialize) {
      setInitialize(false);
      onScreenOrientationChange();
    }

    if (screen?.orientation) {
      screen.orientation.addEventListener('change', onScreenOrientationChange);
    }

    window.addEventListener('resize', onScreenSizeChange);

    return () => {
      screen?.orientation?.removeEventListener('change', onScreenOrientationChange);
      window.removeEventListener('resize', onScreenSizeChange);
    }

  }, [onScreenOrientationChange, onScreenSizeChange, initialize]);

  return {
    orientation,
  }
}

export { useOrientation };