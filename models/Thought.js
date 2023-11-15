const { Schema, model } = require('mongoose');
const User = require('./User');
const Reaction = require('./Reaction');

const thoughtSchema = new Schema (
    {
        thoughtText: {
            type: String,
            require: true,
            minLength: 1,
            maxLength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        username: {
            type: String,
            require: true,
        },
        reactions: [Reaction],

    },
    {
        toJSON: {
          getters: true,
        },
        id: false,
      }
)

thoughtSchema
    .virtual('getReactions')
    .get(function (){
        return this.reactions.length
    })

const Thought = model('thought', thoughtSchema);

module.exports = Thought;
