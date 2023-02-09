export default function ScoreTable({ data }) {
  return (
    <>
      <div className="chess__leaderboard">
        <div className="chess__leaderboard__header">
          <h3>Leaderboard</h3>
        </div>
        <table className="chess__leaderboard__list">
          <thead>
            <tr>
              <th>Username</th>
              <th>Turns</th>
              <th>Date</th>
            </tr>
          </thead>
          {data.map((el, index) => (
            <tr key={index}>
              <td>{el["user_name"]}</td>
              <td>{el["turns_played"]}</td>
              <td>{el["game_date"]}</td>
            </tr>
          ))}
        </table>
      </div>
    </>
  );
}
