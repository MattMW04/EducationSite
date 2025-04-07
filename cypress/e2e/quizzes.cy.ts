describe('Quizzes API E2E Tests', () => {
    it('should delete a quiz successfully', () => {
        cy.request({
            method: 'DELETE',
            url: '/api/quizzes/test-quiz',
            failOnStatusCode: false,
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.message).to.eq('Quiz deleted successfully');
        });
    });

    it('should return 404 for non-existent quiz', () => {
        cy.request({
            method: 'DELETE',
            url: '/api/quizzes/nonexistent-quiz',
            failOnStatusCode: false,
        }).then((response) => {
            expect(response.status).to.eq(404);
            expect(response.body.message).to.eq('Quiz not found');
        });
    });
});
