import React from "react";

import { Message } from "store/state";
import { Box, Typography, Modal } from "@mui/material";

interface RootModalProps {
  message: Message;
  open: boolean;
  handleClose: () => void;
}

const modalContentStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  height: "50%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

class RootModal extends React.Component<RootModalProps> {
  constructor(props: RootModalProps) {
    super(props);
  }

  render() {
    return (
      <Modal
        keepMounted
        open={this.props.open}
        onClose={this.props.handleClose}
      >
        <Box id="root-plot" sx={modalContentStyle} />
      </Modal>
    );
  }
}

export { RootModal };
