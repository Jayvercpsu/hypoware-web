import { cn } from "@/lib/utils";
import { IconWithFallback } from "@/components/IconWithFallback";

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
  return (
    <div
      className={cn(
        "rounded-3xl border border-sky-200 bg-white/95 p-4 shadow-md",
        className,
      )}
    >
      <div className="flex items-center gap-4">
        <IconWithFallback
          src="/images/nurse.png"
          alt="Nurse"
          label="Nurse"
          className="h-24 w-24 shrink-0 rounded-full border border-sky-200 bg-sky-100 object-cover"
        />

        <div className={cn("flex-1 rounded-2xl px-4 py-3 text-sm font-medium", moodStyles[mood])}>
          {message}
        </div>
      </div>
    </div>
  );
}
