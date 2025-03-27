import { modalStyles } from "../../../assets/js/styles";
import { Modal, Box } from '@mui/material';
import { FormPet } from './FormPet';

export const FormModal = ({ onClose, open, petData = {} }) => {
  const petDataFomatted = {
    pet_ID : petData.pet_ID || null,
    name: petData.name || '',
    birth_date: String(petData.birth_date).split('T')[0] || '',
    type_pet_ID: petData.type_pet_ID || '',
    photo_url: petData.photo_url || ''
  }

  return (
    <Modal open={open} onClose={onClose}>
        <Box sx={modalStyles}>
            <FormPet onClose={onClose} petData={petDataFomatted} />
        </Box>
    </Modal>
  )
}

