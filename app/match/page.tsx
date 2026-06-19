import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  Clock3,
  Trophy,
} from "lucide-react";

async function getMatch(id: string) {
  const res = await fetch(
    `http://localhost:3000/api/match/${id}`,
    {
      cache: "no-store",
    }
  );

  return res.json();
}

export default async function MatchPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const match = await getMatch(id);

  const date = new Date(match.utcDate);

  return (
    <main className="min-h-screen bg-slate-100">

      <header className="bg-blue-950 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between">

          <div>
            <h1 className="text-3xl font-bold">
              ⚽ Match Detail
            </h1>

            <p className="text-blue-300">
              FIFA World Cup 2026
            </p>
          </div>

          <Link
            href="/schedule"
            className="hover:text-yellow-300"
          >
            ← Back
          </Link>

        </div>
      </header>

      <div className="max-w-5xl mx-auto p-6">

        <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-lg p-10">

          <div className="text-center">

            <h2 className="text-5xl font-bold">
              {match.homeTeam.name}
            </h2>

            <div className="my-8 text-3xl text-gray-400">
              VS
            </div>

            <h2 className="text-5xl font-bold">
              {match.awayTeam.name}
            </h2>

          </div>

          <div className="grid md:grid-cols-4 gap-5 mt-10">

            <div className="bg-slate-50 rounded-2xl p-5 text-center">

              <CalendarDays className="mx-auto mb-2" />

              <p className="text-gray-500 text-sm">
                Date
              </p>

              <p className="font-bold mt-2">
                {date.toLocaleDateString("id-ID")}
              </p>

            </div>

            <div className="bg-slate-50 rounded-2xl p-5 text-center">

              <Clock3 className="mx-auto mb-2" />

              <p className="text-gray-500 text-sm">
                Kick Off
              </p>

              <p className="font-bold mt-2">
                {date.toLocaleTimeString(
                  "id-ID",
                  {
                    hour: "2-digit",
                    minute: "2-digit",
                    timeZone: "Asia/Jayapura",
                  }
                )} WIT
              </p>

            </div>

            <div className="bg-slate-50 rounded-2xl p-5 text-center">

              <Trophy className="mx-auto mb-2" />

              <p className="text-gray-500 text-sm">
                Group
              </p>

              <p className="font-bold mt-2">
                {match.group}
              </p>

            </div>

            <div className="bg-slate-50 rounded-2xl p-5 text-center">

              <p className="text-gray-500 text-sm">
                Status
              </p>

              <p className="font-bold mt-2 text-green-600">
                {match.status}
              </p>

            </div>

          </div>

        </div>

      </div>

    </main>
  );
}