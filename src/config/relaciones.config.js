import { UserModel } from '../app/models/user.model.js';
import { PostModel } from '../app/models/post.model.js';

export class RelationshipConfig {

    initRelationships() {

        UserModel.hasMany(PostModel, { foreignKey: 'user_id' });
        PostModel.belongsTo(UserModel, { foreignKey: 'user_id' });
    }

}