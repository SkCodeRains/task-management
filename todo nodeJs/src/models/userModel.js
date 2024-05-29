const { default: mongoose } = require("mongoose");

const userModel = mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true

        },
        password: {
            type: String,
            required: true,
            unique: true
        },
        tasks: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "task"
        }],
    },
    {
        timestamp: true,
        toJSON: {
            transform: function (doc, ret) {
                delete ret.password;
                delete ret.__v;
                return ret;
            }
        },
        toObject: {
            transform: function (doc, ret) {
                delete ret.password;
                delete ret.__v;
                return ret;
            }
        }
    }
);

module.exports = mongoose.model("user", userModel);
