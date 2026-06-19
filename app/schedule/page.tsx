import Link from "next/link";
import {
ArrowLeft,
Trophy,
CalendarDays,
} from "lucide-react";

import { getWorldCupMatches } from "@/lib/api";

export default async function SchedulePage() {
const data = await getWorldCupMatches();

const matches = data.matches || [];

return ( <main className="min-h-screen bg-slate-100">

```
  {/* HEADER */}
  <header className="bg-blue-950 text-white shadow-lg">
    <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">

      <div>
        <h1 className="text-3xl font-bold">
          ⚽ World Cup Schedule
        </h1>

        <p className="text-blue-300 text-sm">
          Official FIFA World Cup 2026 Schedule
        </p>
      </div>

      <Link
        href="/"
        className="flex items-center gap-2 hover:text-yellow-300"
      >
        <ArrowLeft size={18} />
        Dashboard
      </Link>

    </div>
  </header>

  <div className="max-w-7xl mx-auto p-6">

    {/* HERO */}
    <div
  className="
    relative
    overflow-hidden
    rounded-3xl
    shadow-2xl
    mb-10
    text-white
  "
>

  <div
    className="absolute inset-0 bg-cover bg-center"
    style={{
      backgroundImage: "url('/images/bg.jpg')",
    }}
  />

  <div className="absolute inset-0 bg-gradient-to-r from-blue-950/95 via-blue-900/80 to-cyan-700/70" />

  <div className="relative z-10 p-10">

    <h2 className="text-5xl font-bold">
      ⚽ FIFA World Cup 2026
    </h2>

    <p className="mt-3 text-blue-100 text-lg">
      Official schedule powered by Football Data API
    </p>

    <div className="grid grid-cols-3 gap-4 mt-8 max-w-xl">

      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4">
        <p className="text-3xl font-bold">
          {matches.length}
        </p>
        <p className="text-blue-100">
          Matches
        </p>
      </div>

      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4">
        <p className="text-3xl font-bold">
          48
        </p>
        <p className="text-blue-100">
          Teams
        </p>
      </div>

      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4">
        <p className="text-3xl font-bold">
          12
        </p>
        <p className="text-blue-100">
          Groups
        </p>
      </div>

    </div>

  </div>

</div>
    <div className="grid lg:grid-cols-2 gap-6">

      {matches.map((match: any) => {

        const matchDate = new Date(match.utcDate);

        const dateWIT =
          matchDate.toLocaleDateString(
            "id-ID",
            {
              day: "2-digit",
              month: "long",
              year: "numeric",
              timeZone: "Asia/Jayapura",
            }
          );

        const timeWIT =
          matchDate.toLocaleTimeString(
            "id-ID",
            {
              hour: "2-digit",
              minute: "2-digit",
              timeZone: "Asia/Jayapura",
            }
          );

        const homeScore =
          match.score?.fullTime?.home ?? "-";

        const awayScore =
          match.score?.fullTime?.away ?? "-";

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
  duration-300
  bg-gradient-to-r
  from-blue-900
  via-blue-800
  to-cyan-700
            "
          >
            <div
  className="
    absolute
    -top-16
    -right-16
    w-40
    h-40
    rounded-full
    bg-white/10
  "
/>

            {/* STATUS */}
            <div className="flex justify-between items-center mb-5">

              <div className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                <Trophy size={14} />
                {match.group}
              </div>

              <div
                className={`
                  px-3 py-1 rounded-full text-xs font-bold

                  ${
                    match.status === "TIMED"
                      ? "bg-blue-100 text-blue-700"
                      : ""
                  }

                  ${
                    match.status === "FINISHED"
                      ? "bg-green-100 text-green-700"
                      : ""
                  }

                  ${
                    match.status === "LIVE"
                      ? "bg-red-100 text-red-700"
                      : ""
                  }
                `}
              >
                {match.status}
              </div>

            </div>

            {/* TEAMS */}
            <div className="text-center">

              <h3 className="text-3xl font-bold text-white">
                {match.homeTeam?.name}
              </h3>

              <div className="my-5 text-3xl font-bold text-yellow-300">

                {match.status === "FINISHED"
                  ? `${homeScore} - ${awayScore}`
                  : "VS"}

              </div>

              <h3 className="text-3xl font-bold text-white">
                {match.awayTeam?.name}
              </h3>

            </div>

            {/* INFO */}
            <div className="grid grid-cols-2 gap-4 mt-8">

              <div className="bg-slate-50 rounded-xl p-3 text-center">

                <p className="text-xs text-gray-500">
                  DATE
                </p>

                <p className="font-semibold">
                  {dateWIT}
                </p>

              </div>

              <div className="bg-slate-50 rounded-xl p-3 text-center">

                <p className="text-xs text-gray-500">
                  TIME (WIT)
                </p>

                <p className="font-semibold">
                  {timeWIT}
                </p>

              </div>

            </div>

          </Link>
        );
      })}
    </div>
  </div>

  <footer className="bg-white/90 backdrop-blur-md border-t py-6 mt-10">
    <div className="text-center text-gray-500">
      © 2026 Bonny's World Cup Tracker
    </div>
  </footer>

</main>


);
}
