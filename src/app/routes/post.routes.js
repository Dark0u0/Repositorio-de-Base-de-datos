import { PostModel } from '../models/post.model.js'

export class PostRoute {

    constructor(app){
        this.app = app;
    };

    initPostRoutes() {
        
        this.app.get('/get-posts', async (request, response) => {
            console.log('get posts');
            try {
                const users = await PostModel.findAll();
                response.json(users);
            } catch (error) {
                console.error('Error fetching posts:', error);
                response.status(500).json({ error: 'Internal Server Error' });
            }
        });

        this.app.get('/get-post/:id', async (request, response) => {
            console.log('get post by id');
            const postId = request.params.id;
            try {
                const post = await PostModel.findByPk(postId);
                if (post) {
                    response.json(post);
                } else {
                    response.status(404).json({ error: 'Post not found' });
                }
            } catch (error) {
                console.error('Error fetching post:', error);
                response.status(500).json({ error: 'Internal Server Error' });
            }
        });

        this.app.post('/create-post', async (request, response) => {
            console.log('create post', request.body);
            const { user_id, comment } = request.body;
            console.log('Data from server:', user_id, comment);
            try {
                const newPost = await PostModel.create({ user_id, comment });
                response.status(201).json(newPost);
            } catch (error) {
                console.error('Error creating post:', error);
                response.status(500).json({ error: 'Internal Server Error' });
            }
        });

        this.app.put('/update-post/:id', async (request, response) => {
            console.log('update post');
            const postId = request.params.id;
            const { user_id, comment } = request.body; 
            try {
                const post = await PostModel.findByPk(postId); 
                if (post) {
                    post.user_id = user_id;
                    post.comment = comment;
                    await post.save();
                    response.json(post);
                } else {
                    response.status(404).json({ error: 'Post not found' });
                }
            } catch (error) {
                console.error('Error updating post:', error);
                response.status(500).json({ error: 'Internal Server Error' });
            }
        });
    };
}