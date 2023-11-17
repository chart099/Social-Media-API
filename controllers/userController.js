const Thought = require('../models/Thought');
const User = require('../models/User');

module.exports = {
    async getUsers(req, res) {
        try{
            const users = await User.find();
            res.json(users);
        }catch {
            res.status(500).json(err);
        }
    },
    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({_id: req.params.userId})
                .select('-__v');
        if (!user) {
            return res.status(404).json({ message: 'No user with that ID' });
        }
        res.json(user)
        }catch (err){
            res.status(500).json(err);
        }
    }, 
    async createUser(req,res) {
        try {
            const dbUserData = await User.create(req.body);
            res.json(dbUserData);
        }catch (err) {
            res.status(500).json(err)
        }
    },
    async updateUser(req,res) {
        try {
            const user = await User.findOneAndUpdate(
                {_id: req.params.userId},
                {$set: req.body},
                {runValidators: true, new: true}
            );

            if (!user) {
                res.status(404).json({message: 'No user with that id'})
            }
           await Thought.deleteMany({_id: {$in: user.thoughts}});
           res.json({message: 'User and their thoughts deleted'})
        }catch (err) {
            res.status(500).json(err);
        }
    },
    async deleteUser(req,res) {
        try {
            const user = await User.findOneAndDelete({_id: req.params.userId});
            if (!user) {
                res.status(404).json({message: 'No user with that id'})
            }
            res.json(user)
        } catch (err) {
            
        } 
    },
    async addFriend(req,res) {
        try{
            const user = await User.findOneAndUpdate(
                {_id: req.params.userId },
                { $addToSet: {friends: req.body}},
                { runValidators: true, new: true }
            );

            if (!user) {
                return res.status(404).json({ message: 'No user with that ID' });
            }
            res.json(user)
        }catch(err){
            res.status(500).json(err)
        }
    },

    async deleteFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                {_id: req.params.userId },
                { $pull: {friends: {friendId: req.params.friendId}}},
                { runValidators: true, new: true }
            );
            if (!user) {
                return res.status(404).json({ message: 'No user with that ID' });
            }
            res.json(user)
        } catch (err){
            res.status(500).json(err);
        }
    }
};