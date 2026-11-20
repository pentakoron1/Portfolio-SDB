import { useEffect, useRef } from 'react'
import ForceGraph, { type NodeObject } from 'force-graph'
import { interestTree } from '../../data/interests'
import { Section } from '../layout/Section'

type NodeType = 'field' | 'hobby' | 'tool'
type GNode = NodeObject & { id: string; type: NodeType; r: number }
type GLink = { source: string | GNode; target: string | GNode }

const LABEL_COLORS: Record<NodeType, string> = {
    field: '#e3e3ea',
    hobby: '#c0c0c6',
    tool: '#919191',
}
const COLORS: Record<NodeType, string> = { field: '#ff8a1f', hobby: '#f4f4f4', tool: '#a45cff' }
const BASE: Record<NodeType, number> = { field: 4, hobby: 3, tool: 3 } //Dot size
const LINK_DIST = { field: 85, tool: 55 }
const CIRCLE_R = 230 // radius of the boundary circle, in graph units
const SHOW_TOOL_LABELS = true // false = only show tool names while hovering

function buildData() {
    const nodes = new Map<string, GNode>()
    const links: GLink[] = []
    const add = (id: string, type: NodeType) => {
        if (!nodes.has(id)) nodes.set(id, { id, type, r: 0 })
    }
    for (const [field, hobbies] of Object.entries(interestTree)) {
        add(field, 'field')
        for (const [hobby, tools] of Object.entries(hobbies)) {
            add(hobby, 'hobby')
            links.push({ source: field, target: hobby })
            for (const tool of tools) {
                add(tool, 'tool')
                links.push({ source: hobby, target: tool })
            }
        }
    }
    const neighbors = new Map<string, Set<string>>([...nodes.keys()].map((k) => [k, new Set()]))
    links.forEach((l) => {
        neighbors.get(l.source as string)!.add(l.target as string)
        neighbors.get(l.target as string)!.add(l.source as string)
    })
    nodes.forEach((n) => {
        n.r = BASE[n.type] + neighbors.get(n.id)!.size * 0.6
    })
    return { nodes: [...nodes.values()], links, neighbors }
}

// Keeps every node inside a circle centered on (0, 0)
function forceCircle(radius: number) {
    let nodes: GNode[] = []
    const force = () => {
        for (const n of nodes) {
            const x = n.x ?? 0
            const y = n.y ?? 0
            const d = Math.hypot(x, y)
            const max = radius - n.r
            if (d > max) {
                const k = max / d
                n.x = x * k
                n.y = y * k
                n.vx = (n.vx ?? 0) * 0.5
                n.vy = (n.vy ?? 0) * 0.5
            }
        }
    }
    force.initialize = (ns: GNode[]) => {
        nodes = ns
    }
    return force
}

export function InterestsGraph() {
    const boxRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const el = boxRef.current
        if (!el) return

        const { nodes, links, neighbors } = buildData()
        let hover: GNode | null = null
        const lit = (id: string) => !hover || id === hover.id || neighbors.get(hover.id)!.has(id)

        const graph = new ForceGraph(el)
            .backgroundColor('rgba(0,0,0,0)')
            .graphData({ nodes, links })
            .nodeRelSize(1)
            .nodeVal((n) => (n as GNode).r ** 2)
            .linkWidth(0.8)
            .linkColor((l) => {
                const { source, target } = l as unknown as { source: GNode; target: GNode }
                const on = !hover || source.id === hover.id || target.id === hover.id
                return on ? 'rgba(255,255,255,0.28)' : 'rgba(255,255,255,0.05)'
            })
            // faint outline of the boundary circle
            /*.onRenderFramePre((ctx) => {
                ctx.beginPath()
                ctx.arc(0, 0, CIRCLE_R, 0, 2 * Math.PI)
                ctx.strokeStyle = 'rgba(255,255,255,0.08)'
                ctx.lineWidth = 1
                ctx.stroke()
            })*/
            .nodeCanvasObject((node, ctx, scale) => {
                const n = node as GNode
                const on = lit(n.id)
                ctx.globalAlpha = on ? 1 : 0.15
                ctx.beginPath()
                ctx.arc(n.x ?? 0, n.y ?? 0, n.r, 0, 2 * Math.PI)
                ctx.fillStyle = COLORS[n.type]
                ctx.fill()

                const show = on && (n.type !== 'tool' || SHOW_TOOL_LABELS || hover !== null)
                if (show) {
                    const size = (n.type === 'field' ? 15 : n.type === 'hobby' ? 12 : 11) / scale
                    ctx.font = `${n.type === 'field' ? '600 ' : ''}${size}px system-ui, sans-serif`
                    ctx.textAlign = 'center'
                    ctx.textBaseline = 'top'
                    ctx.fillStyle = LABEL_COLORS[n.type]
                    ctx.fillText(n.id, n.x ?? 0, (n.y ?? 0) + n.r + 2 / scale)
                }
                ctx.globalAlpha = 1;
            })
            .nodePointerAreaPaint((node, color, ctx) => {
                const n = node as GNode
                ctx.fillStyle = color
                ctx.beginPath()
                ctx.arc(n.x ?? 0, n.y ?? 0, n.r + 3, 0, 2 * Math.PI)
                ctx.fill()
            })
            .onNodeHover((n) => {
                hover = (n as GNode | null) ?? null
                el.style.cursor = n ? 'pointer' : 'default'
            })
            // dragged nodes are pinned by the mouse, so clamp them here as well
            .onNodeDrag((node) => {
                const n = node as GNode
                const x = n.fx ?? n.x ?? 0
                const y = n.fy ?? n.y ?? 0
                const d = Math.hypot(x, y)
                const max = CIRCLE_R - n.r
                if (d > max) {
                    n.fx = n.x = (x * max) / d
                    n.fy = n.y = (y * max) / d
                }
            })
            .enableZoomInteraction(false)
            .enablePanInteraction(false)
            .cooldownTicks(200)

        graph.d3Force('circle', forceCircle(CIRCLE_R) as never)
        graph.d3Force('charge')?.strength(-90).distanceMax(120)
        graph.d3Force('link')?.distance((l: GLink) =>
            (l.source as GNode).type === 'field' ? LINK_DIST.field : LINK_DIST.tool,
        )

        // fixed view: the whole circle always fits the box, centered
        const applyView = () => {
            const w = el.clientWidth
            const h = el.clientHeight
            graph.width(w).height(h)
            graph.centerAt(0, 0)
            graph.zoom(Math.min(w, h) / (2 * (CIRCLE_R + 16)))
        }
        applyView()

        el.querySelectorAll('canvas').forEach((c) => (c.style.touchAction = 'pan-y'))

        const ro = new ResizeObserver(applyView)
        ro.observe(el)

        return () => {
            ro.disconnect()
            graph._destructor()
        }
    }, [])

    return (
        <Section id="interests" eyebrow="Network" title="Interests">
            <div className="relative">
                <div ref={boxRef} className="h-[75vh] min-h-115 w-full" />
                <ul className="pointer-events-none absolute left-0 top-0 space-y-1.5 font-mono text-xs text-muted">
                    <li><span className="mr-2 inline-block size-2.5 rounded-full bg-[#ff8a1f]" />Field</li>
                    <li><span className="mr-2 inline-block size-2.5 rounded-full bg-[#f4f4f4]" />Hobby</li>
                    <li><span className="mr-2 inline-block size-2.5 rounded-full bg-[#a45cff]" />Tool</li>
                </ul>
                <p className="pointer-events-none absolute bottom-0 right-0 font-mono text-xs text-muted">
                    Drag nodes · hover to highlight
                </p>
            </div>
        </Section>
    )
}