"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { Project, VideoEmbed } from "@/lib/projects";
import { pillarMeta } from "@/lib/projects";
import ArchitectureDiagram from "./ArchitectureDiagram";

export default function ProjectDetail({ project }: { project: Project }) {
  const meta = pillarMeta[project.pillar];
  const reduce = useReducedMotion();
  const hasArch = project.architecture.nodes.length > 0;
  const hasLinks =
    !!project.links.github ||
    !!project.links.demo ||
    !!project.links.writeup ||
    !!project.links.deck ||
    !!project.links.sheet;

  return (
    <motion.article
      key={project.id}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
      className="max-w-[64ch]"
    >
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[10px] uppercase tracking-eyebrow text-ink-muted">
        <span style={{ color: meta.accent }}>{meta.label.toLowerCase()}</span>
        <span className="text-ink-faint">·</span>
        <span>{project.year}</span>
        <span className="text-ink-faint">·</span>
        <span>{project.context}</span>
      </div>

      <h2 className="mt-3 font-serif text-[34px] font-light leading-[1.12] tracking-[-0.4px] text-ink md:text-[40px]">
        {project.title}
      </h2>

      {project.role && (
        <p className="mt-3 font-mono text-[11px] uppercase tracking-eyebrow text-ink-muted">
          my role &mdash;{" "}
          <span className="text-ink-secondary normal-case">{project.role}</span>
        </p>
      )}

      <Section label="problem">{project.problem}</Section>
      <Section label="what was built">{project.built}</Section>
      <Section label="outcome">{project.outcome}</Section>

      {project.video && <VideoBlock video={project.video} />}

      {hasArch && (
        <div className="mt-10">
          <p className="font-mono text-[11px] uppercase tracking-eyebrow text-ink-muted">
            how it&rsquo;s wired
          </p>
          <div
            className="mt-5 rounded-lg border border-hairline border-border p-4 md:p-6"
            style={{ background: "rgba(251,246,234,0.6)" }}
          >
            <ArchitectureDiagram
              nodes={project.architecture.nodes}
              edges={project.architecture.edges}
            />
          </div>
        </div>
      )}

      <div className="mt-10">
        <p className="font-mono text-[11px] uppercase tracking-eyebrow text-ink-muted">
          stack
        </p>
        <ul className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[12.5px] text-ink">
          {project.stack.map((s, i) => (
            <li key={s} className="inline-flex items-center gap-3">
              <span>{s}</span>
              {i < project.stack.length - 1 && (
                <span className="text-ink-faint" aria-hidden>
                  ·
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>

      {hasLinks && (
        <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-[13px]">
          {project.links.github && (
            <DetailLink href={project.links.github}>github</DetailLink>
          )}
          {project.links.demo && (
            <DetailLink href={project.links.demo}>demo</DetailLink>
          )}
          {project.links.writeup && (
            <DetailLink href={project.links.writeup}>write-up</DetailLink>
          )}
          {project.links.deck && (
            <DetailLink href={project.links.deck}>deck</DetailLink>
          )}
          {project.links.sheet && (
            <DetailLink href={project.links.sheet}>spreadsheet</DetailLink>
          )}
        </div>
      )}
    </motion.article>
  );
}

function Section({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-8">
      <p className="font-mono text-[11px] uppercase tracking-eyebrow text-ink-muted">
        {label}
      </p>
      <p className="mt-2 text-[15px] leading-[1.65] text-ink-secondary">
        {children}
      </p>
    </div>
  );
}

function VideoBlock({ video }: { video: VideoEmbed }) {
  const embedUrl = getEmbedUrl(video);

  return (
    <div className="mt-10">
      <p className="font-mono text-[11px] uppercase tracking-eyebrow text-ink-muted">
        {video.label ?? "video"}
      </p>
      <div className="mt-5 overflow-hidden rounded-lg border border-hairline border-border bg-paper-warm">
        <div className="relative aspect-video w-full">
          {video.type === "mp4" ? (
            <video
              src={video.url}
              controls
              className="h-full w-full object-cover"
            />
          ) : (
            <iframe
              src={embedUrl}
              title={video.label ?? "Project video"}
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
            />
          )}
        </div>
      </div>
    </div>
  );
}

function getEmbedUrl(video: VideoEmbed): string {
  if (video.type === "youtube") {
    const m = video.url.match(
      /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|shorts\/|embed\/))([\w-]+)/,
    );
    const id = m?.[1];
    return id ? `https://www.youtube.com/embed/${id}?rel=0` : video.url;
  }
  if (video.type === "loom") {
    const m = video.url.match(/loom\.com\/(?:share|embed)\/([a-f0-9]+)/i);
    const id = m?.[1];
    return id ? `https://www.loom.com/embed/${id}` : video.url;
  }
  return video.url;
}

function DetailLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel="noreferrer"
      className="inline-flex items-center gap-1.5 text-ink underline decoration-ink/30 underline-offset-[5px] transition hover:decoration-ink"
    >
      {children}
      <span aria-hidden>↗</span>
    </a>
  );
}
