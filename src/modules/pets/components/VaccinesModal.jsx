import { modalStyles } from "../../../assets/js/styles";
import { Modal, Box } from '@mui/material';
import { VaccinesForm } from "./VaccinesForm";

export const VaccinesModal = ({ open, onClose, pet_ID }) => {
  return (
    <Modal open={open} onClose={onClose}>
        <Box sx={modalStyles}>
            <VaccinesForm onClose={onClose} pet_ID={pet_ID} />
        </Box>
    </Modal>
  )
}


