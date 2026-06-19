const API_KEY = process.env.FOOTBALL_API_KEY;

export async function getWorldCupMatches() {
  const res = await fetch(
    "https://api.football-data.org/v4/competitions/WC/matches",
    {
      headers: {
        "X-Auth-Token": API_KEY!,
      },
      next: {
        revalidate: 300,
      },
    }
  );

  return res.json();
}

export async function getWorldCupStandings() {
  const res = await fetch(
    "https://api.football-data.org/v4/competitions/WC/standings",
    {
      headers: {
        "X-Auth-Token": API_KEY!,
      },
      next: {
        revalidate: 300,
      },
    }
  );

  return res.json();
}