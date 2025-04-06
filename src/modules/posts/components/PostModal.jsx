import { modalStyles } from "../../../assets/js/styles";
import { Modal, Box } from '@mui/material';
import { PostForm } from "./PostForm";

export const PostModal = ({ onClose, open, postData = {} }) => {
    const dataFomatted = {
        post_ID : postData.post_ID || null,
        title : postData.title || null,
        content : postData.content || null,
    }

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={modalStyles}>
                <PostForm onClose={onClose} post={dataFomatted} />
            </Box>
        </Modal>
    )
}
