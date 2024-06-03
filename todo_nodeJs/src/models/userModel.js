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
        profilePicture: {
            data: Buffer,
            contentType: String
        },
        dob: Date,
        gender: String,
        address: String

    },
    {
        timestamp: true,
        toJSON: {
            "transform": transform
        },
        toObject: {
            "transform": transform
        }
    }
);
function transform(doc, ret) {
    delete ret.password;
    delete ret.__v;
    delete ret.tasks;
    if (ret.profilePicture && ret.profilePicture.data) {
        const base64Image = ret.profilePicture.data.toString('base64');
        ret.profilePicture = {
            contentType: ret.profilePicture.contentType,
            base64: `data:${ret.profilePicture.contentType};base64,${base64Image}`
        };
        delete ret.picture;
    } else {
        ret.profilePicture = null; // Ensure the profilePicture field is consistent
    }
    return ret;
}
module.exports = mongoose.model("user", userModel);