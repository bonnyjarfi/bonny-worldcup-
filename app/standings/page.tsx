import Link from "next/link";
import {
  Trophy,
  ArrowLeft,
} from "lucide-react";

import { getWorldCupStandings } from "@/lib/api";
import { teamFlags } from "@/lib/teamFlags";

export default async function StandingsPage() {
  const data = await getWorldCupStandings();

  const standings = data.standings || [];

  return (
    <main className="min-h-screen bg-slate-100">

      {/* HEADER */}
      <header className="bg-gradient-to-r from-blue-950 to-blue-800 text-white shadow-lg">

        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">

          <div>
            <h1 className="text-3xl font-bold">
              🏆 World Cup Standings
            </h1>

            <p className="text-blue-300">
              FIFA World Cup 2026 • Official Table
            </p>
          </div>

          <Link
            href="/"
            className="hover:text-yellow-300"
          >
            <ArrowLeft className="inline mr-2" />
            Dashboard
          </Link>

        </div>

      </header>

      <div className="max-w-7xl mx-auto p-6">

        <div className="grid lg:grid-cols-2 gap-6">

          {standings.map((group: any) => (

            <div
              key={group.group}
              className="
                bg-white/90
                backdrop-blur-md
                rounded-3xl
                shadow-lg
                overflow-hidden
              "
            >

              {/* GROUP HEADER */}
              <div className="bg-gradient-to-r from-blue-900 to-cyan-700 text-white p-5">

                <div className="flex items-center gap-3">

                  <Trophy />

                  <h2 className="text-2xl font-bold">
                    {group.group}
                  </h2>

                </div>

              </div>

              {/* TABLE */}
              <div className="overflow-x-auto">

                <table className="w-full">

                  <thead>

                    <tr className="border-b bg-slate-50">

                      <th className="p-3 text-left">
                        #
                      </th>

                      <th className="p-3 text-left">
                        Team
                      </th>

                      <th className="p-3">
                        MP
                      </th>

                      <th className="p-3">
                        W
                      </th>

                      <th className="p-3">
                        D
                      </th>

                      <th className="p-3">
                        L
                      </th>

                      <th className="p-3">
                        PTS
                      </th>

                    </tr>

                  </thead>

                  <tbody>

                    {group.table.map(
                      (
                        team: any,
                        index: number
                      ) => (

                        <tr
                          key={team.team.id}
                          className="
                            border-b
                            hover:bg-slate-50
                            transition
                          "
                        >

                          <td className="p-3 font-bold">

                            {index === 0 && "🥇"}
                            {index === 1 && "🥈"}
                            {index === 2 && "🥉"}
                            {index > 2 &&
                              index + 1}

                          </td>

                          <td className="p-3">

                            <Link
                              href={`/team/${team.team.name.toLowerCase()}`}
                              className="hover:text-blue-700"
                            >

                              {teamFlags[
                                team.team.name
                              ] || "⚽"}{" "}

                              {team.team.name}

                            </Link>

                          </td>

                          <td className="text-center">
                            {team.playedGames}
                          </td>

                          <td className="text-center">
                            {team.won}
                          </td>

                          <td className="text-center">
                            {team.draw}
                          </td>

                          <td className="text-center">
                            {team.lost}
                          </td>

                          <td className="text-center">

                            <span
                              className="
                              bg-blue-100
                              text-blue-700
                              px-3
                              py-1
                              rounded-full
                              font-bold
                            "
                            >
                              {team.points}
                            </span>

                          </td>

                        </tr>
                      )
                    )}

                  </tbody>

                </table>

              </div>

            </div>

          ))}

        </div>

      </div>

    </main>
  );
}