import React from 'react'
import { createRoot } from 'react-dom/client'
import HomePreview from './HomePreview.jsx'
import '../css/app.css'


function mount() {
  const el = document.getElementById('app')
  if (!el) return console.error('Mount node #app not found.')
  const root = createRoot(el)
  root.render(<HomePreview />)
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mount)
} else {
  mount()
}

if (import.meta.hot) {
  import.meta.hot.accept(() => mount())
}
