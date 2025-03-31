import mongoose, { Schema, Document } from 'mongoose';

export interface Chapter {
    title: string;
    content: string;
}

export interface Course extends Document {
    title: string;
    description: string;
    chapters: Chapter[];
    quizzes: mongoose.Types.ObjectId[];
    createdAt: Date;
    updatedAt: Date;
    createdBy: mongoose.Types.ObjectId;
    private: boolean;
}

const ChapterSchema: Schema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
});

const CourseSchema: Schema = new Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        chapters: { type: [ChapterSchema], required: true },
        quizzes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' }],
        createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        private: { type: Boolean, default: false },
    },
    {
        timestamps: true, 
        
    }
);

const Course = mongoose.model<Course>('Course', CourseSchema) || mongoose.models.Course; 
export default Course;