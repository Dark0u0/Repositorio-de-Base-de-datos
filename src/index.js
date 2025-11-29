import express from 'express';
import { Database } from './config/database.config.js';
import { UserRoute } from './app/routes/user.routes.js';
import { PostRoute } from './app/routes/post.routes.js';
import { RelationshipConfig } from './config/relaciones.config.js';
const app = express();
const port = 3001 || 3002;

app.use(express.json()); // Para parsear JSON
app.use(express.urlencoded({ extended: true })); // Para parsear formularios

const database = new Database();
database.connection();

app.listen(port, () => {
    console.log(`app listening on port ${port}`)
});

const userRoute = new UserRoute(app);
userRoute.initUserRoutes();

const postRoute = new PostRoute(app);
postRoute.initPostRoutes();

const relationship = new RelationshipConfig();
relationship.initRelationships();
