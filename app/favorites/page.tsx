import Link from "next/link";
import { ArrowLeft, Trophy } from "lucide-react";

const favoriteTeams = [
  {
    flag: "🇵🇹",
    name: "Portugal",
    nextMatch: "18 Juni 2026",
    time: "02:00 WIT",
  },

  {
    flag: "🏴",
    name: "England",
    nextMatch: "18 Juni 2026",
    time: "05:00 WIT",
  },

  {
    flag: "🇳🇱",
    name: "Netherlands",
    nextMatch: "21 Juni 2026",
    time: "02:00 WIT",
  },

  {
    flag: "🇧🇷",
    name: "Brazil",
    nextMatch: "20 Juni 2026",
    time: "08:30 WIT",
  },

  {
    flag: "🇦🇷",
    name: "Argentina",
    nextMatch: "17 Juni 2026",
    time: "10:00 WIT",
  },

  {
    flag: "🇯🇵",
    name: "Japan",
    nextMatch: "22 Juni 2026",
    time: "13:00 WIT",
  },

  {
    flag: "🇫🇷",
    name: "France",
    nextMatch: "17 Juni 2026",
    time: "04:00 WIT",
  },

  {
    flag: "🇪🇸",
    name: "Spain",
    nextMatch: "16 Juni 2026",
    time: "01:00 WIT",
  },

  {
    flag: "🇩🇪",
    name: "Germany",
    nextMatch: "21 Juni 2026",
    time: "05:00 WIT",
  },
];

export default function FavoritesPage() {
  return (
    <main className="min-h-screen bg-slate-100">

      {/* HEADER */}
      <header className="bg-blue-950 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">

          <div>
            <h1 className="text-3xl font-bold">
              ⭐ Favorite Teams
            </h1>

            <p className="text-blue-300">
              Bonny's World Cup Tracker
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

        <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow p-8 mb-6">

          <h2 className="text-4xl font-bold">
            Tim Favorit Bonny
          </h2>

          <p className="font-semibold text-white">
            Semua tim yang dipantau selama World Cup 2026.
          </p>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {favoriteTeams.map((team) => (
            <div
              key={team.name}
              className="bg-white/90 backdrop-blur-md rounded-3xl shadow p-6 hover:shadow-lg transition"
            >

              <div className="flex items-center gap-3 mb-4">

                <div className="text-5xl">
                  {team.flag}
                </div>

                <div>

                  <h3 className="text-2xl font-bold text-white">
                    {team.name}
                  </h3>

                  <p className="font-semibold text-white">
                    Favorite Team
                  </p>

                </div>

              </div>

              <div className="border-t pt-4">

                <p className="text-sm font-semibold text-white">
                  Next Match
                </p>

                <p className="font-semibold mt-2">
                  {team.nextMatch}
                </p>

                <p className="text-blue-700 font-bold">
                  {team.time}
                </p>

              </div>

              <div className="mt-4 flex items-center gap-2 text-yellow-500">
                <Trophy size={18} />
                Tracked Team
              </div>

            </div>
          ))}

        </div>

      </div>

      <footer className="bg-white/90 backdrop-blur-md border-t py-6 mt-10">
        <div className="text-center font-semibold text-white">
          © 2026 Bonny's World Cup Tracker
        </div>
      </footer>

    </main>
  );
}