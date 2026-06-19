import { getWorldCupMatches } from "./api";

export async function getTeamMatches(
  teamName: string
) {
  const data =
    await getWorldCupMatches();

  return data.matches.filter(
    (match: any) =>
      match.homeTeam?.name === teamName ||
      match.awayTeam?.name === teamName
  );
}