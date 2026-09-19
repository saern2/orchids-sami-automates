import { Phone, CalendarCheck, UserPlus } from "lucide-react";

/**
 * A short, looping illustration of what the agents do: a call comes in, the
 * agent answers, books the appointment and updates the CRM. Pure CSS
 * keyframes (see .demo-step in globals.css), no timers, no JavaScript. With
 * prefers-reduced-motion the finished state is shown without animation.
 *
 * Everything shown is an example; no real customer data.
 */
const HeroDemo = () => {
  return (
    <div
      className="demo-card relative w-full max-w-[420px] mx-auto lg:mx-0 rounded-[24px] sm:rounded-[28px] border border-white/10 bg-[#0B0B10]/90 backdrop-blur-xl shadow-[0_30px_80px_-30px_rgba(139,92,246,0.35)] p-4 sm:p-6 text-left"
      aria-label="Example of a call handled by an AI calling agent"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-white/50">
          <span className="demo-live w-1.5 h-1.5 rounded-full bg-emerald-400" />
          Example call
        </div>
        <span className="text-[11px] font-semibold text-white/35 tabular-nums">Thu · 6:42 PM</span>
      </div>

      {/* Incoming call */}
      <div className="demo-step demo-step-1 flex items-center gap-3 rounded-2xl bg-white/[0.04] border border-white/[0.06] px-4 py-3">
        <div className="w-9 h-9 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center shrink-0">
          <Phone className="w-4 h-4 text-primary" />
        </div>
        <div className="min-w-0">
          <div className="text-sm font-bold text-white whitespace-nowrap">Incoming call</div>
          <div className="text-xs text-white/50 tabular-nums whitespace-nowrap">+1 (415) 555-0132</div>
        </div>
        <div className="ml-auto pl-2 text-[11px] font-bold text-emerald-400 whitespace-nowrap">
          <span className="demo-answered-late">Answered<span className="hidden sm:inline"> · 00:01</span></span>
        </div>
      </div>

      {/* Conversation */}
      <div className="mt-4 space-y-2.5">
        <p className="demo-step demo-step-2 demo-bubble demo-bubble-caller">
          Hi, do you have anything on Thursday afternoon?
        </p>
        <p className="demo-step demo-step-3 demo-bubble demo-bubble-agent">
          Yes. Thursday at 2:30 or 4:00. Which works better for you?
        </p>
        <p className="demo-step demo-step-4 demo-bubble demo-bubble-caller">
          2:30, please.
        </p>
        <p className="demo-step demo-step-5 demo-bubble demo-bubble-agent">
          Booked for Thursday at 2:30. A confirmation is on its way to your phone.
        </p>
      </div>

      {/* Outcomes */}
      <div className="mt-4 space-y-2">
        <div className="demo-step demo-step-6 flex items-center gap-3 rounded-xl bg-emerald-400/[0.06] border border-emerald-400/20 px-3.5 py-2.5">
          <CalendarCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <div className="text-xs text-white/80 min-w-0 truncate">
            <span className="font-bold text-white">Thu 2:30 PM</span> · New patient consult · Booked
          </div>
        </div>
        <div className="demo-step demo-step-7 flex items-center gap-3 rounded-xl bg-white/[0.04] border border-white/[0.06] px-3.5 py-2.5">
          <UserPlus className="w-4 h-4 text-secondary shrink-0" />
          <div className="text-xs text-white/80 min-w-0 truncate">
            <span className="font-bold text-white">Contact added</span> · Ayesha K. · Source: phone · CRM
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroDemo;
