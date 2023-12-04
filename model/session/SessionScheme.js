import mongoose from 'mongoose';

const sessionScheme = new mongoose.Schema(
    {
        token: {
            type: String,
            required: true,
        },
        associate: {
            type: String,
            default: ""
        },
    },
    {
        timestamps: true,
    }
)

export default mongoose.model("Session", sessionScheme);