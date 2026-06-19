import { getWorldCupMatches } from "@/lib/api";
import { favoriteTeams } from "@/lib/favoriteTeams";

export async function GET() {
  const data = await getWorldCupMatches();

  const matches = data.matches || [];

  const upcomingMatches = matches.filter(
    (match: any) =>
      match.status === "TIMED" &&
      (
        favoriteTeams.includes(match.homeTeam?.name) ||
        favoriteTeams.includes(match.awayTeam?.name)
      )
  );

  upcomingMatches.sort(
    (a: any, b: any) =>
      new Date(a.utcDate).getTime() -
      new Date(b.utcDate).getTime()
  );

  return Response.json(
    upcomingMatches[0]
  );
}