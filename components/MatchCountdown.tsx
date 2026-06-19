"use client";

import { useEffect, useState } from "react";

export default function MatchCountdown() {
  const targetDate = new Date(
    "2026-06-18T02:00:00+09:00"
  );

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = Date.now();

      const distance =
        targetDate.getTime() - now;

      if (distance <= 0) return;

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
          (distance % (1000 * 60)) / 1000
        ),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-lg p-8 mt-6">

      <h3 className="text-2xl font-bold mb-6">
        ⏳ Kickoff Countdown
      </h3>

      <div className="grid grid-cols-4 gap-4">

        <div className="bg-blue-50 rounded-2xl p-4 text-center">
          <p className="text-3xl font-bold text-blue-700">
            {timeLeft.days}
          </p>
          <p>Hari</p>
        </div>

        <div className="bg-blue-50 rounded-2xl p-4 text-center">
          <p className="text-3xl font-bold text-blue-700">
            {timeLeft.hours}
          </p>
          <p>Jam</p>
        </div>

        <div className="bg-blue-50 rounded-2xl p-4 text-center">
          <p className="text-3xl font-bold text-blue-700">
            {timeLeft.minutes}
          </p>
          <p>Menit</p>
        </div>

        <div className="bg-blue-50 rounded-2xl p-4 text-center">
          <p className="text-3xl font-bold text-blue-700">
            {timeLeft.seconds}
          </p>
          <p>Detik</p>
        </div>

      </div>

    </div>
  );
}