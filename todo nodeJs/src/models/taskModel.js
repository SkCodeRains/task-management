const { default: mongoose } = require("mongoose");

const taskModel = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        },
        task_name: {
            type: String,
            required: true,
            unique: true
        },
        status: {
            type: Number,
            default: 0,
            required: true
        },
        description: {
            type: String,
        },
        picture: {
            type: String
        }
    },
    {
        timestamp: true,
        toJSON: {
            transform: function (doc, ret) {
                delete ret.user;
                delete ret.__v;
                return ret;
            }
        },
        toObject: {
            transform: function (doc, ret) {
                delete ret.user;
                delete ret.__v;
                return ret;
            }
        }
    }
);

module.exports = mongoose.model("task", taskModel);
