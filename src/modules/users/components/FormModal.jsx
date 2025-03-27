import { modalStyles } from "../../../assets/js/styles";
import { Modal, Box } from '@mui/material';
import { UpdateProfileForm } from "./UpdateProfileForm";

export const FormModal = ({ onClose, open, user }) => {
    return (
      <Modal open={open} onClose={onClose}>
          <Box sx={modalStyles}>
              <UpdateProfileForm user={user} onClose={onClose} />
          </Box>
      </Modal>
    )
}