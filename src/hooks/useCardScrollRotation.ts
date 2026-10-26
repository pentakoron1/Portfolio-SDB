import { useMotionValueEvent, useScroll, useTransform } from 'framer-motion'
import { useState, type RefObject } from 'react'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

const STATIC_ROTATION = 0.4

type Options = {
  turns?: number
}

export function useCardScrollRotation(
  targetRef: RefObject<HTMLElement | null>,
  options: Options = {},
): number {
  const { turns = 0.75 } = options
  const reduced = usePrefersReducedMotion()
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start end', 'end start'],
  })
  const rotationMotion = useTransform(
    scrollYProgress,
    [0, 1],
    [0, Math.PI * 2 * turns],
  )
  const [rotationY, setRotationY] = useState(reduced ? STATIC_ROTATION : 0)

  useMotionValueEvent(rotationMotion, 'change', (value) => {
    if (!reduced) setRotationY(value)
  })

  return reduced ? STATIC_ROTATION : rotationY
}
