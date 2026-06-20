import CountdownCard from "@/components/CountdownCard";
import { getWorldCupMatches } from "@/lib/api";
import { favoriteTeams } from "@/lib/favoriteTeams";
import NotificationCenter from "@/components/NotificationCenter";
import DashboardStats from "@/components/DashboardStats";
import Link from "next/link";

import {
Bell,
CalendarDays,
Trophy,
Star,
} from "lucide-react";

export default async function Home() {
const data = await getWorldCupMatches();

const matches =
data.matches?.filter(
(match: any) =>
favoriteTeams.includes(
match.homeTeam?.name
) ||
favoriteTeams.includes(
match.awayTeam?.name
)
) || [];

const now = new Date();

const upcomingMatches = matches
  .filter((m: any) => m.status === "TIMED")
  .sort(
    (a: any, b: any) =>
      new Date(a.utcDate).getTime() -
      new Date(b.utcDate).getTime()
  )
  .slice(0, 5);

return ( <main className="min-h-screen bg-slate-100">

```
  {/* HEADER */}
  <header className="bg-gradient-to-r from-blue-950 to-blue-800 text-white shadow-lg sticky top-0 z-50">
    <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">

      <div>
        <h1 className="text-3xl font-bold">
          ⚽ Bonny's World Cup Tracker
        </h1>

        <p className="text-blue-300 text-sm">
          FIFA World Cup 2026 • WIT
        </p>
      </div>

      <nav className="hidden md:flex gap-8 font-medium">

        <a href="/" className="hover:text-yellow-300">
          Dashboard
        </a>

        <a href="/schedule" className="hover:text-yellow-300">
          Schedule
        </a>

        <a href="/standings" className="hover:text-yellow-300">
          Standings
        </a>

      </nav>

    </div>
  </header>

  <div className="max-w-7xl mx-auto p-6">

    {/* HERO */}
    <section
      className="
      relative
      overflow-hidden
      rounded-3xl
      shadow-xl
      mb-6
    "
    >

      {/* Background Image */}
      <div
        className="
          absolute
          inset-0
          bg-cover
          bg-center
          scale-105
        "
        style={{
          backgroundImage:
            "url('/images/bg.jpg')",
        }}
      />

      {/* Overlay */}
      <div
        className="
          absolute
          inset-0
          bg-gradient-to-r
          from-blue-950/95
          via-blue-900/80
          to-cyan-600/70
        "
      />

      {/* Content */}
      <div className="relative z-10 p-12 text-white">

      <div className="inline-flex items-center gap-2 bg-white/90 px-4 py-2 rounded-full mb-5 shadow">
  <span>🏆</span>
  <span className="text-sm font-semibold text-slate-800">
    FIFA World Cup 2026
  </span>
</div>

        <h2 className="text-5xl md:text-6xl font-bold leading-tight">
          Welcome Back
          <br />

        </h2>

        <p className="mt-5 text-3xl text-blue-100 max-w-2xl">
          Website ini dikembangkan supaya kam bisa lihat
          Jadwal, klasemen,
          dan pertandingan kam punya tim favorit dengan zona waktu WIT
          menyesuaikan waktu papua kah ini..
        </p>

        <div className="grid md:grid-cols-4 gap-4 mt-8 max-w-4xl">

<div className="bg-white/10 backdrop-blur-md rounded-2xl p-4">
  <p className="text-3xl font-bold">48</p>
  <p className="text-sm text-blue-100">
    Teams
  </p>
</div>

<div className="bg-white/10 backdrop-blur-md rounded-2xl p-4">
  <p className="text-3xl font-bold">104</p>
  <p className="text-sm text-blue-100">
    Matches
  </p>
</div>

<div className="bg-white/10 backdrop-blur-md rounded-2xl p-4">
  <p className="text-3xl font-bold">16</p>
  <p className="text-sm text-blue-100">
    Host Cities
  </p>
</div>

<div className="bg-white/10 backdrop-blur-md rounded-2xl p-4">
  <p className="text-3xl font-bold">3</p>
  <p className="text-sm text-blue-100">
    Host Countries
  </p>
</div>

</div>
        
        <div className="flex flex-wrap gap-3 mt-8">

          {favoriteTeams.map((team) => (
            <span
              key={team}
              className="
               bg-white/10 backdrop-blur-md
                backdrop-blur
                px-4
                py-2
                rounded-full
                border
                border-white/20
              "
            >
              {team}
            </span>
          ))}

        </div>

      </div>

    </section>

    {/* API STATUS */}
    <section className="bg-yellow-100 border border-yellow-300 rounded-2xl p-5 mb-6">

      <div className="flex gap-3">

        <Bell className="text-yellow-600" />

        <div>

          <h3 className="font-bold text-yellow-800">
            Official World Cup Data Connected
          </h3>

          <p className="text-yellow-700">
            Data pertandingan diambil langsung dari Football Data API.
          </p>

        </div>

      </div>

    </section>
     
     
 
    <div className="grid md:grid-cols-4 gap-4 mb-6">

<Link
  href="/schedule"
  className="
    bg-white
    rounded-2xl
    p-5
    shadow
    hover:shadow-lg
    transition
  "
>
  📅 Schedule
</Link>

<Link
  href="/standings"
  className="
    bg-white
    rounded-2xl
    p-5
    shadow
    hover:shadow-lg
    transition
  "
>
  🏆 Standings
</Link>

<Link
  href="/favorites"
  className="
    bg-white
    rounded-2xl
    p-5
    shadow
    hover:shadow-lg
    transition
  "
>
  ⭐ Favorites
</Link>

</div>
<div className="grid lg:grid-cols-3 gap-6">      
      
      {/* LEFT */}
      <div className="lg:col-span-2 space-y-6">

        <CountdownCard />

        <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-lg p-6">

          <div className="flex items-center gap-2 mb-6">

            <CalendarDays />

            <h2 className="text-2xl font-bold">
              Upcoming Favorite Matches
            </h2>

          </div>

          <div className="space-y-4">
          {upcomingMatches.map((match: any) => {

const date = new Date(
  match.utcDate
);

return (
  <a
  
  key={match.id}
  href={`/match/${match.id}`}
  className="
    block
    relative
    overflow-hidden
    rounded-3xl
    p-6
    text-white
    shadow-lg
    hover:scale-[1.02]
    hover:shadow-2xl
    transition-all
    bg-gradient-to-r
    from-blue-900
    via-blue-700
    to-cyan-600
  "
>
    <div className="text-center">

      <h3 className="text-2xl font-bold text-white">
        {match.homeTeam?.name}
      </h3>

      <p className="text-yellow-300 my-3 font-bold">
        VS
      </p>

      <h3 className="text-2xl font-bold text-white">
        {match.awayTeam?.name}
      </h3>

    </div>

    <div className="flex justify-between mt-5 text-sm text-gray-500">

      <span>
        ...
      </span>

      <span>
        ...
      </span>

    </div>

  </a>
  
);
})}

          </div>

        </div>

      </div>

      {/* RIGHT */}
      <div className="space-y-6">

        <DashboardStats />

        <NotificationCenter />

        <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-lg p-6">

  <div className="flex items-center gap-2 mb-6">

    <Trophy />

    <h2 className="text-xl font-bold">
      Favorite Teams
    </h2>

  </div>

  <div className="space-y-3">

    {favoriteTeams.map((team) => {

      const flags: Record<string, string> = {
        Portugal: "🇵🇹",
        England: "🏴",
        Netherlands: "🇳🇱",
        Brazil: "🇧🇷",
        Argentina: "🇦🇷",
        Japan: "🇯🇵",
        France: "🇫🇷",
        Spain: "🇪🇸",
        Germany: "🇩🇪",
      };

      return (
        <a
          key={team}
          href={`/team/${team.toLowerCase()}`}
          className="
  flex
  justify-between
  items-center
  p-4
  rounded-2xl
  bg-gradient-to-r
  from-blue-900
  to-cyan-700
  text-white
  shadow-md
  hover:shadow-xl
  hover:translate-x-1
  transition-all
"
        >

          <div className="flex items-center gap-3">

            <span className="text-2xl">
              {flags[team]}
            </span>

            <span className="font-medium">
              {team}
            </span>

          </div>

          <Star
            size={18}
            className="text-yellow-500"
          />

        </a>
      );
    })}

  </div>

</div>

      </div>

    </div>

  </div>

  <footer className="mt-10 bg-white/90 backdrop-blur-md border-t py-6">

    <div className="max-w-7xl mx-auto px-6 text-center text-gray-500">

      © 2026 Bonny's World Cup Tracker • Powered by Next.js & Football Data API

    </div>

  </footer>

</main>

);
}
