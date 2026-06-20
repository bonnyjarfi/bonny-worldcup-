import { getWorldCupMatches } from "@/lib/api";
import { favoriteTeams } from "@/lib/favoriteTeams";

export async function GET() {
  try {
    const data = await getWorldCupMatches();

    const matches = data?.matches || [];

    console.log("TOTAL MATCHES:", matches.length);

    // Aman untuk null / undefined
    const normalize = (name: any) =>
      String(name || "")
        .toLowerCase()
        .replace(/[^a-z]/g, "");

    const favoriteMatches = matches.filter((match: any) => {
      const home = normalize(
        match?.homeTeam?.name
      );

      const away = normalize(
        match?.awayTeam?.name
      );

      // Skip jika kedua nama tim kosong
      if (!home && !away) {
        return false;
      }

      return favoriteTeams.some((team) => {
        const t = normalize(team);

        return (
          home.includes(t) ||
          away.includes(t)
        );
      });
    });

    console.log(
      "FAVORITE MATCHES:",
      favoriteMatches.length
    );

    const upcoming = favoriteMatches
      .filter(
        (m: any) => m?.status === "TIMED"
      )
      .sort(
        (a: any, b: any) =>
          new Date(a.utcDate).getTime() -
          new Date(b.utcDate).getTime()
      );

    const live = favoriteMatches.filter(
      (m: any) => m?.status === "LIVE"
    );

    const finished = favoriteMatches
      .filter(
        (m: any) =>
          m?.status === "FINISHED"
      )
      .sort(
        (a: any, b: any) =>
          new Date(b.utcDate).getTime() -
          new Date(a.utcDate).getTime()
      );

    const result =
      upcoming[0] ||
      live[0] ||
      finished[0] ||
      null;

    console.log("NEXT MATCH:", result);

    return Response.json(result);
  } catch (error: any) {
    console.error(
      "favorite-next-match error:",
      error
    );

    return Response.json(
      {
        error:
          error?.message ||
          "Unknown error",
      },
      {
        status: 500,
      }
    );
  }
}