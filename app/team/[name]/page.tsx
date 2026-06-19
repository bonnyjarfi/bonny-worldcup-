import Link from "next/link";
import {
  ArrowLeft,
  Trophy,
  Calendar,
  Clock,
} from "lucide-react";

import { getWorldCupMatches } from "@/lib/api";
import { teamFlags } from "@/lib/teamFlags";

export default async function TeamPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;

  const data = await getWorldCupMatches();

  const teamName =
    name.charAt(0).toUpperCase() +
    name.slice(1);

  const teamMatches =
    data.matches?.filter(
      (m: any) =>
        m.homeTeam?.name?.toLowerCase() ===
          name ||
        m.awayTeam?.name?.toLowerCase() ===
          name
    ) || [];

  const upcoming =
    teamMatches.filter(
      (m: any) => m.status === "TIMED"
    ).length;
    const wins = teamMatches.filter(
      (m: any) =>
        m.score?.winner &&
        (
          (m.score.winner === "HOME_TEAM" &&
            m.homeTeam?.name?.toLowerCase() === name) ||
          (m.score.winner === "AWAY_TEAM" &&
            m.awayTeam?.name?.toLowerCase() === name)
        )
    ).length;
    
    const draws = teamMatches.filter(
      (m: any) => m.score?.winner === "DRAW"
    ).length;
    
    const finished = teamMatches.filter(
      (m: any) => m.status === "FINISHED"
    ).length;
    
    const losses = Math.max(
      0,
      finished - wins - draws
    );

  return (
    <main className="min-h-screen bg-slate-100">

      {/* HERO */}
      <section className="relative overflow-hidden">

        <div
          className="
            absolute
            inset-0
            bg-cover
            bg-center
          "
          style={{
            backgroundImage:
              "url('/images/bg.jpg')",
          }}
        />

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-r
            from-blue-950/95
            via-blue-900/85
            to-cyan-700/70
          "
        />

        <div className="relative z-10 max-w-6xl mx-auto px-6 py-16 text-white">

          <div className="flex justify-between items-start">

            <div>

              <div className="text-7xl mb-4">
                {teamFlags[teamName] || "⚽"}
              </div>

              <h1 className="text-6xl font-bold uppercase">
                {teamName}
              </h1>

              <p className="text-blue-200 mt-2">
                FIFA World Cup 2026
              </p>

            </div>

            <Link
              href="/"
              className="
                flex
                items-center
                gap-2
                bg-white/10
                backdrop-blur-md
                px-4
                py-2
                rounded-xl
              "
            >
              <ArrowLeft size={18} />
              Dashboard
            </Link>

          </div>

          {/* STATS */}
          {/* STATS */}
<div className="grid md:grid-cols-5 gap-4 mt-10">

<div className="bg-white/10 backdrop-blur-md rounded-2xl p-5">
  <p className="text-3xl font-bold">
    {teamMatches.length}
  </p>
  <p className="text-blue-100">
    Matches
  </p>
</div>

<div className="bg-green-500/20 backdrop-blur-md rounded-2xl p-5">
  <p className="text-3xl font-bold">
    {wins}
  </p>
  <p className="text-green-100">
    Wins
  </p>
</div>

<div className="bg-yellow-500/20 backdrop-blur-md rounded-2xl p-5">
  <p className="text-3xl font-bold">
    {draws}
  </p>
  <p className="text-yellow-100">
    Draws
  </p>
</div>

<div className="bg-red-500/20 backdrop-blur-md rounded-2xl p-5">
  <p className="text-3xl font-bold">
    {losses}
  </p>
  <p className="text-red-100">
    Losses
  </p>
</div>

<div className="bg-cyan-500/20 backdrop-blur-md rounded-2xl p-5">
  <p className="text-3xl font-bold">
    {upcoming}
  </p>
  <p className="text-cyan-100">
    Upcoming
  </p>
</div>

</div>
        </div>

      </section>

      {/* MATCHES */}
      <div className="max-w-6xl mx-auto p-6">

        <div className="bg-white rounded-3xl shadow-lg p-6">

          <div className="flex items-center gap-3 mb-6">

            <Trophy />

            <h2 className="text-2xl font-bold">
              Team Matches
            </h2>

          </div>

          <div className="space-y-5">

            {teamMatches.map((match: any) => {

              const date =
                new Date(match.utcDate);

              return (
                <Link
                
  key={match.id}
  href={`/match/${match.id}`}
  className="
    block
    relative
    overflow-hidden
    rounded-3xl
    p-6
    text-white
    shadow-xl
    hover:scale-[1.02]
    hover:shadow-2xl
    transition-all
    bg-gradient-to-r
    from-blue-900
    via-blue-800
    to-cyan-700
  "
>

                  <div className="text-center">

                    <h3 className="text-3xl font-bold text-white">
                      {teamFlags[
                        match.homeTeam?.name
                      ] || "⚽"}{" "}
                      {match.homeTeam?.name}
                    </h3>

                    <p className="text-yellow-300 my-3 font-bold">
                      VS
                    </p>

                    <h3 className="text-3xl font-bold text-white">
                      {teamFlags[
                        match.awayTeam?.name
                      ] || "⚽"}{" "}
                      {match.awayTeam?.name}
                    </h3>

                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-6">

                    <div className="bg-white/10 backdrop-blur-md rounded-xl p-4">

                      <div className="flex items-center gap-2 text-blue-100 text-sm">
                        <Calendar size={14} />
                        Match Date
                      </div>

                      <p className="font-semibold mt-1 text-white">
                        {date.toLocaleDateString(
                          "id-ID",
                          {
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                          }
                        )}
                      </p>

                    </div>

                    <div className="bg-slate-50 rounded-xl p-3">

                      <div className="flex items-center gap-2 text-gray-500 text-sm">
                        <Clock size={14} />
                        Kick Off
                      </div>

                      <p className="font-semibold mt-1">
                        {date.toLocaleTimeString(
                          "id-ID",
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                            timeZone:
                              "Asia/Jayapura",
                          }
                        )}{" "}
                        WIT
                      </p>

                    </div>

                  </div>

                  <div className="mt-4 flex justify-end">

                    <span
                      className="
                        bg-white/20
                        text-white
                        px-3
                        py-1
                        rounded-full
                        text-xs
                        font-semibold
                      "
                    >
                      {match.status}
                    </span>

                  </div>

                </Link>
                
                
              );
            })}

          </div>

        </div>

      </div>

    </main>
  );
}