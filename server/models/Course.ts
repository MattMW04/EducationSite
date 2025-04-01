import mongoose, { Schema, Document } from 'mongoose';

export interface Chapter {
    title: string;
    content: string;
}

export interface Course extends Document {
    title: string;
    description: string;
    chapters: Chapter[];
    quizzes: string[]; 
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
        quizzes: [{ type: String }], 
        createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        private: { type: Boolean, default: false },
    },
    {
        timestamps: true, 
        
    }
);

const Course = mongoose.models.Course  || mongoose.model<Course>('Course', CourseSchema)  ; 
export default Course;