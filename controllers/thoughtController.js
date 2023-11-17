const {Thought, User} = require('../models');

module.exports = {
    async getThoughts(req, res) {
        try {
            const thought = await Thought.find();
            res.json(thought);
        }catch(err){
            res.status(500).json(err);
        }
    },
    async getSingleThought(req,res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId})

            if(!thought) {
                return res.status(404).json({message: 'No thought with that ID'});
            }
            res.json(thought);
        } catch(err){
            res.status(500).json(err);
        }
    },

    async createThought(req, res) {
        try {
            const thought= await Thought.create(req.body);
            const user = await User.findOneAndUpdate(
                {_id: req.body.userId},
                {$addToSet: {thoughts: thought._id}},
                {new: true}
            );

            if(!user) {
                return res.status(404).json({
                    message: 'Thought created although there is no user with that ID'
                });
            }
            res.json(user)
        } catch (err){
            console.log(err);
            res.status(500).json(err);
        }
    },
    async updateThought(req,res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                {_id: req.body.thoughtId},
                {$set: req.body},
                {runValidators: true, new: true}
            );
            if (!thought) {
                return res.status(404).json({message: 'No thought found'})
            }
            res.json(thought)
        } catch (err){
            console.log(err);
            res.status(500).json(err);
        }
    },

    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndRemove({_id: req.params.thoughtId});
            if (!thought) {
                return res.status(404).json({message: 'No thought found'})
            }
             const user = await User.findOneAndUpdate(
                {thoughts: req.params.thoughtId},
                {$pull: {thoughts: req.params.thoughtId}},
                {new: true}
             );

             res.json({message: 'Thought deleted'});
        }catch (err) {
            res.status(500).json(err);
        }
    },
    async addThoughtReaction(req,res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                {_id: req.params.thoughtId},
                {$addToSet: {reactions: req.body}},
                {runValidators: true, new: true}
            );
            if (!thought) {
                return res.status(404).json({message: 'No thought found'});
            }
            res.json(thought) 
        } catch (err){
            res.status(500).json(err)
        }
    },

    async removeThoughtReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                {_id: req.params.thoughtId},
                {$pull: {reactions: {reactionId: req.params.reactionId}}},
                {runValidators: true, new: true}
            )

            if (!thought) {
                return res.status(404).json({message: 'No thought with this id!'})
            }

            res.json(video);
        } catch (err) {
            res.status(500).json(err);
        }
    },
}
