import { useEffect } from 'react';
import { Switch, Separator, Label, XStack, SizableText } from 'tamagui';
import useColorMode from '../../hooks/useColorMode';

const ColorModeToggle: React.FC = () => {
  const { colorMode, toggleColorMode, colorModeBackgroundColor } = useColorMode();

  useEffect(() => {
    const html = document.getElementsByTagName('html')[0];
    html.style.backgroundColor = colorModeBackgroundColor;
  }, [colorModeBackgroundColor]);

  return (
    <XStack position='absolute' top={10} right={10}>
      <Label
        paddingRight="$2"
        minWidth={90}
        justifyContent="flex-end"
        size="$2"
        htmlFor="color-mode-toggle"
        top={0}
      >
        <SizableText size="$6">
          {colorMode === 'dark' ? '🌙' : '☀️'}
        </SizableText>
      </Label>
      <Separator minHeight={20} vertical marginLeft="$2" marginRight="$2" />
      <Switch 
        onCheckedChange={toggleColorMode}  
        id="color-mode-toggle" 
        checked={colorMode === 'dark'}
        size="$3"
      >
        <Switch.Thumb />
      </Switch>
    </XStack>
  );
}

export default ColorModeToggle;