const prisma = require('../prisma/prisma')

const createPostService = async (post) => {
    try {
        const response = await prisma.post.create({
            data: post
        });
        return response;
    } catch (error) {
        throw new Error('Failed to create post: ' + error.message);
    }
}

const getPostsService = async () => {
    try {
        const response = await prisma.post.findMany()
        if (!response) throw new Error('Post not found');
        return response;
    } catch (error) {
        throw new Error('Failed to get post: ' + error.message);
    }
}

const getPostService = async (id) => {
    try {
        const response = await prisma.post.findUnique({
            where: { id: parseInt(id) }
        })
        if (!response) throw new Error('Post not found');
        return response;
    } catch (error) {
        throw new Error('Failed to get post: ' + error.message);
    }
}

const searchTermPostService = async (searchTerm) => {
    try {
        const searchTags = searchTerm.split(',').map(tag => tag.trim());

        const posts = await prisma.$queryRaw`
        SELECT * FROM Post
        WHERE 
          title LIKE ${`%${searchTerm}%`} 
          OR content LIKE ${`%${searchTerm}%`} 
          OR category LIKE ${`%${searchTerm}%`}
          OR JSON_CONTAINS(tags, CAST(${JSON.stringify(searchTags)} AS JSON))
        ORDER BY createdAt DESC
      `;

        return posts;
    } catch (error) {
        throw new Error('Failed to search posts: ' + error.message);
    }
};


const updatePostService = async (id, post) => {
    try {
        const findId = await prisma.post.findUnique({
            where: { id: parseInt(id) },
        });
        if (!findId) throw new Error('Post not found');

        return await prisma.post.update({
            where: { id: parseInt(id) },
            data: post,
        });
    } catch (error) {
        throw new Error('Failed to update post: ' + error.message);
    }
};

const deletePostService = async (id) => {
    try {
        const findId = await prisma.post.findUnique({
            where: { id: parseInt(id) },
        });
        if (!findId) throw new Error('Post not found');

        return await prisma.post.delete({
            where: { id: parseInt(id) },
        });
    } catch (error) {
        throw new Error('Failed to delete post: ' + error.message);
    }
};


module.exports = { createPostService, getPostsService, getPostService, updatePostService, deletePostService, searchTermPostService };