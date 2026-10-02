import {
  createIcons,
  Menu,
  X,
  Plus,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  Copy,
  Check
} from 'lucide';
import { animate, inView } from 'motion';

// ==========================================
// 0. INITIALIZE LUCIDE ICONS (TREE-SHAKEN)
// ==========================================
const usedIcons = {
  Menu,
  X,
  Plus,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  Copy,
  Check
};

export function initIcons() {
  createIcons({ icons: usedIcons });
}

// Run immediately and whenever dynamic DOM content is inserted
document.addEventListener('DOMContentLoaded', () => initIcons());
initIcons();

// ==========================================
// 1. NAVIGATION HIDE/SHOW ON SCROLL
// ==========================================
let lastScroll = 0;
const nav = document.getElementById('navbar');
if (nav) {
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll <= 80) {
      nav.style.transform = 'translateY(0)';
    } else if (currentScroll > lastScroll && currentScroll > 100) {
      nav.style.transform = 'translateY(-100%)';
    } else {
      nav.style.transform = 'translateY(0)';
    }
    lastScroll = currentScroll;
  }, { passive: true });
}

// ==========================================
// 2. MOBILE MENU TOGGLE
// ==========================================
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const iconBars = document.getElementById('menu-icon-bars');
const iconClose = document.getElementById('menu-icon-close');
let menuOpen = false;

function toggleMenu(open) {
  menuOpen = open;
  menuBtn?.setAttribute('aria-expanded', String(open));
  mobileMenu?.setAttribute('aria-hidden', String(!open));
  if (open) {
    mobileMenu?.classList.remove('opacity-0', 'pointer-events-none');
    iconBars?.classList.add('hidden');
    iconClose?.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    if (mobileMenu) {
      animate(mobileMenu, { opacity: [0, 1] }, { duration: 0.25 });
    }
  } else {
    mobileMenu?.classList.add('opacity-0', 'pointer-events-none');
    iconBars?.classList.remove('hidden');
    iconClose?.classList.add('hidden');
    document.body.style.overflow = '';
  }
}

menuBtn?.addEventListener('click', () => toggleMenu(!menuOpen));
document.querySelectorAll('.mobile-nav-link').forEach(link => {
  link.addEventListener('click', () => toggleMenu(false));
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && menuOpen) toggleMenu(false);
});

// ==========================================
// 3. DECLARATIVE SCROLL REVEAL (MOTION)
// ==========================================
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.querySelectorAll('[data-reveal]').forEach(el => {
    inView(el, () => {
      animate(el, { opacity: [0, 1], transform: ['translateY(24px)', 'translateY(0px)'] }, {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1]
      });
      el.classList.add('revealed');
    }, { amount: 0.15 });
  });
} else {
  document.querySelectorAll('[data-reveal]').forEach(el => el.classList.add('revealed'));
}

// ==========================================
// 4. STATS COUNTER ANIMATION (MOTION)
// ==========================================
const statsSection = document.getElementById('stats-container');
const counters = document.querySelectorAll('.counter');
let counted = false;

if (statsSection) {
  inView(statsSection, () => {
    if (!counted) {
      counted = true;
      counters.forEach(counter => {
        const target = parseFloat(counter.getAttribute('data-target') || '0');
        const isDecimal = counter.getAttribute('data-decimals') === '1';

        animate(0, target, {
          duration: 1.6,
          ease: [0.16, 1, 0.3, 1],
          onUpdate: (latest) => {
            counter.textContent = isDecimal ? latest.toFixed(1) : Math.floor(latest).toString();
          }
        });
      });
    }
  }, { amount: 0.3 });
}

// ==========================================
// 5. SERVICES INTERACTIVE ROW ACCORDIONS
// ==========================================
document.querySelectorAll('.service-item').forEach(item => {
  item.addEventListener('click', () => {
    const chips = item.querySelector('.service-deliverables');
    const chevron = item.querySelector('.service-chevron');
    if (!chips || !chevron) return;
    const isExpanded = !chips.classList.contains('hidden');
    chips.classList.toggle('hidden');
    chips.classList.toggle('flex');
    chevron.textContent = isExpanded ? '+' : '−';
  });
});

// ==========================================
// 6. TESTIMONIAL QUOTE SWITCHER (MOTION)
// ==========================================
const quotes = [
  { text: '"Emirate transformed our company from an indistinct technical startup into a market authority. The brand system he built directly facilitated our $14M Series A round."', author: 'Soren Kjeldsen', role: 'Founder & CEO, Kroma Spatial Systems' },
  { text: '"The bespoke visual architecture and physical packaging gave our brand a luxury weight that our customers immediately noticed and praised."', author: 'Elena Rostova', role: 'Creative Director, Solstice Botanics' },
  { text: '"Fast, uncompromising, and deeply respectful of the craft. Emirate is the rarest breed of brand designer working today."', author: 'Marcus Vance', role: 'Managing Partner, Vela Ventures' }
];

let currentQuoteIndex = 0;
function showQuote(index) {
  currentQuoteIndex = (index + quotes.length) % quotes.length;
  const container = document.getElementById('featured-quote-container');
  if (!container) return;

  animate(container, { opacity: [1, 0] }, { duration: 0.15 }).then(() => {
    const textEl = document.getElementById('quote-text');
    const authorEl = document.getElementById('quote-author');
    const roleEl = document.getElementById('quote-role');
    if (textEl) textEl.textContent = quotes[currentQuoteIndex].text;
    if (authorEl) authorEl.textContent = quotes[currentQuoteIndex].author;
    if (roleEl) roleEl.textContent = quotes[currentQuoteIndex].role;
    animate(container, { opacity: [0, 1] }, { duration: 0.25 });
  });
}

document.getElementById('prev-quote-btn')?.addEventListener('click', () => showQuote(currentQuoteIndex - 1));
document.getElementById('next-quote-btn')?.addEventListener('click', () => showQuote(currentQuoteIndex + 1));

// ==========================================
// 7. COPY EMAIL TOAST & BACK TO TOP
// ==========================================
const copyBtn = document.getElementById('copy-email-btn');
const toast = document.getElementById('copy-toast');
copyBtn?.addEventListener('click', () => {
  navigator.clipboard.writeText('hello@emirate.design').then(() => {
    if (toast) {
      toast.classList.remove('opacity-0');
      animate(toast, { opacity: [0, 1], y: [6, 0] }, { duration: 0.2 });
      setTimeout(() => {
        animate(toast, { opacity: [1, 0], y: [0, -4] }, { duration: 0.25 }).then(() => {
          toast.classList.add('opacity-0');
        });
      }, 2200);
    }
  });
});

document.getElementById('back-to-top')?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ==========================================
// 8. CONTACT FORM WITH ROBUST VALIDATION
// ==========================================
const form = document.getElementById('contact-form');
form?.addEventListener('submit', (e) => {
  e.preventDefault();

  // Validate form fields natively before submitting
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const btn = document.getElementById('submit-btn');
  const btnText = document.getElementById('btn-text');
  const spinner = document.getElementById('btn-spinner');
  const success = document.getElementById('form-success');

  if (btnText) btnText.textContent = 'Transmitting...';
  spinner?.classList.remove('hidden');
  if (btn) btn.disabled = true;

  setTimeout(() => {
    spinner?.classList.add('hidden');
    btn?.classList.add('hidden');
    if (success) {
      success.classList.remove('hidden');
      animate(success, { opacity: [0, 1], scale: [0.95, 1] }, { duration: 0.35 });
    }
  }, 1200);
});

// ==========================================
// 9. DESKTOP CUSTOM CURSOR
// ==========================================
const cursor = document.getElementById('cursor');
if (cursor && window.matchMedia('(pointer: fine)').matches) {
  document.addEventListener('mousemove', (e) => {
    cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
  });
  document.querySelectorAll('a, button, details, input, select, textarea, .service-item, .bento-card, .scope-item').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('cursor-hover'));
  });
}

// ==========================================
// 10. CATEGORY FILTERING (RACE-CONDITION SAFE)
// ==========================================
const filterBtns = document.querySelectorAll('.filter-btn');
const bentoCards = document.querySelectorAll('.bento-card');
const cardTimeoutMap = new Map();

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => {
      b.classList.remove('active', 'bg-accent', 'text-accent-ink', 'font-semibold');
      b.classList.add('bg-white/5', 'text-paper/70');
    });
    btn.classList.add('active', 'bg-accent', 'text-accent-ink', 'font-semibold');
    btn.classList.remove('bg-white/5', 'text-paper/70');

    const filter = btn.getAttribute('data-filter');
    bentoCards.forEach(card => {
      if (cardTimeoutMap.has(card)) {
        clearTimeout(cardTimeoutMap.get(card));
        cardTimeoutMap.delete(card);
      }

      const cardCat = card.getAttribute('data-category');
      const matches = filter === 'all' || cardCat === filter;

      if (matches) {
        card.style.display = '';
        animate(card, { opacity: [0, 1], scale: [0.96, 1] }, { duration: 0.3, ease: 'easeOut' });
      } else {
        animate(card, { opacity: [1, 0], scale: [1, 0.96] }, { duration: 0.25, ease: 'easeIn' }).then(() => {
          card.style.display = 'none';
        });
      }
    });
  });
});

// ==========================================
// 11. BEFORE / AFTER TRANSFORMATION SLIDER
// ==========================================
const baRange = document.getElementById('ba-range');
const baClipped = document.getElementById('ba-clipped-layer');
const baHandle = document.getElementById('ba-handle');

function updateBeforeAfter(val) {
  if (baClipped) baClipped.style.clipPath = `polygon(0% 0%, ${val}% 0%, ${val}% 100%, 0% 100%)`;
  if (baHandle) baHandle.style.left = `${val}%`;
}
baRange?.addEventListener('input', (e) => updateBeforeAfter(e.target.value));

// ==========================================
// 12. PROJECT SCOPE & INVESTMENT ESTIMATOR
// ==========================================
const scopeCheckboxes = document.querySelectorAll('.scope-checkbox');
const speedBtns = document.querySelectorAll('.speed-btn');
const priceDisplay = document.getElementById('scope-price-display');
const timelineDisplay = document.getElementById('scope-timeline-display');
const pillsContainer = document.getElementById('scope-pills-list');
const applyScopeBtn = document.getElementById('apply-scope-btn');

let currentSpeedMultiplier = 1.0;

function calculateScope() {
  let baseTotal = 0;
  let maxWeeks = 0;
  const selectedNames = [];

  scopeCheckboxes.forEach(cb => {
    if (cb.checked) {
      baseTotal += parseInt(cb.getAttribute('data-price') || '0', 10);
      maxWeeks += parseFloat(cb.getAttribute('data-weeks') || '0');
      selectedNames.push(cb.getAttribute('data-name') || '');
    }
  });

  const finalTotal = Math.round(baseTotal * currentSpeedMultiplier);
  if (priceDisplay) priceDisplay.textContent = `$${finalTotal.toLocaleString()}`;

  const estimatedWeeks = Math.max(2, Math.round(maxWeeks * (currentSpeedMultiplier === 1.2 ? 0.7 : 1.0)));
  if (timelineDisplay) timelineDisplay.textContent = `${estimatedWeeks}–${estimatedWeeks + 1} WEEKS`;

  if (pillsContainer) {
    pillsContainer.innerHTML = selectedNames.length
      ? selectedNames.map(name => `<span class="px-2.5 py-1 bg-white/5 border border-white/10 rounded-md text-[11px] font-mono text-paper/80">${name}</span>`).join('')
      : '<span class="text-xs font-mono text-stone">No inclusions selected</span>';
  }
}

scopeCheckboxes.forEach(cb => cb.addEventListener('change', calculateScope));

speedBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    speedBtns.forEach(b => {
      b.classList.remove('active', 'border-accent', 'text-accent', 'bg-accent/10', 'font-semibold');
      b.classList.add('border-white/10', 'text-stone');
    });
    btn.classList.add('active', 'border-accent', 'text-accent', 'bg-accent/10', 'font-semibold');
    btn.classList.remove('border-white/10', 'text-stone');
    currentSpeedMultiplier = parseFloat(btn.getAttribute('data-speed') || '1');
    calculateScope();
  });
});

// Prepopulate contact form from scope selection
applyScopeBtn?.addEventListener('click', () => {
  const selected = [];
  scopeCheckboxes.forEach(cb => {
    if (cb.checked) selected.push(cb.getAttribute('data-name'));
  });

  const projectTypeSelect = document.getElementById('project-type');
  const budgetSelect = document.getElementById('budget');
  const messageTextarea = document.getElementById('message');

  const total = parseInt(priceDisplay?.textContent?.replace(/\D/g, '') || '0', 10);
  if (budgetSelect) {
    if (total < 5000) budgetSelect.value = '2k-5k';
    else if (total <= 10000) budgetSelect.value = '5k-10k';
    else budgetSelect.value = '10k-plus';
  }

  if (projectTypeSelect) {
    if (selected.some(s => s && s.includes('Brand Identity'))) projectTypeSelect.value = 'brand-identity';
    else if (selected.some(s => s && s.includes('Packaging'))) projectTypeSelect.value = 'packaging';
    else if (selected.some(s => s && s.includes('Digital'))) projectTypeSelect.value = 'custom';
  }

  if (messageTextarea) {
    messageTextarea.value = `[Estimated Scope]: ${selected.join(', ')}\n[Target Investment]: ${priceDisplay?.textContent || ''} (${timelineDisplay?.textContent || ''} timeline)\n\nProject Context & Goals: `;
  }

  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  setTimeout(() => messageTextarea?.focus(), 600);
});

// ==========================================
// 13. CASE STUDY DEEP DIVE MODAL
// ==========================================
const caseStudies = [
  {
    title: "Kroma Architecture & Spatial Identity",
    client: "Kroma Systems AG",
    year: "2026",
    category: "Brand Identity",
    location: "Zurich, Switzerland",
    deliverables: ["Visual Architecture", "Guidelines (80pp)", "Signage & Wayfinding", "Blind-Debossed Stationery", "Monogram Vector Matrix"],
    challenge: "Kroma was raising a $14M Series A round while hampered by a dated, cluttered 2018 tech logo that failed to communicate their high-end structural engineering mastery to institutional European clients.",
    solution: "We designed a monolithic, Swiss-rooted architectural identity with mathematical proportions, brutalist geometric grid lines, and tactile mineral paper stocks that immediately established market seniority.",
    typeSpec: "Instrument Serif Italic 72pt · Inter Tight Medium 15pt · JetBrains Mono 11pt",
    palette: [
      { name: "Obsidian Ink", hex: "#0B0B0C" },
      { name: "Raw Concrete", hex: "#8C8A85" },
      { name: "Parchment Stone", hex: "#F5F2EC" },
      { name: "Architect Chartreuse", hex: "#C6FF3D" }
    ],
    image: "/src/assets/images/project_kroma_identity_1790895123334.webp",
    quote: "The brand system Emirate engineered directly facilitated our $14M institutional round.",
    author: "Soren Kjeldsen, Founder & CEO"
  },
  {
    title: "Solstice Botanics Organic Luxury",
    client: "Solstice Laboratories Ltd.",
    year: "2025",
    category: "Packaging & Print",
    location: "London, United Kingdom",
    deliverables: ["Amber Glass Vessels", "Foil Stamping Dielines", "Sustainable Unboxing Cartons", "Brand Identity", "Batch Monograms"],
    challenge: "Competing against massive legacy cosmetic houses, Solstice required physical packaging so tactile and magnetic that customer unboxing videos would drive viral organic adoption without paid acquisition.",
    solution: "Crafted custom heavyweight amber apothecary jars finished with blind-debossed cotton labels, gold micro-foil serial codes, and 100% post-consumer unbleached fibrous cartons.",
    typeSpec: "Instrument Serif Display 44pt · Inter Tight 13pt · JetBrains Mono 10pt",
    palette: [
      { name: "Amber Ochre", hex: "#5C3D1E" },
      { name: "Deep Lichen", hex: "#1D2319" },
      { name: "Warm Cotton", hex: "#F7F4EE" },
      { name: "Accent Lime", hex: "#C6FF3D" }
    ],
    image: "/src/assets/images/project_solstice_packaging_1790895135186.webp",
    quote: "Our launch collection sold out in 72 hours solely on the visual magnetism of the packaging.",
    author: "Elena Rostova, Creative Director"
  },
  {
    title: "Monolith Architecture Monograph",
    client: "Venice Biennale Architecture",
    year: "2025",
    category: "Editorial Publication",
    location: "Venice / Milan, Italy",
    deliverables: ["Hardcover 320pp Book", "Slipcase Box", "Exhibition Poster Set", "Custom Swiss Grid System"],
    challenge: "Creating a museum-grade archival monograph commemorating twenty years of Nordic architectural feats that felt both timelessly monumental and mechanically rigorous.",
    solution: "Engineered a 320-page hardcover volume bound in coarse Belgian linen with gunmetal foil blocking, printed on Munken Lynx 150gsm paper using bespoke 12-column editorial layouts.",
    typeSpec: "Neue Haas Grotesk 60pt · Instrument Serif 36pt · JetBrains Mono 9pt",
    palette: [
      { name: "Carbon Slate", hex: "#141517" },
      { name: "Belgian Grey", hex: "#7E8085" },
      { name: "Munken Paper", hex: "#F3EFE6" },
      { name: "Studio Accent", hex: "#C6FF3D" }
    ],
    image: "/src/assets/images/project_monolith_editorial_1790895145539.webp",
    quote: "Awarded Best Monograph at the Milan Design Arts Awards.",
    author: "Astrid Lind, Chief Curator"
  },
  {
    title: "Aura Kinetic Sound System",
    client: "Aura Audio Corp.",
    year: "2026",
    category: "Social & Motion",
    location: "Berlin, Germany",
    deliverables: ["Kinetic Typography System", "Audio-Reactive Poster Engine", "Figma Design Tokens", "Social Campaign Suite"],
    challenge: "Aura needed a motion visual identity that could visualize spatial audio frequencies in real-time across high-density digital displays and club environments.",
    solution: "Developed an algorithmic typographic engine that stretches and warps custom letterforms in harmonic sync with ambient bass frequencies, rendered in high-contrast phosphor chartreuse.",
    typeSpec: "Inter Tight Heavy 80pt · JetBrains Mono Bold 14pt",
    palette: [
      { name: "Pure Void", hex: "#000000" },
      { name: "Aura Glow", hex: "#C6FF3D" },
      { name: "Sub-Bass Grey", hex: "#22252A" },
      { name: "Bone White", hex: "#EBEBEB" }
    ],
    image: "/src/assets/images/project_aura_digital_1790895154017.webp",
    quote: "The motion system stopped thumbs across 3 million algorithmic impressions.",
    author: "Klaus Weber, Head of Product"
  },
  {
    title: "Nexus Orbit Adaptive Mark",
    client: "Nexus Aerospace",
    year: "2026",
    category: "Brand Identity",
    location: "Tokyo & San Francisco",
    deliverables: ["Variable Vector Mark", "Icon Matrix", "Aerospace Vehicle Decals", "Technical Design Guidelines"],
    challenge: "Developing an aerospace symbol that renders with razor sharpness from 16px micro-favicons up to 20-meter orbital rocket fairing liveries.",
    solution: "Constructed an adaptive vector glyph matrix based on orbital trajectories and golden ratio curves, engineered with zero optical distortion at extreme scales.",
    typeSpec: "JetBrains Mono SemiBold · Instrument Serif Regular",
    palette: [
      { name: "Deep Orbital", hex: "#07080A" },
      { name: "Titanium", hex: "#9EA2A8" },
      { name: "Signal Lime", hex: "#C6FF3D" },
      { name: "Clean Paper", hex: "#F2F2F2" }
    ],
    image: "/src/assets/images/project_kroma_identity_1790895123334.webp",
    quote: "A timeless geometric insignia worthy of modern space exploration.",
    author: "Dr. Kenji Sato, VP Technology"
  },
  {
    title: "Vela Ventures Digital Flagship",
    client: "Vela Capital Partners",
    year: "2026",
    category: "Digital Flagship",
    location: "New York, USA",
    deliverables: ["Responsive Web Platform", "Interactive Portfolio Grid", "Design Token Library", "Editorial Darkroom UI"],
    challenge: "Vela required a flagship digital home that distinguished their $180M early-stage deep-tech fund from traditional conservative Wall Street venture websites.",
    solution: "Engineered an immersive, editorial darkroom web platform featuring fluid responsive typography, micro-interactions, and conversion-optimized founder pitch pipelines.",
    typeSpec: "Instrument Serif Display 56pt · Inter Tight 14pt · JetBrains Mono 11pt",
    palette: [
      { name: "Darkroom Charcoal", hex: "#0E0F12" },
      { name: "Studio Accent", hex: "#C6FF3D" },
      { name: "Slate Stone", hex: "#6E7179" },
      { name: "Paper Cream", hex: "#F5F2EC" }
    ],
    image: "/src/assets/images/project_monolith_editorial_1790895145539.webp",
    quote: "The highest-converting web experience in our firm's ten-year history.",
    author: "Marcus Vance, Managing Partner"
  }
];

const modal = document.getElementById('case-study-modal');
const modalCloseBtn = document.getElementById('modal-close-btn');
const modalPrevBtn = document.getElementById('modal-prev-btn');
const modalNextBtn = document.getElementById('modal-next-btn');
const modalCtaBtn = document.getElementById('modal-cta-btn');
let currentModalIndex = 0;

function renderCaseStudy(idx) {
  currentModalIndex = (idx + caseStudies.length) % caseStudies.length;
  const project = caseStudies[currentModalIndex];

  const counterEl = document.getElementById('modal-counter');
  const catEl = document.getElementById('modal-category');
  const clientEl = document.getElementById('modal-client');
  const locEl = document.getElementById('modal-location');
  const yearEl = document.getElementById('modal-year');
  const titleEl = document.getElementById('modal-project-title');
  const imgEl = document.getElementById('modal-image');
  const chalEl = document.getElementById('modal-challenge');
  const solEl = document.getElementById('modal-solution');
  const quoteEl = document.getElementById('modal-quote');
  const authorEl = document.getElementById('modal-quote-author');
  const specEl = document.getElementById('modal-typespec');

  if (counterEl) counterEl.textContent = `0${currentModalIndex + 1} / 0${caseStudies.length}`;
  if (catEl) catEl.textContent = project.category;
  if (clientEl) clientEl.textContent = project.client;
  if (locEl) locEl.textContent = project.location;
  if (yearEl) yearEl.textContent = project.year;
  if (titleEl) titleEl.textContent = project.title;
  if (imgEl) {
    imgEl.src = project.image;
    imgEl.alt = `${project.title} Visual`;
  }
  if (chalEl) chalEl.textContent = project.challenge;
  if (solEl) solEl.textContent = project.solution;
  if (quoteEl) quoteEl.textContent = `"${project.quote}"`;
  if (authorEl) authorEl.textContent = project.author;
  if (specEl) specEl.textContent = project.typeSpec;

  // Render Swatches
  const swatchesContainer = document.getElementById('modal-swatches-container');
  if (swatchesContainer) {
    swatchesContainer.innerHTML = project.palette.map(p => `
      <button class="color-swatch-btn flex items-center gap-2 p-2 rounded-lg bg-white/5 hover:bg-white/10 text-left border border-white/5 transition-colors group cursor-pointer" data-hex="${p.hex}" aria-label="Copy color ${p.hex}">
        <span class="w-4 h-4 rounded-full border border-white/20 shrink-0" style="background-color: ${p.hex}"></span>
        <div class="truncate">
          <span class="text-[10px] text-stone block truncate">${p.name}</span>
          <span class="text-xs font-mono text-paper font-semibold group-hover:text-accent">${p.hex}</span>
        </div>
      </button>
    `).join('');

    swatchesContainer.querySelectorAll('.color-swatch-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const hex = btn.getAttribute('data-hex');
        if (hex) {
          navigator.clipboard.writeText(hex).then(() => {
            const hexSpan = btn.querySelector('.group-hover\\:text-accent') || btn.querySelector('span:last-child');
            if (hexSpan) {
              const orig = hexSpan.textContent;
              hexSpan.textContent = 'COPIED!';
              setTimeout(() => { hexSpan.textContent = orig; }, 1500);
            }
          });
        }
      });
    });
  }

  // Render Deliverables
  const delivList = document.getElementById('modal-deliverables-list');
  if (delivList) {
    delivList.innerHTML = project.deliverables.map(d => `
      <span class="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-mono text-paper/80">${d}</span>
    `).join('');
  }
}

function openModal(idx) {
  renderCaseStudy(idx);
  if (!modal) return;
  modal.classList.remove('opacity-0', 'pointer-events-none');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';

  const container = document.getElementById('modal-content-container');
  if (container) {
    animate(container, { opacity: [0, 1], scale: [0.96, 1] }, { duration: 0.25, ease: 'easeOut' });
  }
}

function closeModal() {
  if (!modal) return;
  const container = document.getElementById('modal-content-container');
  if (container) {
    animate(container, { opacity: [1, 0], scale: [1, 0.96] }, { duration: 0.2 }).then(() => {
      modal.classList.add('opacity-0', 'pointer-events-none');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    });
  } else {
    modal.classList.add('opacity-0', 'pointer-events-none');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
}

bentoCards.forEach(card => {
  card.addEventListener('click', () => {
    const idx = parseInt(card.getAttribute('data-project') || '0', 10);
    openModal(idx);
  });
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const idx = parseInt(card.getAttribute('data-project') || '0', 10);
      openModal(idx);
    }
  });
});

modalCloseBtn?.addEventListener('click', closeModal);
modalPrevBtn?.addEventListener('click', () => renderCaseStudy(currentModalIndex - 1));
modalNextBtn?.addEventListener('click', () => renderCaseStudy(currentModalIndex + 1));
modalCtaBtn?.addEventListener('click', () => {
  closeModal();
  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
});

// Close modal on backdrop click
modal?.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});

// Keyboard support for modal
document.addEventListener('keydown', (e) => {
  if (modal && !modal.classList.contains('pointer-events-none')) {
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowLeft') renderCaseStudy(currentModalIndex - 1);
    if (e.key === 'ArrowRight') renderCaseStudy(currentModalIndex + 1);
  }
});
