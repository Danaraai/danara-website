"use client";

import { useMemo } from "react";
import type { ArchEdge, ArchNode, NodeKind } from "@/lib/projects";

const KIND_STYLE: Record<
  NodeKind,
  { fill: string; stroke: string; label: string }
> = {
  llm: { fill: "#E5DBEF", stroke: "#9479B5", label: "LLM" },
  db: { fill: "#D8E6DD", stroke: "#7AAB9D", label: "DB" },
  api: { fill: "#F0DCE2", stroke: "#BD8AA0", label: "API" },
  ui: { fill: "#EBE4D5", stroke: "#A89E94", label: "UI" },
  agent: { fill: "#D6C8E8", stroke: "#7E63A0", label: "Agent" },
};

const EDGE_COLOR = "#BD8AA0";

type Pos = { col: number; row: number };

function layout(nodes: ArchNode[], edges: ArchEdge[]): Map<string, Pos> {
  const incoming = new Map<string, string[]>();
  nodes.forEach((n) => incoming.set(n.id, []));
  edges.forEach((e) => incoming.get(e.to)?.push(e.from));

  // Iteratively assign columns: depth from any source
  const col = new Map<string, number>();
  nodes.forEach((n) => col.set(n.id, 0));
  for (let i = 0; i < nodes.length + 1; i++) {
    let changed = false;
    for (const n of nodes) {
      const preds = incoming.get(n.id) ?? [];
      if (preds.length === 0) continue;
      const c = Math.max(...preds.map((p) => col.get(p) ?? 0)) + 1;
      if (c !== col.get(n.id)) {
        col.set(n.id, c);
        changed = true;
      }
    }
    if (!changed) break;
  }

  // Group by column → assign rows in column order
  const byCol = new Map<number, string[]>();
  for (const n of nodes) {
    const c = col.get(n.id) ?? 0;
    if (!byCol.has(c)) byCol.set(c, []);
    byCol.get(c)!.push(n.id);
  }

  const pos = new Map<string, Pos>();
  for (const [c, ids] of byCol) {
    ids.forEach((id, idx) => pos.set(id, { col: c, row: idx }));
  }
  return pos;
}

const NODE_W = 130;
const NODE_H = 44;
const COL_GAP = 56;
const ROW_GAP = 18;
const PAD = 16;

export default function ArchitectureDiagram({
  nodes,
  edges,
}: {
  nodes: ArchNode[];
  edges: ArchEdge[];
}) {
  const { positions, width, height } = useMemo(() => {
    const pos = layout(nodes, edges);
    let maxCol = 0;
    let maxRowByCol = new Map<number, number>();
    pos.forEach((p) => {
      maxCol = Math.max(maxCol, p.col);
      maxRowByCol.set(
        p.col,
        Math.max(maxRowByCol.get(p.col) ?? 0, p.row),
      );
    });
    const maxRow = Math.max(0, ...Array.from(maxRowByCol.values()));
    const w = (maxCol + 1) * NODE_W + maxCol * COL_GAP + PAD * 2;
    const h = (maxRow + 1) * NODE_H + maxRow * ROW_GAP + PAD * 2;
    return { positions: pos, width: w, height: h };
  }, [nodes, edges]);

  const xy = (id: string) => {
    const p = positions.get(id)!;
    return {
      x: PAD + p.col * (NODE_W + COL_GAP),
      y: PAD + p.row * (NODE_H + ROW_GAP),
      cx: PAD + p.col * (NODE_W + COL_GAP) + NODE_W / 2,
      cy: PAD + p.row * (NODE_H + ROW_GAP) + NODE_H / 2,
    };
  };

  return (
    <div className="w-full overflow-x-auto">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width="100%"
        height={height}
        className="block"
      >
        <defs>
          <marker
            id="arrow"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#BD8AA0" />
          </marker>
        </defs>

        {edges.map((e, i) => {
          const a = xy(e.from);
          const b = xy(e.to);
          const x1 = a.x + NODE_W;
          const y1 = a.cy;
          const x2 = b.x;
          const y2 = b.cy;
          const mx = (x1 + x2) / 2;
          const d = `M ${x1} ${y1} C ${mx} ${y1}, ${mx} ${y2}, ${x2} ${y2}`;
          return (
            <g key={`e-${i}`}>
              <path
                d={d}
                fill="none"
                stroke="#BD8AA0"
                strokeWidth={1}
                strokeOpacity={0.55}
                markerEnd="url(#arrow)"
              />
              {e.label && (
                <text
                  x={mx}
                  y={(y1 + y2) / 2 - 6}
                  fontSize={9}
                  fill="#6B5F75"
                  textAnchor="middle"
                  fontFamily="ui-sans-serif, system-ui"
                >
                  {e.label}
                </text>
              )}
            </g>
          );
        })}

        {nodes.map((n) => {
          const p = xy(n.id);
          const s = KIND_STYLE[n.kind];
          return (
            <g key={n.id} transform={`translate(${p.x},${p.y})`}>
              <rect
                width={NODE_W}
                height={NODE_H}
                rx={8}
                fill={s.fill}
                stroke={s.stroke}
                strokeWidth={1}
              />
              <text
                x={NODE_W / 2}
                y={NODE_H / 2 + 1}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize={11}
                fontWeight={500}
                fill="#2A2233"
                fontFamily="ui-sans-serif, system-ui"
              >
                {n.label}
              </text>
              <text
                x={8}
                y={12}
                fontSize={8}
                fill={s.stroke}
                opacity={0.85}
                fontFamily="ui-sans-serif, system-ui"
                style={{ textTransform: "uppercase", letterSpacing: "0.08em" }}
              >
                {s.label}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Legend */}
      <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1.5 text-[10px] text-ink-secondary">
        {Object.entries(KIND_STYLE).map(([k, s]) => (
          <span key={k} className="inline-flex items-center gap-1.5">
            <span
              className="inline-block h-2.5 w-2.5 rounded-sm"
              style={{ background: s.fill, border: `1px solid ${s.stroke}` }}
            />
            {s.label}
          </span>
        ))}
      </div>
    </div>
  );
}
