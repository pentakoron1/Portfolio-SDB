# 3D models

Place `.glb` or `.gltf` assets here (plus any `.bin` or texture sidecars).

## Hero

Set `heroModelPath` in `src/data/profile.ts`, for example:

```ts
heroModelPath: '/models/hero.glb',
```

## Projects

Set `modelPath` on each entry in `src/data/projects.ts`:

```ts
modelPath: '/models/orbital-link.glb',
```

If `modelPath` is omitted, the card uses a procedural wireframe shape defined by `fallbackShape`.

Wireframe rendering is applied in code — you do not need separate wireframe assets.
