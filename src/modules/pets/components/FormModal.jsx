import { modalStyles } from "../../../assets/js/styles";
import { Modal, Box } from '@mui/material';
import { FormPet } from './FormPet';

export const FormModal = ({ onClose, open, petData = {} }) => {
  return (
    <Modal open={open} onClose={onClose}>
        <Box sx={modalStyles}>
            <h1>Hola</h1>
        </Box>
    </Modal>
  )
}

