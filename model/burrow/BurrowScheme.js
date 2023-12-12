import mongoose from 'mongoose';

const burrowScheme = new mongoose.Schema(
    {
        bookId: {
            type: mongoose.Types.ObjectId,
            required: true,
        },
        bookName: {
            type: String,
            required: true,
        },
        thumbnail: {
            type: URL,
            required: true,
        },
        userId: {
            type: mongoose.Types.ObjectId,
            required: true,
        },
        userName: {
            type: URL,
            required: true,
        },
        reviewGiven: {
            type: mongoose.Types.ObjectId,
            required: true,
        },
        dueDate: {
            type: Date,
            required: true,
        },
        isReturned: {
            type: Boolean,
            default: false,
        },
        returnedDate: {
            type: Date,
            default: null,
        }
    },
    {
        timestamps: true,
    }
)

export default mongoose.model("Burrow", burrowScheme);