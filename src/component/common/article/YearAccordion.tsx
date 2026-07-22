"use client";

import { useState } from "react";

export default function YearAccordion({
  year,
  children,
}: {
  year: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-6">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        className="group flex w-full items-center gap-3 mb-3 max-w-2xl mx-auto text-left"
      >
        <span className="text-sm font-semibold text-slate-500 transition-colors duration-200 group-hover:text-sky-700">
          {year}年
        </span>
        <div className="flex-1 border-t border-slate-200" />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className={`h-4 w-4 shrink-0 text-slate-400 transition-transform duration-200 group-hover:text-sky-700 ${
            open ? "rotate-180" : ""
          }`}
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.168l3.71-3.938a.75.75 0 1 1 1.08 1.04l-4.25 4.5a.75.75 0 0 1-1.08 0l-4.25-4.5a.75.75 0 0 1 .02-1.06Z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {open && <div className="space-y-2">{children}</div>}
    </div>
  );
}
