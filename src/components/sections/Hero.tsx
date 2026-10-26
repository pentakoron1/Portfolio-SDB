import { Suspense, lazy } from 'react'
import { profile } from '../../data/profile'
import { Model } from '../three/Model'
import { PlaceholderMesh } from '../three/PlaceholderMesh'

const HeroCanvas = lazy(() => import('../three/HeroCanvas'))

export function Hero() {
  return (
    <section
      id="top"
      className="relative scroll-mt-24 overflow-hidden border-b border-border py-16 md:py-24"
    >
      <div className="mx-auto grid max-w-5xl items-center gap-12 px-6 md:grid-cols-2 md:gap-16">
        <div className="relative z-10 space-y-6">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent">Transmission</p>
          <h1 className="text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
            <span className="text-gradient-accent">{profile.name}</span>
          </h1>
          <p className="font-mono text-sm text-muted">{profile.role}</p>
          <p className="max-w-md text-lg text-text/90">{profile.tagline}</p>
          <div className="flex flex-wrap gap-4 pt-2">
            <a
              href="#projects"
              className="hairline-border bg-accent-dim px-5 py-2.5 font-mono text-xs uppercase tracking-wider text-accent transition hover:bg-accent/20"
            >
              View projects
            </a>
            <a
              href="#contact"
              className="px-5 py-2.5 font-mono text-xs uppercase tracking-wider text-muted transition hover:text-accent"
            >
              Contact
            </a>
          </div>
        </div>
        <div className="relative aspect-square w-full max-w-md justify-self-center md:max-w-none">
          <div className="hairline-border absolute inset-0 bg-bg-elevated/40" />
          <Suspense
            fallback={<div className="aspect-square w-full animate-pulse bg-white/5" aria-hidden />}
          >
            <HeroCanvas>
              {profile.heroModelPath ? (
                <Model path={profile.heroModelPath} />
              ) : (
                <PlaceholderMesh />
              )}
            </HeroCanvas>
          </Suspense>
        </div>
      </div>
    </section>
  )
}
