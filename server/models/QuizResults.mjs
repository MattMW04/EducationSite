import mongoose from 'mongoose';

const { Schema } = mongoose;

const quizResultsSchema = new Schema(
    {
        quizId: {
            type: Schema.Types.ObjectId,
            ref: 'Quiz',
            required: true,
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        bestScore: {
            type: Number,
            required: true,
        },
        bestScoreAttemptTime: {
            type: Date,
            required: true,
        },
    },
    { timestamps: true }
);

const QuizResults = mongoose.models.QuizResults || mongoose.model('QuizResults', quizResultsSchema);

export default QuizResults;
