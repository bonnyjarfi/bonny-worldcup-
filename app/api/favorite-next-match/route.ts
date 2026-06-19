import { getWorldCupMatches } from "@/lib/api";
import { favoriteTeams } from "@/lib/favoriteTeams";

export async function GET() {
  const data = await getWorldCupMatches();
  const matches = data.matches || [];

  // normalize function biar aman
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

  // TIMED (future match)
  const upcoming = favoriteMatches
    .filter((m: any) => m.status === "TIMED")
    .sort(
      (a: any, b: any) =>
        new Date(a.utcDate).getTime() -
        new Date(b.utcDate).getTime()
    );

  // fallback 1: TIMED
  // fallback 2: LIVE
  // fallback 3: FINISHED terbaru
  const live = favoriteMatches.filter(
    (m: any) => m.status === "LIVE"
  );

  const finished = favoriteMatches
    .filter((m: any) => m.status === "FINISHED")
    .sort(
      (a: any, b: any) =>
        new Date(b.utcDate).getTime() -
        new Date(a.utcDate).getTime()
    );

  const result =
    upcoming[0] || live[0] || finished[0] || null;

  return Response.json(result);
}