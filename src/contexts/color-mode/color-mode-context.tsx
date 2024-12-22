import { createContext } from "react";

interface ColorModeContextValue {
  colorMode: 'dark' | 'light',
  toggleColorMode: () => void,
}

const ColorModeContext = createContext<ColorModeContextValue | null>(null);

export default ColorModeContext;