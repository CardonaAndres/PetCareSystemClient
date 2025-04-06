import { SERVER_URL } from "../../../configs/server";

export const getAllPostsPaginate = async (page = 1) => {
    try {
        const res = await fetch(`${SERVER_URL}/posts/?page=${page}`, {
            method : 'GET', headers : { 'Content-Type': 'application/json' },
            credentials : 'include'
        });
        
        const data = await res.json();
        if(!res.ok) throw new Error(data.message || 'Internal Server Error');
        return { status : true, data }

    } catch (err) {
        return { status : false, message: err.message };
    }
}

export const createPost = async (post) => {
    try {
        const res = await fetch(`${SERVER_URL}/posts/`, {
            method : 'POST', headers : { 'Content-Type': 'application/json' },
            credentials : 'include', body : JSON.stringify(post)
        });
        
        const data = await res.json();
        if(!res.ok) throw new Error(data.message || 'Internal Server Error');
        return { status : true, data }

    } catch (err) {
        return { status : false, message: err.message };
    }
}

export const updatePost = async (post) => {
    try {
        const res = await fetch(`${SERVER_URL}/posts/${post.post_ID}`, {
            method : 'PUT', headers : { 'Content-Type': 'application/json' },
            credentials : 'include', body : JSON.stringify(post)
        });
        
        const data = await res.json();
        if(!res.ok) throw new Error(data.message || 'Internal Server Error');
        return { status : true, data }

    } catch (err) {
        return { status : false, message: err.message };
    }
}

export const deletePost = async (post_ID) => {
    try {
        const res = await fetch(`${SERVER_URL}/posts/${post_ID}`, {
            method : 'DELETE', headers : { 'Content-Type': 'application/json' },
            credentials : 'include'
        });
        
        const data = await res.json();
        if(!res.ok) throw new Error(data.message || 'Internal Server Error');
        return { status : true, data }

    } catch (err) {
        return { status : false, message: err.message };
    }
}