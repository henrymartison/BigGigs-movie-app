import React from "react";
import { Modal } from "react-native";
import ImageViewer from "react-native-image-zoom-viewer";

import { white } from "../../styles/Colors";
import Loader from "../commons/Loader";

const ImagesModal = ({
  showImage = false,
  images = [],
  actionClose = null,
}) => (
  <Modal visible={showImage} transparent onRequestClose={actionClose}>
    <ImageViewer
      imageUrls={images}
      enableSwipeDown
      enableImageZoom
      enablePreload
      saveToLocalByLongPress={false}
      pageAnimateTime={200}
      flipThreshold={10}
      maxOverflow={5}
      swipeDownThreshold={25}
      loadingRender={() => <Loader />}
      onCancel={actionClose}
      useNativeDriver={true}
    />
  </Modal>
);

export default ImagesModal;
