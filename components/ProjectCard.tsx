"use client";

import type { Project } from "@/lib/projects";
import { pillarMeta } from "@/lib/projects";

type Props = {
  project: Project;
  active: boolean;
  onClick: () => void;
};

export default function ProjectListItem({ project, active, onClick }: Props) {
  const meta = pillarMeta[project.pillar];

  return (
    <button
      type="button"
      onClick={onClick}
      aria-current={active ? "true" : undefined}
      className="group block w-full min-w-[210px] py-4 pl-4 pr-3 text-left transition md:min-w-0 md:py-5"
      style={{
        borderLeft: active
          ? `2px solid ${meta.accent}`
          : "2px solid transparent",
        backgroundColor: active ? "rgba(155, 122, 229, 0.04)" : "transparent",
      }}
    >
      <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-eyebrow text-ink-muted">
        <span
          className="inline-block h-1.5 w-1.5 rounded-full"
          style={{ background: meta.accent }}
          aria-hidden
        />
        <span>{project.year}</span>
      </div>

      <h3
        className={`mt-1.5 text-[14px] leading-[1.3] transition ${
          active
            ? "font-medium text-ink"
            : "font-light text-ink-secondary group-hover:text-ink"
        }`}
      >
        {project.title}
      </h3>

      <span
        className="mt-1.5 inline-block font-mono text-[10px] uppercase tracking-eyebrow"
        style={{ color: meta.accent, opacity: active ? 1 : 0.55 }}
      >
        {meta.label.toLowerCase()}
      </span>

      {project.tags && project.tags.length > 0 && (
        <div className="mt-2.5 flex flex-wrap gap-1">
          {project.tags.map((tag) => (
            <span
              key={tag.label}
              className="inline-block rounded-full px-2 py-1 text-[9px] font-medium uppercase tracking-label"
              style={{
                backgroundColor: `${tag.color}20`,
                color: tag.color,
                opacity: active ? 1 : 0.6,
              }}
            >
              {tag.label}
            </span>
          ))}
        </div>
      )}
    </button>
  );
}
