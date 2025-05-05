describe('Tech Quiz End-to-End Tests', () => {
    beforeEach(() => {
      // Navigate to the quiz application before each test
      cy.visit('/');
    });
  
    it('starts the quiz when the Start button is clicked', () => {
      // Ensure the Start button is visible and trigger it
      cy.get('[data-cy="start-button"]').should('be.visible').click();
  
      // Confirm that the first question is displayed
      cy.get('[data-cy="question"]').should('be.visible');
    });
  
    it('shows the next question after selecting an answer', () => {
      cy.get('[data-cy="start-button"]').click();
  
      // Capture the current question text
      cy.get('[data-cy="question"]').invoke('text').then((firstQuestion) => {
        // Select the first answer option
        cy.get('[data-cy="answer-option"]').first().click();
  
        // Verify the question changes
        cy.get('[data-cy="question"]').should('not.have.text', firstQuestion);
      });
    });
  
    it('displays the final score after all questions are answered', () => {
      cy.get('[data-cy="start-button"]').click();
  
      // Answer all 10 questions
      for (let i = 0; i < 10; i++) {
        cy.get('[data-cy="answer-option"]').first().click();
      }
  
      // Confirm the final score is shown
      cy.get('[data-cy="final-score"]').should('be.visible');
    });
  
    it('restarts the quiz when the user clicks Start New Quiz', () => {
      cy.get('[data-cy="start-button"]').click();
  
      // Complete all questions
      for (let i = 0; i < 10; i++) {
        cy.get('[data-cy="answer-option"]').first().click();
      }
  
      // Final score should appear
      cy.get('[data-cy="final-score"]').should('be.visible');
  
      // Restart the quiz
      cy.get('[data-cy="start-new-quiz"]').click();
  
      // Start button should reappear, indicating reset
      cy.get('[data-cy="start-button"]').should('be.visible');
    });
  });
  