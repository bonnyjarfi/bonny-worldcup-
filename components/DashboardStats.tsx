import {
  Trophy,
  CalendarDays,
  CheckCircle,
  Users,
  } from "lucide-react";
  
  export default function DashboardStats() {
  const stats = [
  {
  title: "Favorite Teams",
  value: 9,
  icon: Trophy,
  color: "from-yellow-500 to-orange-500",
  },
  {
  title: "Groups",
  value: 12,
  icon: Users,
  color: "from-blue-500 to-cyan-500",
  },
  {
  title: "Upcoming Matches",
  value: 24,
  icon: CalendarDays,
  color: "from-green-500 to-emerald-500",
  },
  {
  title: "Finished Matches",
  value: 11,
  icon: CheckCircle,
  color: "from-purple-500 to-pink-500",
  },
  ];
  
  return ( <div className="grid grid-cols-2 gap-4">
  
  ```
    {stats.map((item) => {
      const Icon = item.icon;
  
      return (
        <div
          key={item.title}
          className="
            relative
            overflow-hidden
            rounded-3xl
            shadow-lg
            bg-white/90
            backdrop-blur-md
            p-5
            hover:shadow-xl
            hover:-translate-y-1
            transition-all
          "
        >
  
          {/* Background Gradient */}
          <div
            className={`
              absolute
              top-0
              left-0
              w-full
              h-1
              bg-gradient-to-r
              ${item.color}
            `}
          />
  
          <div className="flex justify-between items-start">
  
            <div>
  
            <p className="text-sm text-gray-500">
                {item.title}
              </p>
  
              <p className="text-4xl font-bold mt-2 text-slate-800">
                {item.value}
              </p>
  
            </div>
  
            <div
              className={`
                bg-gradient-to-r
                ${item.color}
                text-white
                p-3
                rounded-2xl
              `}
            >
              <Icon size={22} />
            </div>
  
          </div>
  
        </div>
      );
    })}
  
  </div>

  
  );
  }
  