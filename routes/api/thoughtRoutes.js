const router = require('express').Router();

const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    addThoughtReaction,
    removeThoughtReaction

} = require('../../controllers/thoughtController');

// make a new thought
router.route('/').get(getThoughts).post(createThought);

// get single thought
router.route('/:thoughtId').get(getSingleThought)

// update a thought
router.route('/:thoughtId').get(getSingleThought).put(updateThought)
    
// delete a thought
router.route('/:thoughtId').get(getSingleThought).delete(deleteThought);

// add a reaction to a thought
router.route('/:thoughtId/reactions').post(addThoughtReaction);

// delete a reaction to a thought
router.route('/:thoughtId/reactions/:reactionId').delete(removeThoughtReaction);

module.exports = router;