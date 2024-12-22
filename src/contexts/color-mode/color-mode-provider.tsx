import { useState } from "react";
import ColorModeContext from "./color-mode-context";

interface ColorModeProviderProps {
  children: React.ReactNode,
  initialValue: 'dark' | 'light'
}

const ColorModeProvider: React.FC<ColorModeProviderProps> = ({ children, initialValue }) => {
  const [colorMode, setColorMode] = useState<'dark' | 'light'>(initialValue);
  const [ colorModeBackgroundColor, setColorModeBackgroundColor] = useState<'gainsboro' | '#28282B'>('#28282B');

  const toggleColorMode = () => {
    if (colorMode === 'dark') {
      setColorMode('light');
      setColorModeBackgroundColor('gainsboro');
    } else {
      setColorMode('dark');
      setColorModeBackgroundColor('#28282B');
    }
  }

  return (
    <ColorModeContext.Provider value={{ colorMode, toggleColorMode, colorModeBackgroundColor }}>
      {children};
    </ColorModeContext.Provider>
  );
}

export default ColorModeProvider;