import { PostModel } from '../models/post.model.js';
import { UserModel } from '../models/user.model.js'

export class UserRoute {

    constructor(app){
        this.app = app;
    };

    initUserRoutes() {
        
        this.app.post('/user-login', async (request, response) => {
            const { email, password } = request.body;

            try {
                const user= await UserModel.findOne(
                    { 
                        attributes: ['id', 'name', 'email'],
                        include: [ { model: PostModel}],
                        where: { email: email, password: password }
                    }
                );
                if (user) {
                    response.status(200).json( {ok: true, data: user} );
                } else {
                    response.status(404).json( {error: 'User not found'} );
                }
            } catch (error) {
                console.error('Error fetching user:', error);
                response.status(500).json({ error: 'Internal Server Error' });
            }    
        });    

        this.app.get('/get-users', async (request, response) => {
            console.log('get users');
            try {
                const users = await UserModel.findAll();
                response.json(users);
            } catch (error) {
                console.error('Error fetching users:', error);
                response.status(500).json({ error: 'Internal Server Error' });
            }
        });

        this.app.get('/get-user/:id', async (request, response) => {
            console.log('get user by id');
            const userId = request.params.id;
        
            try {
                const user = await UserModel.findByPk(userId, {include:[PostModel]});
                
                if (user) {
                    response.json(user);
                } else {
                    response.status(404).json({ error: 'User not found' });
                }
            } catch (error) {
                console.error('Error fetching user:', error);
                response.status(500).json({ error: 'Internal Server Error' });
            }
        });

        this.app.post('/create-user', async (request, response) => {
            console.log('create user', request.body);
            const { name, email, password, phone, status } = request.body;

            console.log('Data from server:', name, email, password, phone, status);
            try {
                const newUser = await UserModel.create({ name, email, password, phone, status });
                response.status(201).json(newUser);
            } catch (error) {
                console.error('Error creating user:', error);
                response.status(500).json({ error: 'Internal Server Error' });
            }
        });

        this.app.put('/update-user/id', async (request, response) => {
            console.log('update user');
            const userId = request.params.id;
            const { name, email, password, phone, status } = request.body;
            try {
                const user = await UserModel.findByPk(userId);
                if (user) {
                    user.name = name;
                    user.email = email;
                    //user.password = password;
                    //user.phone = phone;
                    user.status = status;
                    await user.save();
                    response.json(user);
                } else {
                    response.status(404).json({ error: 'User not found' });
                }
            } catch (error) {
                console.error('Error updating user:', error);
                response.status(500).json({ error: 'Internal Server Error' });
            }
        });
    } 
}
