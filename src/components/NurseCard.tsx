import { cn } from "@/lib/utils";

interface NurseCardProps {
  mood?: "happy" | "sad" | "neutral";
  message?: string;
  className?: string;
}

const moodStyles = {
  happy: "bg-emerald-100 text-emerald-900",
  sad: "bg-rose-100 text-rose-900",
  neutral: "bg-sky-100 text-sky-900",
};

export function NurseCard({
  mood = "neutral",
  message = "I am here to guide you step by step.",
  className,
}: NurseCardProps) {
  const eyeClass = mood === "sad" ? "h-1 w-3" : "h-2 w-2";

  return (
    <div
      className={cn(
        "rounded-3xl border border-sky-200 bg-white/95 p-4 shadow-md",
        className,
      )}
    >
      <div className="flex items-center gap-4">
        <div className="relative h-24 w-24 shrink-0 rounded-full bg-sky-100">
          <div className="absolute left-1/2 top-3 h-16 w-16 -translate-x-1/2 rounded-full bg-[#ffd9b5]" />
          <div className="absolute left-1/2 top-1 h-8 w-14 -translate-x-1/2 rounded-b-3xl rounded-t-xl bg-sky-700" />
          <div className="absolute left-1/2 top-9 flex -translate-x-1/2 gap-4">
            <span className={cn("rounded-full bg-slate-800", eyeClass)} />
            <span className={cn("rounded-full bg-slate-800", eyeClass)} />
          </div>
          <div
            className={cn(
              "absolute left-1/2 top-14 h-2 w-8 -translate-x-1/2 rounded-full",
              mood === "happy" && "bg-emerald-600",
              mood === "sad" && "bg-rose-500",
              mood === "neutral" && "bg-sky-700",
            )}
          />
          <div className="absolute left-1/2 top-18 h-6 w-12 -translate-x-1/2 rounded-md bg-white" />
        </div>

        <div className={cn("flex-1 rounded-2xl px-4 py-3 text-sm font-medium", moodStyles[mood])}>
          {message}
        </div>
      </div>
    </div>
  );
}
