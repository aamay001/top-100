
import { useEffect, useState } from 'react';
import { Sheet, useThemeName, YStack } from 'tamagui';

import AlbumViewContent from './album-view-content';

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
  const theme = useThemeName();
  
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
        >
          <Sheet.Overlay />
          <Sheet.Handle />
          <Sheet.Frame padding="$4" alignItems="center" overflow="scroll" theme={theme.split('_')[0]}>
            <YStack width="100%" theme={theme}>
              <AlbumViewContent rank={listPosition} album={album} fullWidth />
            </YStack>
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
