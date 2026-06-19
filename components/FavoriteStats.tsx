export default function FavoriteStats() {
    const stats = [
      {
        team: "Portugal",
        played: 1,
        win: 1,
        points: 3,
      },
  
      {
        team: "England",
        played: 0,
        win: 0,
        points: 0,
      },
  
      {
        team: "Netherlands",
        played: 0,
        win: 0,
        points: 0,
      },
  
      {
        team: "Brazil",
        played: 1,
        win: 0,
        points: 1,
      },
    ];
  
    return (
      <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow p-6">
        <h2 className="font-bold text-xl mb-4">
          📊 Favorite Team Stats
        </h2>
  
        <div className="space-y-3">
          {stats.map((team) => (
            <div
              key={team.team}
              className="border rounded-xl p-3"
            >
              <div className="font-semibold">
                {team.team}
              </div>
  
              <div className="text-sm font-semibold text-white">
                Main: {team.played} |
                Menang: {team.win} |
                Poin: {team.points}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }