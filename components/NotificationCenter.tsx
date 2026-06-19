"use client";

import { useEffect, useState } from "react";
import {
  Bell,
  CalendarDays,
  Clock3,
} from "lucide-react";

import { teamFlags } from "@/lib/teamFlags";

export default function NotificationCenter() {
  const [alerts, setAlerts] = useState<any[]>([]);

  useEffect(() => {
    async function loadAlerts() {
      const res = await fetch(
        "/api/favorite-alerts"
      );

      const data = await res.json();

      setAlerts(data);
    }

    loadAlerts();
  }, []);

  return (
    <div
      className="
      bg-white/90
      backdrop-blur-md
      rounded-3xl
      shadow-lg
      p-6
      "
    >

      {/* HEADER */}
      <div className="flex items-center gap-3 mb-6">

        <div className="bg-yellow-100 p-3 rounded-2xl">
          <Bell className="text-yellow-600" />
        </div>

        <div>
          <h2 className="text-xl font-bold">
            Match Alerts
          </h2>

          <p className="text-sm text-gray-500">
            Favorite Team Notifications
          </p>
        </div>

      </div>

      {/* ALERTS */}
      <div className="space-y-4">

        {alerts.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No upcoming alerts
          </div>
        )}

        {alerts.map((match) => {

          const date = new Date(
            match.utcDate
          );

          return (
            <a
              key={match.id}
              href={`/match/${match.id}`}
              className="
               block
    rounded-3xl
    p-5
    bg-gradient-to-r
    from-blue-900
    via-blue-700
    to-cyan-600
    text-white
    shadow-lg
    hover:shadow-2xl
    hover:scale-[1.02]
    transition-all
              "
            >

              <div className="flex justify-between items-start">

                <div>

                <h3 className="font-bold text-white text-lg">

                    {teamFlags[
                      match.homeTeam.name
                    ] || "⚽"}{" "}

                    {match.homeTeam.name}

                  </h3>

                  <p className="text-blue-200 text-xs my-1 font-semibold">
                    VS
                  </p>

                  <p className="font-semibold text-white">

                    {teamFlags[
                      match.awayTeam.name
                    ] || "⚽"}{" "}

                    {match.awayTeam.name}

                  </p>

                </div>

                <span
                  className="
                  bg-white/20
                  backdrop-blur-md
                  text-white
                  text-xs
                  px-3
                  py-1
                  rounded-full
                  font-semibold
                "
                >
                  🏆 UPCOMING
                </span>

              </div>

              <div className="mt-4 space-y-2 border-t border-white/20 pt-3">

                <div className="flex items-center gap-2 text-sm text-blue-100">

                  <CalendarDays size={15} />

                  {date.toLocaleDateString(
                    "id-ID",
                    {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    }
                  )}

                </div>

                <div className="flex items-center gap-2 text-sm text-blue-100">

                  <Clock3 size={15} />

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

                </div>

              </div>

            </a>
          );
        })}

      </div>

    </div>
  );
}