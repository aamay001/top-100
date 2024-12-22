import { useState } from "react";
import ColorModeContext from "./color-mode-context";

type ColorMode = 'light' | 'dark';

interface ColorModeProviderProps {
  children: React.ReactNode,
  initialValue: ColorMode
}

const COLOR_MODE_SAVE_KEY = 'color-mode';

const ColorModeProvider: React.FC<ColorModeProviderProps> = ({ children, initialValue }) => {
  const saved: string | null = localStorage.getItem(COLOR_MODE_SAVE_KEY);
  const [colorMode, setColorMode] = useState<ColorMode>(saved as ColorMode || initialValue);
  const [ colorModeBackgroundColor, setColorModeBackgroundColor] = useState<'gainsboro' | '#28282B'>('#28282B');

  const toggleColorMode = () => {
    if (colorMode === 'dark') {
      setColorMode('light');
      setColorModeBackgroundColor('gainsboro');
      localStorage.setItem(COLOR_MODE_SAVE_KEY, 'light');
    } else {
      setColorMode('dark');
      setColorModeBackgroundColor('#28282B');
      localStorage.setItem(COLOR_MODE_SAVE_KEY, 'dark');
    }
  }

  return (
    <ColorModeContext.Provider value={{ colorMode, toggleColorMode, colorModeBackgroundColor }}>
      {children};
    </ColorModeContext.Provider>
  );
}

export default ColorModeProvider;