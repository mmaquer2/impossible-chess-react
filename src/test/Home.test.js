import { render, screen } from "@testing-library/react";
import Home from "../pages/Home";
import LeaderboardPage from "../pages/leaderboard";

test("App HomePage Renders Correct", () => {
  render(<Home />);
  const element = screen.getByTestId("title-label");
  expect(element.textContent).toBe(
    "Impossible Chess | Can you beat the best bot in the world?"
  );
});

test("App fetched leaderboard scores from the database", () => {
  render(<LeaderboardPage />);
  //const firstScore = screen.getByTestId("leaderboard-score-0")
  //expect(firstScore.textContent).toBe('1');
});

test("User can navigate to the leaderboard page from home", () => {
  render(<Home />);
  //const leaderboardLink = screen.getByTestId("leaderboard-link");
  //expect(leaderboardLink.textContent).toBe('Leaderboard');
});
