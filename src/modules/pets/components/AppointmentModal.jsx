import { modalStyles } from "../../../assets/js/styles";
import { Modal, Box } from '@mui/material';
import { AppointmentForm } from "./AppointmentForm";

export const AppointmentModal = ({ onClose, open, pet_ID }) => {
    return (
      <Modal open={open} onClose={onClose}>
          <Box sx={modalStyles}>
              <AppointmentForm onClose={onClose} pet_ID={pet_ID} />
          </Box>
      </Modal>
    )
}