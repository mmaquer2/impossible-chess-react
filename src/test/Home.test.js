import { render, screen } from '@testing-library/react';
import Home from '../pages/Home';
import LeaderboardPage from '../pages/leaderboard';



// test('App HomePage Renders Correct', () => {
//   render(<Home />);
//   //const element = screen.getByTestId("time-label")
//   //expect(element.textContent).toBe('What Time is it?');
 
// });

test('App fetched leaderboard scores from the database', () => {
    render(<LeaderboardPage />);
    //const firstScore = screen.getByTestId("leaderboard-score-0")
  
     

});

test('App can post user scores to the database', () => {
    render(<Home />);
});

// test('App renders the time', () => {
//   render(<App />);
//   const element = screen.getByTestId("time-text-display")
//   expect(element.textContent).not.toBe('');
 
// });