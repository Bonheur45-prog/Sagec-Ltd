import { useRef, useState, useEffect } from 'react'

/**
 * Returns a [ref, inView] tuple.
 * inView becomes true once the element enters the viewport
 * and stays true (fires only once — ideal for count-up animations).
 *
 * @param {number} threshold - How much of the element must be visible (0–1)
 */
export function useInView(threshold = 0.3) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect() // fire once, then stop observing
        }
      },
      { threshold }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return [ref, inView]
}