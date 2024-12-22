import { useState } from "react";
import ColorModeContext from "./color-mode-context";

interface ColorModeProviderProps {
  children: React.ReactNode,
  initialValue: 'dark' | 'light'
}

const ColorModeProvider: React.FC<ColorModeProviderProps> = ({ children, initialValue }) => {
  const [colorMode, setColorMode] = useState<'dark' | 'light'>(initialValue);

  const toggleColorMode = () => {
    if (colorMode === 'dark') {
      setColorMode('light');
    } else {
      setColorMode('dark');
    }
  }

  return (
    <ColorModeContext.Provider value={{ colorMode, toggleColorMode }}>
      {children};
    </ColorModeContext.Provider>
  );
}

export default ColorModeProvider;