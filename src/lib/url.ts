// Prefixes a public-folder path with Vite's base ('/repo-name/' on GitHub Pages, '/' locally)
export const asset = (path: string) =>
    `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`