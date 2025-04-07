import { GET, PUT, DELETE } from './route';
import { NextRequest } from 'next/server';
import connectDB from '@/server/connectDB.mjs';
import Quiz from '@/server/models/Quiz.mjs';
import QuizResults from '@/server/models/QuizResults.mjs';
import { getServerSession } from 'next-auth';

jest.mock('@/server/connectDB.mjs');
jest.mock('@/server/models/Quiz.mjs');
jest.mock('@/server/models/QuizResults.mjs');
jest.mock('next-auth');

describe('API Routes - Quizzes', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('DELETE - Unauthorized if no session', async () => {
        (getServerSession as jest.Mock).mockResolvedValue(null);

        const request = new NextRequest('http://localhost:3000');
        const params = { name: 'test-quiz' };

        const response = await DELETE(request, { params: Promise.resolve(params) });
        const json = await response.json();

        expect(response.status).toBe(401);
        expect(json.message).toBe('Unauthorized');
    });

    test('DELETE - Quiz not found', async () => {
        (getServerSession as jest.Mock).mockResolvedValue({ user: { id: 'user1' } });
        (Quiz.findOne as jest.Mock).mockResolvedValue(null);

        const request = new NextRequest('http://localhost:3000');
        const params = { name: 'nonexistent-quiz' };

        const response = await DELETE(request, { params: Promise.resolve(params) });
        const json = await response.json();

        expect(response.status).toBe(404);
        expect(json.message).toBe('Quiz not found');
    });

    test('DELETE - Successful deletion', async () => {
        (getServerSession as jest.Mock).mockResolvedValue({ user: { id: 'user1' } });
        (Quiz.findOne as jest.Mock).mockResolvedValue({ _id: 'quiz1', title: 'test-quiz', createdBy: 'user1' });
        (Quiz.deleteOne as jest.Mock).mockResolvedValue({});
        (QuizResults.deleteMany as jest.Mock).mockResolvedValue({});

        const request = new NextRequest('http://localhost:3000');
        const params = { name: 'test-quiz' };

        const response = await DELETE(request, { params: Promise.resolve(params) });
        const json = await response.json();

        expect(response.status).toBe(200);
        expect(json.message).toBe('Quiz deleted successfully');
    });
});
