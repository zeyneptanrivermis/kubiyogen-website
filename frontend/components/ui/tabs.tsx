"use client";

import { useState } from "react";

type Tab = {
  key: string;
  label: string;
  content: React.ReactNode;
};

type TabsProps = {
  tabs: Tab[];
  defaultTab?: string;
};

export function Tabs({ tabs, defaultTab }: TabsProps) {
  const [active, setActive] = useState(defaultTab ?? tabs[0]?.key);

  return (
    <div>
      <div role="tablist" className="flex gap-1 border-b border-line">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            role="tab"
            aria-selected={active === tab.key}
            onClick={() => setActive(tab.key)}
            className={`px-4 py-2.5 text-sm font-semibold transition border-b-2 -mb-px ${
              active === tab.key
                ? "border-brand-700 text-brand-700"
                : "border-transparent text-slate-500 hover:text-ink"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div role="tabpanel" className="pt-4">
        {tabs.find((t) => t.key === active)?.content}
      </div>
    </div>
  );
}
