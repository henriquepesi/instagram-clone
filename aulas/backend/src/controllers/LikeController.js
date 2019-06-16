const Post = require('../models/Post');

//Post assincronos, todas rotas são middleware
module.exports = {
    async store(req, res) {
        const post = await Post.findById(req.params.id);

        post.likes += 1;

        //Save salva antes de retornar
        await post.save();
        
        req.io.emit('like', post);

        return res.json(post);
    }
};