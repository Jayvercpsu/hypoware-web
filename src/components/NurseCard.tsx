import { cn } from "@/lib/utils";
import { IconWithFallback } from "@/components/IconWithFallback";

interface NurseCardProps {
  mood?: "happy" | "sad" | "neutral";
  message?: string;
  className?: string;
  expressive?: boolean;
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
  expressive = false,
}: NurseCardProps) {
  const eyeClass = mood === "sad" ? "h-1.5 w-3" : "h-2 w-2";

  return (
    <div
      className={cn(
        "rounded-3xl border border-sky-200 bg-white/95 p-4 shadow-md",
        className,
      )}
    >
      <div className="flex items-center gap-4">
        {expressive ? (
          <div className="relative h-24 w-24 shrink-0 rounded-full border border-sky-200 bg-sky-100">
            <div className="absolute left-1/2 top-3 h-16 w-16 -translate-x-1/2 rounded-full bg-[#ffd9b5]" />
            <div className="absolute left-1/2 top-0 h-8 w-14 -translate-x-1/2 rounded-t-2xl rounded-b-lg bg-white shadow-sm" />
            <div className="absolute left-1/2 top-2 h-2 w-2 -translate-x-1/2 rounded-[2px] bg-rose-500" />
            <div className="absolute left-[48%] top-2.5 h-1 w-4 -translate-x-1/2 rounded-[2px] bg-rose-500" />
            <div className="absolute left-1/2 top-5 h-4 w-14 -translate-x-1/2 rounded-b-2xl bg-sky-700" />
            <div className="absolute left-1/2 top-9 flex -translate-x-1/2 gap-4">
              <span className={cn("rounded-full bg-slate-800", eyeClass)} />
              <span className={cn("rounded-full bg-slate-800", eyeClass)} />
            </div>
            {mood === "happy" ? (
              <div className="absolute left-1/2 top-14 h-2 w-8 -translate-x-1/2 rounded-b-full border-b-[3px] border-emerald-600" />
            ) : null}
            {mood === "sad" ? (
              <div className="absolute left-1/2 top-[60px] h-2 w-8 -translate-x-1/2 rounded-t-full border-t-[3px] border-rose-500" />
            ) : null}
            {mood === "neutral" ? (
              <div className="absolute left-1/2 top-14 h-2 w-8 -translate-x-1/2 rounded-full bg-sky-700" />
            ) : null}
            <div className="absolute left-1/2 top-[72px] h-7 w-12 -translate-x-1/2 rounded-md border border-sky-200 bg-white" />
          </div>
        ) : (
          <IconWithFallback
            src="/images/nurse.png"
            alt="Nurse"
            label="Nurse"
            className="h-24 w-24 shrink-0 rounded-full border border-sky-200 bg-sky-100 object-cover"
          />
        )}

        <div className={cn("flex-1 rounded-2xl px-4 py-3 text-sm font-medium", moodStyles[mood])}>
          {message}
        </div>
      </div>
    </div>
  );
}
