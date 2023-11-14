const {Schema,  model} = require('mongoose');


const userSchema = new Schema (
    {
        username: {
            type: String,
            require: true,
        },
        email: {
            type: String,
            require: true,
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought',
        },
        ],
        friends: [ {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        ]
    }
)
