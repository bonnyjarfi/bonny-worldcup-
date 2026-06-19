"use client";

import { useEffect, useState } from "react";
import {
Trophy,
CalendarDays,
Clock3,
} from "lucide-react";

export default function CountdownCard() {
const [match, setMatch] = useState<any>(null);

const [timeLeft, setTimeLeft] = useState({
days: 0,
hours: 0,
minutes: 0,
seconds: 0,
});

useEffect(() => {
async function loadMatch() {
const res = await fetch(
"/api/favorite-next-match"
);

  const data = await res.json();

  setMatch(data);
}

loadMatch();


}, []);

useEffect(() => {
if (!match) return;


const timer = setInterval(() => {
  const now = Date.now();

  const distance =
    new Date(match.utcDate).getTime() - now;

  if (distance <= 0) {
    return;
  }

  setTimeLeft({
    days: Math.floor(
      distance / (1000 * 60 * 60 * 24)
    ),

    hours: Math.floor(
      (distance %
        (1000 * 60 * 60 * 24)) /
        (1000 * 60 * 60)
    ),

    minutes: Math.floor(
      (distance %
        (1000 * 60 * 60)) /
        (1000 * 60)
    ),

    seconds: Math.floor(
      (distance % (1000 * 60)) /
        1000
    ),
  });
}, 1000);

return () => clearInterval(timer);


}, [match]);

if (!match) {
return ( <div className="bg-white rounded-3xl shadow-lg p-8">
Loading countdown... </div>
);
}

const date = new Date(match.utcDate);

return ( <div
   className="
   bg-gradient-to-r
   from-blue-950
   via-blue-800
   to-cyan-700
   text-white
   rounded-3xl
   shadow-xl
   overflow-hidden
   relative
   "
 >

  {/* Overlay */}
  <div
    className="
    absolute
    inset-0
    bg-black/10
    "
  />

  <div className="relative z-10 p-8">

    {/* Header */}
    <div className="flex items-center gap-3 mb-6">

      <div className="bg-white/20 p-3 rounded-2xl">
        <Trophy />
      </div>

      <div>
        <h2 className="text-2xl font-bold">
          Next Favorite Match
        </h2>

        <p className="text-blue-100 text-sm">
          FIFA World Cup 2026
        </p>
      </div>

    </div>

    {/* Teams */}
    <div className="text-center mb-8">

      <h3 className="text-3xl font-bold">
        {match.homeTeam.name}
      </h3>

      <div className="my-4 text-2xl font-bold text-yellow-300">
        VS
      </div>

      <h3 className="text-3xl font-bold">
        {match.awayTeam.name}
      </h3>

    </div>

    {/* Match Info */}
    <div className="grid md:grid-cols-2 gap-4 mb-8">

      <div className="bg-white/10 backdrop-blur rounded-2xl p-4">

        <div className="flex items-center gap-2 mb-2">

          <CalendarDays size={18} />

          <span className="text-sm">
            Match Date
          </span>

        </div>

        <p className="font-semibold">
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

      <div className="bg-white/10 backdrop-blur rounded-2xl p-4">

        <div className="flex items-center gap-2 mb-2">

          <Clock3 size={18} />

          <span className="text-sm">
            Kick Off (WIT)
          </span>

        </div>

        <p className="font-semibold">
          {date.toLocaleTimeString(
            "id-ID",
            {
              hour: "2-digit",
              minute: "2-digit",
              timeZone:
                "Asia/Jayapura",
            }
          )}
        </p>

      </div>

    </div>

    {/* Countdown */}
    <div className="grid grid-cols-4 gap-4">

      <div className="bg-white/15 backdrop-blur rounded-2xl p-4 text-center">

        <p className="text-4xl font-bold">
          {timeLeft.days}
        </p>

        <p className="text-sm text-blue-100">
          Hari
        </p>

      </div>

      <div className="bg-white/15 backdrop-blur rounded-2xl p-4 text-center">

        <p className="text-4xl font-bold">
          {timeLeft.hours}
        </p>

        <p className="text-sm text-blue-100">
          Jam
        </p>

      </div>

      <div className="bg-white/15 backdrop-blur rounded-2xl p-4 text-center">

        <p className="text-4xl font-bold">
          {timeLeft.minutes}
        </p>

        <p className="text-sm text-blue-100">
          Menit
        </p>

      </div>

      <div className="bg-white/15 backdrop-blur rounded-2xl p-4 text-center">

        <p className="text-4xl font-bold">
          {timeLeft.seconds}
        </p>

        <p className="text-sm text-blue-100">
          Detik
        </p>

      </div>

    </div>

  </div>

</div>


);
}
