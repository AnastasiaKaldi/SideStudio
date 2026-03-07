import { useState, useEffect, useCallback, useRef } from 'react'
import './CustomCursor.css'

function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isLight, setIsLight] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const trailRef = useRef({ x: 0, y: 0 })
  const trailElRef = useRef(null)
  const rafRef = useRef(null)

  const checkBackground = useCallback((x, y) => {
    const elements = document.elementsFromPoint(x, y)
    for (const el of elements) {
      const bg = window.getComputedStyle(el).backgroundColor
      if (bg && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent') {
        const match = bg.match(/\d+/g)
        if (match) {
          const [r, g, b] = match.map(Number)
          const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
          setIsLight(luminance < 0.4)
          return
        }
      }
    }
    setIsLight(false)
  }, [])

  useEffect(() => {
    const animate = () => {
      const trail = trailRef.current
      const el = trailElRef.current
      if (el) {
        trail.x += (position.x - trail.x) * 0.15
        trail.y += (position.y - trail.y) * 0.15
        el.style.left = `${trail.x}px`
        el.style.top = `${trail.y}px`
      }
      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [position])

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY })
      setIsVisible(true)
      checkBackground(e.clientX, e.clientY)

      const target = e.target
      const clickable = target.closest('a, button, [role="button"], input, textarea, [onclick]')
      setIsHovering(!!clickable)
    }

    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
    }
  }, [checkBackground])

  if (!isVisible) return null

  const colorClass = isLight ? 'custom-cursor--light' : ''
  const hoverClass = isHovering ? 'custom-cursor--hover' : ''

  return (
    <>
      <div
        className={`custom-cursor ${colorClass} ${hoverClass}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      />
      <div
        ref={trailElRef}
        className={`custom-cursor-trail ${colorClass}`}
        style={{
          left: `${trailRef.current.x}px`,
          top: `${trailRef.current.y}px`,
        }}
      />
    </>
  )
}

export default CustomCursor
