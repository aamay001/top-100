import { useContext } from "react";
import ColorModeContext from "../contexts/color-mode/color-mode-context";

const useColorMode = () => {
  const context = useContext(ColorModeContext);

  if (context === null) {
    throw new Error('useColorMode must be used withing a ColorModeProvider!');
  }

  return context;
}

export default useColorMode;