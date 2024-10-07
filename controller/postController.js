const { createPostService, getPostsService, getPostService, updatePostService, deletePostService, searchTermPostService } = require('../service/postService');

const createPost = async (req, res) => {
    const post = req.body;

    try {
        const newPost = await createPostService(post)
        return res.status(201).json(newPost)
    } catch (error) {
        console.error('An error occurred while creating the post: ', error.message);
        return res.status(500).json({ error: error.message });
    }
}

const getPosts = async (req, res) => {
    const { term } = req.query;

    try {
        if (term) {
            const response = await searchTermPostService(term);
            if (response.length === 0) {
                return res.status(404).json({ error: 'No posts found matching the search term.' });
            }
            return res.status(200).json(response);
        } else {
            const response = await getPostsService();
            return res.status(200).json(response);
        }
    } catch (error) {
        console.error('An error occurred while creating the post: ', error.message);
        return res.status(500).json({ error: error.message });
    }
}

const getPost = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ error: 'Post id is required.' });
    }

    try {
        const response = await getPostService(id)
        return res.status(200).json(response)
    } catch (error) {
        console.error('An error occurred while creating the post: ', error.message);
        return res.status(500).json({ error: error.message });
    }
}

const searchPost = async (req, res) => {
    const { searchTerm } = req.query;

    if (!searchTerm) {
        return res.status(400).json({ error: 'Search term is required.' });
    }

    try {
        const response = await searchTermPostService(searchTerm)
        return res.status(200).json(response)
    } catch (error) {
        console.error('An error occurred while searching the post: ', error.message);
        return res.status(500).json({ error: error.message });
    }
}

const updatePost = async (req, res) => {
    const { id } = req.params;
    const post = req.body;

    if (!id) {
        return res.status(400).json({ error: 'Post id is required.' });
    }

    try {
        const updatedPost = await updatePostService(id, post);
        return res.status(201).json(updatedPost)
    } catch (error) {
        console.error('An error occurred while updating the post: ', error.message);
        return res.status(500).json({ error: error.message });
    }
}

const deletePost = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ error: 'Post id is required.' });
    }

    try {
        await deletePostService(id)
        return res.status(204).json()
    } catch (error) {
        console.error('An error occurred while deleting the post: ', error.message);
        return res.status(500).json({ error: error.message });
    }
}

module.exports = { createPost, getPosts, getPost, updatePost, deletePost, searchPost };