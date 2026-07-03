import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function bootSequence() {
  const overlay = document.querySelector('.crt-power-on')
  const nav = document.getElementById('site-nav')
  const title = document.getElementById('hero-title')
  const heroImage = document.getElementById('hero-image')
  const subtitle = document.getElementById('hero-subtitle')

  const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, onComplete: () => runInPlace(heroImage) })

  tl.to(overlay, { scaleY: 0.006, duration: 0.35, ease: 'power2.in' })
    .to(overlay, { opacity: 0, duration: 0.2, ease: 'power1.out' })
    .set(overlay, { display: 'none' })
    .fromTo(nav, { y: -80, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, '-=0.05')
    .fromTo(
      title,
      { opacity: 0, y: -150 },
      { opacity: 1, y: 0, duration: 1, ease: 'bounce.out' },
      '-=0.3'
    )
    .fromTo(
      heroImage,
      { opacity: 0, y: -150 },
      { opacity: 1, y: 0, duration: 1, ease: 'bounce.out' },
      '-=0.5'
    )
    .fromTo(subtitle, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, '-=0.15')
}

// Subtle jogging bob, loops forever once the boot sequence hands off to it
function runInPlace(el) {
  gsap.set(el, { transformOrigin: 'bottom center' })
  gsap.to(el, {
    keyframes: [
      { y: -6, rotation: -3, duration: 0.15 },
      { y: 0, rotation: 0, duration: 0.15 },
      { y: -6, rotation: 3, duration: 0.15 },
      { y: 0, rotation: 0, duration: 0.15 },
    ],
    repeat: -1,
    ease: 'sine.inOut',
  })
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

// Ambient flicker on the neon text, desynced per element so it reads like tube signage
function neonFlicker() {
  gsap.utils.toArray('.neon-cyan, .neon-magenta, .neon-yellow').forEach((el) => {
    gsap
      .timeline({ repeat: -1, repeatDelay: gsap.utils.random(3, 8) })
      .to(el, { opacity: 0.35, duration: 0.06 })
      .to(el, { opacity: 1, duration: 0.06 })
      .to(el, { opacity: 0.5, duration: 0.04, delay: 0.1 })
      .to(el, { opacity: 1, duration: 0.06 })
  })
}

export function initAnimations() {
  bootSequence()
  scrollReveals()
  neonFlicker()
  mobileMenu()
}
