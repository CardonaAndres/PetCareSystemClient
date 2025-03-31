import { modalStyles } from "../../../assets/js/styles";
import { Modal, Box } from '@mui/material';
import { AdminForm } from "./AdminForm";

export const FormModal = ({ onClose, open, user}) => {
  return (
    <Modal open={open} onClose={onClose}>
        <Box sx={modalStyles}>
            <AdminForm onClose={onClose} user={user} />
        </Box>
    </Modal>
  )
}
