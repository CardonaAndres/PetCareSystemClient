import { modalStyles } from "../../../assets/js/styles";
import { Modal, Box } from '@mui/material';
import { TypePetForm } from "./TypePetForm";

export const TypePetModal = ({ onClose, open, typePetData = {} }) => {
    const dataFomatted = {
        type_pet_ID : typePetData.type_pet_ID || null,
        specie : typePetData.specie || "",
        race : typePetData.race || "Raza",
        description : typePetData.description || ""
    }

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={modalStyles}>
                <TypePetForm onClose={onClose} typePetData={dataFomatted} />
            </Box>
        </Modal>
    )
}
