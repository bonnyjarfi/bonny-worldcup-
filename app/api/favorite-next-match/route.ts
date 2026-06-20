import { getWorldCupMatches } from "@/lib/api";
import { favoriteTeams } from "@/lib/favoriteTeams";

export async function GET() {
  const data = await getWorldCupMatches();
  const matches = data.matches || [];

  console.log("TOTAL MATCHES:", matches.length);

  const normalize = (name: string = "") =>
    name.toLowerCase().replace(/[^a-z]/g, "");

  const favoriteMatches = matches.filter((match: any) => {
    const home = normalize(match.homeTeam?.name);
    const away = normalize(match.awayTeam?.name);

    return favoriteTeams.some((team) => {
      const t = normalize(team);
      return home.includes(t) || away.includes(t);
    });
  });

  console.log(
    "FAVORITE MATCHES:",
    favoriteMatches.length
  );

  const upcoming = favoriteMatches
    .filter((m: any) => m.status === "TIMED")
    .sort(
      (a: any, b: any) =>
        new Date(a.utcDate).getTime() -
        new Date(b.utcDate).getTime()
    );

  console.log(
    "UPCOMING:",
    upcoming.length
  );

  const result =
    upcoming[0] || null;

  console.log("RESULT:", result);

  return Response.json(result);
}