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
        },
        status: {
            type: Number,
            default: 0,
        },
        description: {
            type: String,
        },
        picture: {
            type: String
        },
        startDate: {
            type: Date,
            default: Date.now()
        },
        endDate: Date,
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
