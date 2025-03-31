import { modalStyles } from "../../../assets/js/styles";
import { Modal, Box } from '@mui/material';
import { OptionCards } from "./OptionCards";

export const OptionsModal = ({ onClose, open, pet }) => {
  return (
    <Modal open={open} onClose={onClose}>
        <Box sx={modalStyles}>
            <OptionCards onClose={onClose} pet={pet} />
        </Box>
    </Modal>
  )
}

