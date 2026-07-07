import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Wraps each word of an element's text in its own span so it can be animated individually
function splitWords(el) {
  const words = el.textContent.trim().split(/\s+/)
  el.innerHTML = words.map((word) => `<span class="reveal-word">${word}</span>`).join(' ')
  return el.querySelectorAll('.reveal-word')
}

function bootSequence() {
  const nav = document.getElementById('site-nav')
  const title = document.getElementById('hero-title')
  const subtitle = document.getElementById('hero-subtitle')
  const heroWords = title.querySelectorAll('.hero-word')
  const highlight = title.querySelector('.highlight-mark')
  const subtitleWords = splitWords(subtitle)

  const tl = gsap.timeline({ defaults: { ease: 'power2.out' } })

  tl.fromTo(nav, { y: -40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 })
    .set(title, { opacity: 1 }, '-=0.3')
    .fromTo(heroWords, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.12 }, '-=0.3')
    .to(highlight, { scaleX: 1, duration: 0.5, ease: 'power2.out' }, '-=0.2')
    .set(subtitle, { opacity: 1 })
    .fromTo(subtitleWords, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.04 }, '-=0.3')
}

function scrollReveals() {
  gsap.utils.toArray('[data-reveal="fade-up"]').forEach((el) => {
    gsap.fromTo(
      el,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 85%' },
      }
    )
  })

  gsap.utils.toArray('[data-reveal="words"]').forEach((el) => {
    const words = splitWords(el)
    gsap.set(el, { opacity: 1 })
    gsap.fromTo(
      words,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 85%' },
      }
    )
  })

  gsap.utils.toArray('[data-reveal-group]').forEach((group) => {
    gsap.fromTo(
      group.children,
      { opacity: 0, y: 30, scale: 0.85 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
        stagger: 0.12,
        ease: 'back.out(1.7)',
        scrollTrigger: { trigger: group, start: 'top 85%' },
      }
    )
  })
}

function mobileMenu() {
  const toggle = document.getElementById('menu-toggle')
  const menu = document.getElementById('mobile-menu')
  const lines = toggle.querySelectorAll('.menu-line')
  const links = menu.querySelectorAll('a')
  let isOpen = false

  gsap.set(menu, { autoAlpha: 0, y: -20 })

  function openMenu() {
    isOpen = true
    toggle.setAttribute('aria-expanded', 'true')
    gsap.set(menu, { pointerEvents: 'auto' })
    gsap.to(menu, { autoAlpha: 1, y: 0, duration: 0.35, ease: 'power2.out' })
    gsap.fromTo(
      links,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.4, stagger: 0.08, ease: 'back.out(1.7)', delay: 0.1 }
    )
    gsap.to(lines[0], { rotation: 45, y: 8, duration: 0.3 })
    gsap.to(lines[1], { opacity: 0, duration: 0.2 })
    gsap.to(lines[2], { rotation: -45, y: -8, duration: 0.3 })
  }

  function closeMenu() {
    if (!isOpen) return
    isOpen = false
    toggle.setAttribute('aria-expanded', 'false')
    gsap.to(menu, {
      autoAlpha: 0,
      y: -20,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: () => gsap.set(menu, { pointerEvents: 'none' }),
    })
    gsap.to(lines[0], { rotation: 0, y: 0, duration: 0.3 })
    gsap.to(lines[1], { opacity: 1, duration: 0.2 })
    gsap.to(lines[2], { rotation: 0, y: 0, duration: 0.3 })
  }

  toggle.addEventListener('click', () => (isOpen ? closeMenu() : openMenu()))
  links.forEach((link) => link.addEventListener('click', closeMenu))

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu()
  })

  const desktopQuery = window.matchMedia('(min-width: 768px)')
  desktopQuery.addEventListener('change', (e) => {
    if (e.matches) closeMenu()
  })
}

export function initAnimations() {
  bootSequence()
  scrollReveals()
  mobileMenu()
}
