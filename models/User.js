const {Schema, model} = require('mongoose');


const userSchema = new Schema (
    {
        username: {
            type: String,
            require: true,
            trim: true,
        },
        email: {
            type: String,
            require: true,
            match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Please enter a valid email address'],
        },
        thoughts: [ {
                type: Schema.Types.ObjectId,
                ref: 'Thought',
        }],
        friends: [ {
            type: Schema.Types.ObjectId,
            ref: 'User',
        }],


    },
    {
        toJSON: {
          getters: true,
        },
        id: false,
      }
)

userSchema.virtual('friendCount').get(function () {
    return this.friends.length
});

const User = model('user', userSchema);

module.exports = User;