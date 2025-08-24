// register plugins
gsap.registerPlugin(ScrollTrigger);

// helper: respects reduced motion
const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// YEAR
document.getElementById('y').textContent = new Date().getFullYear();

// Page-load timeline
if (!prefersReduced) {
  const tl = gsap.timeline({ defaults: { ease: "power3.out" }});
  tl.from(".site-header .logo", { y: -20, opacity: 0, duration: .6 })
    .from(".site-header nav a, .site-header .btn", { y: -10, opacity: 0, stagger: .05, duration: .35 }, "-=.3")
    .from(".eyebrow", { y: 10, opacity: 0, duration: .35 }, "-=.2")
    .from(".title .accent", { color: "#fff", duration: .6 }, "-=.1")
    .from(".title", { y: 20, opacity: 0, duration: .6 }, "-=.15")
    .from(".sub", { y: 10, opacity: 0, duration: .4 }, "-=.3")
    .from(".cta .btn", { scale: .8, opacity: 0, stagger: .1, duration: .35 }, "-=.2")
    .from(".badges li", { y: 8, opacity: 0, stagger: .06, duration: .3 }, "-=.2")
    .from(".card", { y: 40, rotate: -2, opacity: 0, duration: .8 }, "-=.4")
    .to(".orb-a", { xPercent: -8, yPercent: -12, repeat: -1, yoyo: true, duration: 6, ease: "sine.inOut" }, 0)
    .to(".orb-b", { xPercent: 12, yPercent: 8, repeat: -1, yoyo: true, duration: 7, ease: "sine.inOut" }, 0);
}

// Parallax card + tilt
document.querySelectorAll(".tilt").forEach((el) => {
  const strength = 10;
  el.addEventListener("mousemove", (e) => {
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = "rotateY(${x * strength}deg) rotateX(${-y * strength}deg) translateY(-2px)";
  });
  el.addEventListener("mouseleave", () => (el.style.transform = ""));
});

// About number counters
gsap.utils.toArray(".stat .num").forEach((n) => {
  const end = Number(n.dataset.count || "0");
  ScrollTrigger.create({
    trigger: n,
    start: "top 85%",
    once: true,
    onEnter: () => {
      gsap.fromTo(n, { textContent: 0 }, {
        textContent: end,
        duration: 1.4,
        ease: "power1.out",
        snap: { textContent: 1 }
      });
    }
  });
});

// Skill bars animation on view
gsap.utils.toArray(".bar span").forEach((bar) => {
  const val = Number(bar.dataset.value || 0);
  gsap.fromTo(bar, { width: "0%" }, {
    width:" ${val}%",
    duration: 1.2,
    ease: "power3.out",
    scrollTrigger: {
      trigger: bar,
      start: "top 85%",
      once: true
    }
  });
});

// Reveal sections
gsap.utils.toArray(".section .h2, .section p, .proj, .skills .bar").forEach((el) => {
  gsap.from(el, {
    y: 24, opacity: 0, duration: .6, ease: "power2.out",
    scrollTrigger: { trigger: el, start: "top 90%" }
  });
});

// Cards float subtly on scroll
gsap.utils.toArray(".proj").forEach((card, i) => {
  gsap.to(card, {
    y: i % 2 ? -8 : 8,
    ease: "none",
    scrollTrigger: {
      trigger: card,
      start: "top bottom",
      end: "bottom top",
      scrub: true
    }
  });
});

// Mobile nav (simple)
const burger = document.querySelector(".hamburger");
const nav = document.querySelector(".nav nav");
if (burger) {
  burger.addEventListener("click", () => {
    const isOpen = nav.style.display === "flex";
    nav.style.display = isOpen ? "none" : "flex";
    nav.style.flexDirection = "column";
    nav.style.gap = "16px";
    burger.setAttribute("aria-expanded", String(!isOpen));
  });
}