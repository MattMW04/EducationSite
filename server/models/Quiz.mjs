import mongoose from 'mongoose';

const { Schema } = mongoose;

const quizSchema = new Schema(
    {
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
        difficulty: {
            type: String,
            enum: ['Easy', 'Medium', 'Hard'],
            default: 'Easy',
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        private: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

quizSchema.index({ title: 1 });

const Quiz = mongoose.models.Quiz || mongoose.model('Quiz', quizSchema);

export default Quiz;