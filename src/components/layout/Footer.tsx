import { profile } from '../../data/profile'

const year = new Date().getFullYear()

export function Footer() {

  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-6 text-sm text-muted md:flex-row md:items-center md:justify-between">
        <p className="font-mono text-xs">
          © {year} {profile.name}. All systems nominal.
        </p>
        <p className="font-mono text-xs tracking-wide">Coordinates locked · v1.0</p>
      </div>
    </footer>
  )
}
