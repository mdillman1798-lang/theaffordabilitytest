import { useState } from 'react';

// Small ? badge that shows a plain-English explanation on hover (desktop) or tap (mobile)
export default function Tooltip({ text }) {
  const [open, setOpen] = useState(false);

  return (
    <span className="relative inline-flex items-center ml-1">
      <button
        type="button"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onClick={() => setOpen((v) => !v)}
        className="w-4 h-4 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-400 hover:text-slate-600
                   text-[10px] font-bold flex items-center justify-center transition-colors flex-shrink-0"
        aria-label="More info"
      >
        ?
      </button>

      {open && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 w-56 pointer-events-none">
          <div className="bg-slate-800 text-white text-xs rounded-xl px-3 py-2.5 shadow-xl leading-relaxed text-center">
            {text}
          </div>
          {/* Arrow */}
          <div className="flex justify-center">
            <div className="w-2 h-2 bg-slate-800 rotate-45 -mt-1" />
          </div>
        </div>
      )}
    </span>
  );
}
