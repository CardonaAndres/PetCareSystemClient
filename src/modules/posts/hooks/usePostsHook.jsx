import * as PostsAPI from '../API/post';
import { useState } from "react"
import { errorAlert, successAlert, confirmAlert } from "../../../common/Alerts";

export const usePostsHook = () => {
    const [ loading, setLoading ] = useState(false);
    const [ posts, setPosts ] = useState([]);
    const [ pagination, setPagination ] = useState({});

    const getAllPosts = async (page = 1) => {
        try {
            setLoading(true);
            const res = await PostsAPI.getAllPostsPaginate(page);
            if (!res.status) throw new Error(res.message || 'Internal Server Error');
            setPagination(res.data.pagination);
            setPosts(res.data.posts);
            console.log(res.data);

        } catch (err) {
            errorAlert(err.message)
        } finally {
            setLoading(false);
        }
    }

    const createOrUpdatePost = async (data, onClose, isEditing) => {
        try {

            setLoading(true);
            const res = isEditing ? await PostsAPI.updatePost(data) : await PostsAPI.createPost(data);
            if (!res.status) throw new Error(res.message || 'Internal Server Error');
            onClose();
            successAlert(res.data.message || 'Operación exitosa');

        } catch (err) {
            onClose();
            errorAlert(err.message)
        } finally {
            setLoading(false);
        }
    }

    const deletePost = async (postID) => {
        try {
            setLoading(true);
            const confirm = await confirmAlert('¿Está seguro de que desea eliminar esta publicación? Esta acción no se puede deshacer.');

            if(!confirm.isConfirmed) {
                successAlert('Operación cancelada');
                return;
            }

            const res = await PostsAPI.deletePost(postID);
            if (!res.status) throw new Error(res.message || 'Internal Server Error');
            successAlert(res.data.message || 'Operación exitosa');

        } catch (err){
            errorAlert(err.message)
        } finally {
            setLoading(false);
        }
    }


    return {
        loading,
        getAllPosts,
        posts,
        pagination,
        createOrUpdatePost,
        deletePost
    }
}

