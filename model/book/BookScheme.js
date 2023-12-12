import mongoose from 'mongoose';

const bookScheme = new mongoose.Schema(
    {
        status: {
            type: String,
            default: "inactive",
        },
        thumbnail: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        author: {
            type: String,
            required: true,
        },
        isbn: {
            type: String,
            unique: true,
            index: true,
            required: true,
        },
        publishYr: {
            type: Number,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        isAvailable: {
            type: Boolean,
            default: true,
        },
        dueDate: {
            type: Date,
            default: null,
        },

    },
    {
        timestamps: true,
    }
)

export default mongoose.model("Book", bookScheme);