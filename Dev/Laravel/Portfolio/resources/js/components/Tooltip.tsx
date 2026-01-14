import React, { ReactNode } from 'react'

interface TooltipProps {
  content: ReactNode
  children: ReactNode
  placement?: 'top'
  id?: string
}

/**
 * Usage:
 * <Tooltip content="Opens the contact form">
 *   <button>Contact</button>
 * </Tooltip>
 *
 * The visual styles live in app.css (classes: tooltip-group, tooltip, tooltip__arrow)
 */
export default function Tooltip({ content, children, placement = 'top', id }: TooltipProps) {
  const tooltipId = id || `tip-${Math.random().toString(36).slice(2, 8)}`
  const isTop = placement === 'top' // simple variant; could be extended later

  return (
    <span className="tooltip-group" aria-describedby={tooltipId}>
      {children}
      <span id={tooltipId} role="tooltip" className="tooltip">
        {content}
        {isTop && <span className="tooltip__arrow" />}
      </span>
    </span>
  )
}
