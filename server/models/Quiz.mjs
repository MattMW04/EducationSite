import mongoose from 'mongoose';

const { Schema } = mongoose;

const quizSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    questions: [
        {
            questionText: {
                type: String,
                required: true,
            },
            options: [
                {
                    optionText: {
                        type: String,
                        required: true,
                    },
                    isCorrect: {
                        type: Boolean,
                        required: true,
                    },
                },
            ],
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        
    },
});

const Quiz =  mongoose.models.Quiz || mongoose.model('Quiz', quizSchema);

export default Quiz;