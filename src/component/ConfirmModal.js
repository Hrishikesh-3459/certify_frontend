import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";

function ConfirmModal({
  open,
  setOpen,
  onConfirm,
  title,
  content = "Are you sure",
}) {
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{content}</DialogContentText>
      </DialogContent>
      <DialogActions sx={{ gap: 1.5, mr: 2 }}>
        <Button onClick={handleClose} variant="contained" sx={{ p: 1, px: 2 }}>
          Cancel
        </Button>
        <Button
          onClick={() => {
            onConfirm();
            handleClose();
          }}
          sx={{ p: 1, px: 2 }}
          autoFocus
          variant="contained"
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmModal;
