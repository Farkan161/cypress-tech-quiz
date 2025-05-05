import React from 'react';
import { mount } from 'cypress/react';
import Quiz from '../../../client/src/components/Quiz'; // Adjust the path as needed

describe('Quiz Component', () => {
  const mockQuestions = [
    {
      question: 'What is 2 + 2?',
      answers: [
        { text: '3', isCorrect: false },
        { text: '4', isCorrect: true },
        { text: '5', isCorrect: false },
      ],
    },
    {
      question: 'Capital of Spain?',
      answers: [
        { text: 'Madrid', isCorrect: true },
        { text: 'Barcelona', isCorrect: false },
        { text: 'Valencia', isCorrect: false },
      ],
    },
  ];

  beforeEach(() => {
    cy.intercept('GET', '/api/questions', { body: mockQuestions }).as('getQuestions');
    mount(<Quiz />);
    cy.contains('Start Quiz').click();
    cy.wait('@getQuestions');
  });

  it('displays the first question', () => {
    cy.get('h2').should('contain.text', mockQuestions[0].question);
  });

  it('moves to next question after answering', () => {
    cy.get('button').contains('1').click(); 
    cy.get('h2').should('contain.text', mockQuestions[1].question);
  });

  it('shows final score after all questions', () => {
    cy.get('button').contains('1').click(); 
    cy.get('button').contains('1').click(); 
    cy.contains('Your score:').should('be.visible');
  });
});
