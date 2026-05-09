"use client";

import { useEffect, useMemo, useState } from "react";
import ProjectListItem from "./ProjectCard";
import ProjectDetail from "./ProjectDetail";
import Reveal from "./Reveal";
import { projects, type Pillar } from "@/lib/projects";

type Filter = "all" | Pillar;

const filters: { id: Filter; label: string }[] = [
  { id: "all", label: "everything" },
  { id: "automation", label: "automation" },
  { id: "apps", label: "apps" },
];

const HASH_RE = /^#\/work\/([\w-]+)$/;

export default function ProjectsSection() {
  const [filter, setFilter] = useState<Filter>("all");
  const [selectedId, setSelectedId] = useState<string>(projects[0].id);

  const visible = useMemo(
    () =>
      filter === "all" ? projects : projects.filter((p) => p.pillar === filter),
    [filter],
  );

  // Read hash on mount + listen for changes (deep-link support)
  useEffect(() => {
    const sync = () => {
      const m = window.location.hash.match(HASH_RE);
      if (m && projects.find((p) => p.id === m[1])) {
        setSelectedId(m[1]);
      }
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  // Keep selection valid when filter narrows it out of the visible list
  useEffect(() => {
    if (visible.length && !visible.find((p) => p.id === selectedId)) {
      setSelectedId(visible[0].id);
    }
  }, [visible, selectedId]);

  const handleSelect = (id: string) => {
    setSelectedId(id);
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", `#/work/${id}`);
    }
  };

  const selected =
    visible.find((p) => p.id === selectedId) ?? visible[0] ?? projects[0];

  return (
    <section id="work" className="relative pb-32 pt-2 md:pb-40 md:pt-3">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <div className="mb-8 h-px w-16 bg-border" aria-hidden />

        <Reveal>
          <div className="mb-10 flex flex-wrap items-center gap-x-1 gap-y-2 font-mono text-[12.5px]">
            {filters.map((f, i) => {
              const active = filter === f.id;
              return (
                <span key={f.id} className="inline-flex items-center">
                  <button
                    type="button"
                    onClick={() => setFilter(f.id)}
                    className={`px-2 py-1 transition ${
                      active
                        ? "text-ink underline decoration-ink/40 underline-offset-[5px]"
                        : "text-ink-muted hover:text-ink-secondary"
                    }`}
                  >
                    {f.label}
                  </button>
                  {i < filters.length - 1 && (
                    <span className="text-ink-faint" aria-hidden>
                      /
                    </span>
                  )}
                </span>
              );
            })}
          </div>
        </Reveal>

        {/* Master-detail */}
        <div className="grid grid-cols-12 gap-x-8 gap-y-8 lg:gap-x-12">
          {/* Left rail — vertical on md+, horizontal scroll on mobile */}
          <nav
            aria-label="Projects"
            className="col-span-12 md:col-span-4 lg:col-span-3"
          >
            <div className="lg:sticky lg:top-24">
              <ul
                className="no-scrollbar flex gap-2 overflow-x-auto md:flex-col md:gap-0 md:overflow-visible"
                role="list"
              >
                {visible.map((p) => (
                  <li
                    key={p.id}
                    className="md:border-b md:border-hairline md:border-border md:last:border-b-0"
                  >
                    <ProjectListItem
                      project={p}
                      active={p.id === selected.id}
                      onClick={() => handleSelect(p.id)}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          {/* Right pane — detail */}
          <div className="col-span-12 md:col-span-8 lg:col-span-9">
            {selected && <ProjectDetail project={selected} />}
          </div>
        </div>
      </div>
    </section>
  );
}
