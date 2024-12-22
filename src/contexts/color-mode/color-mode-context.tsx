import { createContext } from "react";

interface ColorModeContextValue {
  colorMode: 'dark' | 'light',
  toggleColorMode: () => void,
  colorModeBackgroundColor: 'gainsboro' | '#28282B',
}

const ColorModeContext = createContext<ColorModeContextValue | null>(null);

export default ColorModeContext;