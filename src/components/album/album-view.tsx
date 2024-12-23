
import { useEffect, useState } from 'react';
import { Sheet, useThemeName, useTheme, YStack, Button } from 'tamagui';

import AlbumViewContent from './album-view-content';
import useColorMode from '../../hooks/useColorMode';

interface AlbumViewProps {
  album?: Album;
  listPosition?: number;
  asModal: boolean,
  onModalClosed?: () => void,
  openModal?: boolean,
}

const AlbumView: React.FC<AlbumViewProps> = ({
  album,
  listPosition,
  asModal = false,
  onModalClosed,
  openModal,
}) => {
  const [modalOpen, setOpen] = useState<boolean>(false);
  const { colorModeBackgroundColor, colorMode } = useColorMode();
  const theme = useThemeName();
  const themeObj = useTheme();

  useEffect(() => {
    if (openModal) {
      setOpen(true);
    }
  }, [openModal]);

  const onModalOpenChanged = (open: boolean) => {
    setOpen(open);
    if (!open && onModalClosed) {
      onModalClosed();
    }
  };

  if (!album) {
    return null;
  }

  return (
    <>
    {asModal
      ? (
        <Sheet
          modal
          open={modalOpen}
          onOpenChange={onModalOpenChanged}
          dismissOnSnapToBottom
          animation="medium"
          forceRemoveScrollEnabled={modalOpen}
          snapPoints={[85]}
          snapPointsMode="percent"
          position={0}
          disableDrag
        >
          <Sheet.Overlay />
          <Sheet.Handle />
          <Sheet.Frame
            padding="$4"
            alignItems="center"
            overflow="scroll"
            id="album-sheet-frame"
            theme={colorMode}
            backgroundColor={colorModeBackgroundColor}
          >
            <YStack width="100%" theme={theme}>
              <AlbumViewContent
                rank={listPosition}
                album={album}
                fullWidth
              />
            </YStack>
            <Button
              onPress={() => onModalOpenChanged(false)}
              width="100%"
              marginTop="$4"
              marginBottom="$8"
              theme={theme}
              borderColor={themeObj?.borderColor?.val}
            >
              Close
            </Button>
          </Sheet.Frame>
        </Sheet>
      )
      : (
        <AlbumViewContent rank={listPosition} album={album} />
      )}
    </>
  );
}

export default AlbumView;
