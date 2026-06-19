import Link from "next/link";

import {
  ArrowLeft,
  Trophy,
  CalendarDays,
  Clock,
} from "lucide-react";

import { teamFlags } from "@/lib/teamFlags";
import { getWorldCupMatches } from "@/lib/api";

export default async function MatchDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const data = await getWorldCupMatches();

  const match = data.matches.find(
    (m: any) => String(m.id) === id
  );

  if (!match) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <h1 className="text-3xl font-bold">
          Match Not Found
        </h1>
      </main>
    );
  }

  const date = new Date(match.utcDate);

  return (
    <main className="min-h-screen bg-slate-100">

      {/* HEADER */}
      <header className="bg-gradient-to-r from-blue-950 to-blue-800 text-white shadow-lg">

        <div className="max-w-6xl mx-auto px-6 py-6 flex justify-between items-center">

          <div>

            <h1 className="text-3xl font-bold">
              Match Detail
            </h1>

            <p className="text-blue-300">
              FIFA World Cup 2026
            </p>

          </div>

          <Link
            href="/"
            className="flex items-center gap-2 hover:text-yellow-300"
          >
            <ArrowLeft />
            Dashboard
          </Link>

        </div>

      </header>

      <div className="max-w-6xl mx-auto p-6">

        {/* HERO */}
        <div
          className="
          rounded-3xl
          overflow-hidden
          relative
          shadow-xl
          mb-6
        "
        >

          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('/images/bg.jpg')",
            }}
          />

          <div className="absolute inset-0 bg-black/60" />

          <div className="text-center">

  <div
    className="
      inline-block
      bg-yellow-500
      text-black
      px-4
      py-2
      rounded-full
      font-bold
      mb-6
    "
  >
    🏆 {match.stage}
  </div>

  <h2 className="text-6xl font-bold">
    {teamFlags[match.homeTeam?.name] || "⚽"}{" "}
    {match.homeTeam?.name}
  </h2>

  <div className="my-6 text-3xl font-bold text-yellow-300">
    VS
  </div>

  <h2 className="text-6xl font-bold">
    {teamFlags[match.awayTeam?.name] || "⚽"}{" "}
    {match.awayTeam?.name}
  </h2>

</div>

        </div>
{/* SCOREBOARD */}
<div className="bg-white rounded-3xl shadow-lg p-8 mb-6">

  <div className="grid grid-cols-3 items-center text-center">

    <div>
      <p className="text-5xl mb-2">
        {teamFlags[match.homeTeam?.name] || "⚽"}
      </p>

      <h3 className="text-3xl font-bold text-white">
        {match.homeTeam?.name}
      </h3>
    </div>

    <div>

      <div className="text-6xl font-bold text-blue-700">
        -
      </div>

      <p className="text-gray-500 mt-2">
        Match Not Started
      </p>

    </div>

    <div>
      <p className="text-5xl mb-2">
        {teamFlags[match.awayTeam?.name] || "⚽"}
      </p>

      <h3 className="text-3xl font-bold text-white">
        {match.awayTeam?.name}
      </h3>
    </div>

  </div>

</div>

        {/* INFO */}
        <div className="grid md:grid-cols-3 gap-6 mb-6">

          <div className="bg-white rounded-3xl shadow p-6">

            <CalendarDays className="mb-3" />

            <p className="text-gray-500">
              Match Date
            </p>

            <h3 className="text-2xl font-bold text-white">
              {date.toLocaleDateString(
                "id-ID",
              {
                day: "2-digit",
                month: "long",
                year: "numeric",
              }
              )}
            </h3>

          </div>

          <div className="bg-white rounded-3xl shadow p-6">

            <Clock className="mb-3" />

            <p className="text-gray-500">
              Kick Off (WIT)
            </p>

            <h3 className="text-xl font-bold">
              {date.toLocaleTimeString(
                "id-ID",
                {
                  hour: "2-digit",
                  minute: "2-digit",
                  timeZone:
                    "Asia/Jayapura",
                }
              )}
            </h3>

          </div>

          <div className="bg-white rounded-3xl shadow p-6">

            <Trophy className="mb-3" />

            <p className="text-gray-500">
              Status
            </p>

            <h3 className="text-xl font-bold text-blue-700">
              {match.status}
            </h3>

          </div>

        </div>

        {/* MATCH DETAILS */}
        <div className="bg-white rounded-3xl shadow p-6">

          <h2 className="text-2xl font-bold mb-6">
            Match Information
          </h2>

          <div className="space-y-4">

            <div className="flex justify-between border-b pb-3">
              <span>Stage</span>
              <strong>{match.stage}</strong>
            </div>

            <div className="flex justify-between border-b pb-3">
              <span>Competition</span>
              <strong>
                FIFA World Cup 2026
              </strong>
            </div>

            <div className="flex justify-between border-b pb-3">
              <span>Home Team</span>
              <strong>
                {match.homeTeam?.name}
              </strong>
            </div>

            <div className="flex justify-between">
              <span>Away Team</span>
              <strong>
                {match.awayTeam?.name}
              </strong>
            </div>

          </div>

        </div>

      </div>

    </main>
  );
}