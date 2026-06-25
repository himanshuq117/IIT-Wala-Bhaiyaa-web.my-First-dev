/* ==========================================
   IIT WALA BHAIYAA - Main JavaScript
   Interactive Features & Dynamic Content
   ========================================== */

'use strict';

// ==========================================
// PARTICLE BACKGROUND
// ==========================================
(function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W = canvas.width = window.innerWidth;
  let H = canvas.height = window.innerHeight;
  const particles = [];
  const COUNT = 60;

  class Particle {
    constructor() { this.reset(true); }
    reset(init = false) {
      this.x = Math.random() * W;
      this.y = init ? Math.random() * H : H + 10;
      this.r = Math.random() * 2 + 0.5;
      this.speed = Math.random() * 0.4 + 0.1;
      this.opacity = Math.random() * 0.5 + 0.1;
      this.color = Math.random() > 0.5 ? '#d4af37' : '#00d4ff';
      this.drift = (Math.random() - 0.5) * 0.3;
    }
    update() {
      this.y -= this.speed;
      this.x += this.drift;
      if (this.y < -10) this.reset();
    }
    draw() {
      ctx.save();
      ctx.globalAlpha = this.opacity;
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  for (let i = 0; i < COUNT; i++) particles.push(new Particle());

  function animate() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animate);
  }
  animate();

  window.addEventListener('resize', () => {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  });
})();

// ==========================================
// NAVBAR SCROLL EFFECT
// ==========================================
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');
}, { passive: true });

// ==========================================
// MOBILE MENU
// ==========================================
const hamburger = document.getElementById('hamburger-btn');
const mobileMenu = document.getElementById('mobile-menu');
let menuOpen = false;

hamburger.addEventListener('click', () => {
  menuOpen = !menuOpen;
  mobileMenu.classList.toggle('open', menuOpen);
  hamburger.querySelectorAll('span').forEach((s, i) => {
    if (menuOpen) {
      if (i === 0) s.style.transform = 'rotate(45deg) translate(5px, 5px)';
      if (i === 1) s.style.opacity = '0';
      if (i === 2) s.style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      s.style.transform = '';
      s.style.opacity = '';
    }
  });
});

function closeMobileMenu() {
  menuOpen = false;
  mobileMenu.classList.remove('open');
  hamburger.querySelectorAll('span').forEach(s => {
    s.style.transform = '';
    s.style.opacity = '';
  });
}

// ==========================================
// COUNTER ANIMATION
// ==========================================
function animateCounter(el) {
  const target = parseInt(el.dataset.count);
  const suffix = target >= 1000 ? '+' : target === 98 ? '%' : '+';
  let current = 0;
  const increment = target / 60;
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = (current >= 1000 ? Math.floor(current / 1000) + 'K' : Math.floor(current)) + suffix;
  }, 25);
}

// ==========================================
// SCROLL REVEAL
// ==========================================
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // Trigger counter animation for stat numbers
      const counters = entry.target.querySelectorAll ? entry.target.querySelectorAll('[data-count]') : [];
      counters.forEach(animateCounter);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Observe stat items
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('[data-count]').forEach(animateCounter);
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.stats-inner').forEach(el => statsObserver.observe(el));

// ==========================================
// TOAST NOTIFICATIONS
// ==========================================
function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<strong>${type === 'success' ? '✅' : '⚠️'}</strong> ${message}`;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 4200);
}

// ==========================================
// PROGRAM MODAL DATA
// ==========================================
const programData = {
  'home-tuition': {
    icon: '🏠',
    title: 'Home Tuition',
    subtitle: 'Classes 1st to 8th | All Subjects',
    points: [
      { icon: '📖', text: 'All Subjects Covered — Math, Science, English, Hindi, Social Studies' },
      { icon: '⏱️', text: '1-Hour Daily Classes at your doorstep, 6 days a week' },
      { icon: '👤', text: '100% Personal Attention — one-on-one dedicated teaching' },
      { icon: '📝', text: 'Daily Homework Support and doubt-clearing sessions included' },
      { icon: '📊', text: 'Weekly Tests and detailed Progress Reports for parents' },
      { icon: '📅', text: 'Flexible scheduling to suit your child\'s routine and school timings' },
      { icon: '💰', text: 'Affordable monthly fees starting from just ₹1,500 with sibling discounts' },
    ]
  },
  'foundation': {
    icon: '📚',
    title: 'Foundation Program',
    subtitle: 'Class 6th to 10th | Building Future Champions',
    points: [
      { icon: '🏗️', text: 'Strong Concept Building across all core subjects' },
      { icon: '🥇', text: 'Olympiad Preparation — Math Olympiad, Science Olympiad, NTSE' },
      { icon: '🔬', text: 'NTSE Foundation — comprehensive training for scholarship exams' },
      { icon: '🚀', text: 'Future IIT-JEE & NEET Base preparation from early classes' },
      { icon: '🧩', text: 'Critical thinking, logical reasoning and problem-solving skills' },
      { icon: '📈', text: 'Regular mock tests mimicking board and competitive exam patterns' },
      { icon: '🎓', text: 'Career counseling and guidance for choosing the right path after 10th' },
    ]
  },
  'iit-jee': {
    icon: '⚛️',
    title: 'IIT-JEE Foundation',
    subtitle: 'Engineering Dream | Class 9 to 12 & Droppers',
    points: [
      { icon: '📐', text: 'Mathematics — Algebra, Calculus, Trigonometry, Coordinate Geometry and more' },
      { icon: '⚡', text: 'Physics — Mechanics, Thermodynamics, Electrodynamics, Optics, Modern Physics' },
      { icon: '🧪', text: 'Chemistry — Organic, Inorganic and Physical Chemistry from scratch to advanced' },
      { icon: '🧩', text: 'Problem-Solving Skills with 1000+ practice questions per chapter' },
      { icon: '🔭', text: 'Analytical Thinking and time management techniques for JEE Mains & Advanced' },
      { icon: '📋', text: 'Previous 10-year JEE papers solved with detailed explanations' },
      { icon: '🎯', text: 'Personalized doubt sessions and weekly full-length mock tests' },
    ]
  },
  'neet': {
    icon: '🩺',
    title: 'NEET Foundation',
    subtitle: 'Medical Dream | Biology, Physics & Chemistry',
    points: [
      { icon: '🌱', text: 'Biology — Botany and Zoology, NCERT focused with diagram-based learning' },
      { icon: '⚡', text: 'Physics — Core mechanics and electrodynamics as required for NEET' },
      { icon: '🧪', text: 'Chemistry — Physical, Organic and Inorganic with reaction mechanisms' },
      { icon: '💡', text: 'Concept Clarity — NCERT line-by-line study with exam-relevant notes' },
      { icon: '📋', text: 'Exam-Oriented Strategy and time management for 720-mark exam' },
      { icon: '🏥', text: 'Mock tests modeled on latest NEET pattern with OMR practice' },
      { icon: '🎯', text: 'Previous year NEET papers solved and analyzed topic-wise' },
    ]
  },
  'govt-job': {
    icon: '🏛️',
    title: 'Government Job Foundation',
    subtitle: 'SSC | Railways | Banking | State Exams',
    points: [
      { icon: '📋', text: 'SSC Foundation — CGL, CHSL, MTS and other SSC exams preparation' },
      { icon: '🏦', text: 'Banking Awareness — SBI, IBPS, RRB — Quantitative Aptitude and Reasoning' },
      { icon: '🚂', text: 'Railway Exams Foundation — RRB NTPC, Group D comprehensive preparation' },
      { icon: '🌍', text: 'General Knowledge and Current Affairs updated monthly' },
      { icon: '🧮', text: 'Reasoning & Aptitude — Verbal and Non-Verbal Reasoning with shortcuts' },
      { icon: '✍️', text: 'English Grammar and Comprehension for competitive exams' },
      { icon: '📝', text: 'Daily practice tests and full-length mock exams every Sunday' },
    ]
  },
  'skill-dev': {
    icon: '🧠',
    title: 'Skill Development & Personality',
    subtitle: 'Holistic Growth | Beyond Academics',
    points: [
      { icon: '🎤', text: 'Communication Skills — Public speaking, debate, presentation and body language' },
      { icon: '🧠', text: 'Personality Development — confidence, self-esteem, and positive mindset building' },
      { icon: '⏰', text: 'Time Management — study planning, goal setting and productivity techniques' },
      { icon: '📚', text: 'Smart Study Techniques — memory methods, mind mapping, speed reading' },
      { icon: '👑', text: 'Leadership Quality — team building, decision making and initiative taking' },
      { icon: '🎯', text: 'Career Clarity Sessions — understanding aptitude, interest and career paths' },
      { icon: '💪', text: 'Motivation workshops and mentoring sessions by Ashutosh Tripathi' },
    ]
  }
};

function openModal(programId) {
  const data = programData[programId];
  if (!data) return;
  document.getElementById('modal-icon').textContent = data.icon;
  document.getElementById('modal-title').textContent = data.title;
  document.getElementById('modal-subtitle').textContent = data.subtitle;
  const pointsEl = document.getElementById('modal-points');
  pointsEl.innerHTML = data.points.map(p =>
    `<div class="modal-point"><span class="modal-point-icon">${p.icon}</span>${p.text}</div>`
  ).join('');
  document.getElementById('program-modal').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('program-modal').classList.remove('active');
  document.body.style.overflow = '';
}

function closeModalOutside(e) {
  if (e.target === e.currentTarget) closeModal();
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});

// ==========================================
// SIBLING FEE CALCULATOR
// ==========================================
const feeMap = {
  '1': { standard: 1500, sibling: 1300 },
  '2': { standard: 1500, sibling: 1300 },
  '3': { standard: 1800, sibling: 1600 },
  '4': { standard: 1800, sibling: 1600 },
  '5': { standard: 2000, sibling: 1800 },
  '6': { standard: 2500, sibling: 2200 },
  '7': { standard: 2800, sibling: 2500 },
  '8': { standard: 3000, sibling: 2700 },
};

const classOptions = ['', '1', '2', '3', '4', '5', '6', '7', '8'];
let siblingCount = 0;

function addSiblingRow() {
  siblingCount++;
  const idx = siblingCount;
  const container = document.getElementById('siblings-container');
  const row = document.createElement('div');
  row.className = 'calc-sibling-row';
  row.id = `sibling-row-${idx}`;
  row.innerHTML = `
    <div class="calc-input-group">
      <label>Child ${idx} Name</label>
      <input type="text" placeholder="Optional name" id="sib-name-${idx}" />
    </div>
    <div class="calc-input-group">
      <label>Class *</label>
      <select id="sib-class-${idx}" onchange="calcFees()">
        ${classOptions.map(c => c ? `<option value="${c}">Class ${c}</option>` : `<option value="">Select Class</option>`).join('')}
      </select>
    </div>
    <button class="btn-remove-sibling" onclick="removeSibling(${idx})" title="Remove">✕</button>
  `;
  container.appendChild(row);
  calcFees();
}

function removeSibling(idx) {
  const row = document.getElementById(`sibling-row-${idx}`);
  if (row) row.remove();
  calcFees();
}

function calcFees() {
  const rows = document.querySelectorAll('.calc-sibling-row');
  const count = rows.length;
  let subtotal = 0;
  let discountTotal = 0;

  rows.forEach(row => {
    const select = row.querySelector('select');
    if (!select || !select.value) return;
    const fee = feeMap[select.value];
    if (!fee) return;
    subtotal += fee.standard;
    if (count >= 2) discountTotal += fee.standard - fee.sibling;
  });

  const total = subtotal - discountTotal;
  const fmt = n => '₹' + n.toLocaleString('en-IN');

  document.getElementById('calc-subtotal').textContent = fmt(subtotal);
  document.getElementById('calc-discount').textContent = discountTotal > 0 ? `- ${fmt(discountTotal)}` : '₹0';
  document.getElementById('calc-total').textContent = fmt(total);

  const noteEl = document.getElementById('calc-note');
  if (count >= 3) {
    document.getElementById('calc-discount-label').textContent = '3+ Siblings Discount Applied';
    noteEl.innerHTML = '🎉 Extra exclusive discount for 3+ siblings applied! <a href="tel:9873996314" style="color:var(--gold-300); font-weight:600;">Call for more details.</a>';
  } else if (count === 2) {
    document.getElementById('calc-discount-label').textContent = '2 Siblings Discount Applied';
    noteEl.innerHTML = '👨‍👩‍👦 Special 2-sibling discount applied!';
  } else {
    document.getElementById('calc-discount-label').textContent = 'Sibling Discount';
    noteEl.innerHTML = 'Add 2 or more children to activate sibling discounts!';
  }
}

document.getElementById('btn-add-sibling').addEventListener('click', addSiblingRow);
// Initialize with one row
addSiblingRow();

// ==========================================
// SEMINAR REGISTRATION & CERTIFICATE GENERATOR
// ==========================================
function handleSeminarReg(e) {
  e.preventDefault();
  const name = document.getElementById('reg-name').value.trim();
  const cls = document.getElementById('reg-class').value;
  const phone = document.getElementById('reg-phone').value.trim();
  const city = document.getElementById('reg-city').value.trim();

  if (!name || !cls || !phone || !city) {
    showToast('Please fill all required fields!', 'error');
    return;
  }
  if (phone.length !== 10 || !/^\d+$/.test(phone)) {
    showToast('Please enter a valid 10-digit WhatsApp number!', 'error');
    return;
  }

  const btn = document.getElementById('btn-register');
  btn.disabled = true;
  btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Generating Certificate...';

  setTimeout(() => {
    generateCertificate(name, cls);
    document.getElementById('cert-preview').classList.add('active');
    btn.disabled = false;
    btn.innerHTML = '<i class="fa-solid fa-check"></i> Registered Successfully!';
    btn.style.background = 'linear-gradient(135deg, #00e676, #00c853)';
    showToast(`Welcome ${name}! Your certificate is ready to download! 🎓`, 'success');
  }, 1500);
}

function generateCertificate(studentName, studentClass) {
  const canvas = document.getElementById('cert-canvas');
  const ctx = canvas.getContext('2d');
  const W = canvas.width = 900;
  const H = canvas.height = 640;

  // Background
  ctx.fillStyle = '#f5f0e8';
  ctx.fillRect(0, 0, W, H);

  // Left dark blue panel
  const leftPanel = ctx.createLinearGradient(0, 0, 180, H);
  leftPanel.addColorStop(0, '#00091f');
  leftPanel.addColorStop(1, '#00205b');
  ctx.fillStyle = leftPanel;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(160, 0);
  ctx.quadraticCurveTo(200, H / 2, 160, H);
  ctx.lineTo(0, H);
  ctx.closePath();
  ctx.fill();

  // Gold accent stripe
  ctx.fillStyle = '#d4af37';
  ctx.fillRect(155, 0, 12, H);

  // Gold diagonal stripe on left panel
  ctx.save();
  ctx.globalAlpha = 0.25;
  ctx.fillStyle = '#d4af37';
  ctx.beginPath();
  ctx.moveTo(0, H * 0.5);
  ctx.lineTo(160, H * 0.35);
  ctx.lineTo(160, H);
  ctx.lineTo(0, H);
  ctx.closePath();
  ctx.fill();
  ctx.restore();

  // Top right dark badge
  ctx.fillStyle = '#00091f';
  ctx.beginPath();
  ctx.moveTo(W, 0);
  ctx.lineTo(W - 200, 0);
  ctx.lineTo(W - 150, 100);
  ctx.lineTo(W, 80);
  ctx.closePath();
  ctx.fill();

  // Gold border frame (inner)
  ctx.strokeStyle = '#d4af37';
  ctx.lineWidth = 2.5;
  ctx.strokeRect(185, 20, W - 205, H - 40);
  ctx.strokeStyle = 'rgba(212,175,55,0.3)';
  ctx.lineWidth = 1;
  ctx.strokeRect(190, 25, W - 215, H - 50);

  // IWB Logo on left panel
  ctx.fillStyle = '#d4af37';
  ctx.font = 'bold 22px Outfit, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('IWB', 80, 55);

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 11px Outfit, sans-serif';
  ctx.fillText('IIT WALA', 80, 76);
  ctx.fillStyle = '#d4af37';
  ctx.fillText('BHAIYAA', 80, 92);

  ctx.fillStyle = 'rgba(255,255,255,0.6)';
  ctx.font = '8px Outfit, sans-serif';
  ctx.fillText('LEARN · GROW · ACHIEVE', 80, 112);

  // 100% FREE badge on left
  ctx.save();
  ctx.shadowColor = 'rgba(212,175,55,0.6)';
  ctx.shadowBlur = 15;
  ctx.fillStyle = '#d4af37';
  ctx.beginPath();
  ctx.arc(80, H - 130, 55, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  ctx.fillStyle = '#00091f';
  ctx.font = 'bold 11px Outfit, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('100%', 80, H - 145);
  ctx.font = 'bold 15px Outfit, sans-serif';
  ctx.fillText('FREE', 80, H - 128);
  ctx.font = 'bold 9px Outfit, sans-serif';
  ctx.fillText('REGISTRATION', 80, H - 113);

  // Stars around badge
  for (let i = 0; i < 5; i++) {
    const angle = (i / 5) * Math.PI * 2 - Math.PI / 2;
    const bx = 80 + Math.cos(angle) * 65;
    const by = (H - 130) + Math.sin(angle) * 65;
    ctx.fillStyle = '#ffd700';
    ctx.font = '10px sans-serif';
    ctx.fillText('★', bx - 5, by + 4);
  }

  // Top right badge text
  ctx.fillStyle = '#ffd700';
  ctx.font = 'bold 9px Outfit, sans-serif';
  ctx.textAlign = 'right';
  ctx.fillText('FROM SCHOOL SUCCESS', W - 20, 22);
  ctx.fillText('TO CAREER SUCCESS', W - 20, 36);

  // Main content - Title
  ctx.textAlign = 'center';

  // Decorative line
  drawDecorativeLine(ctx, 540, 55);

  ctx.fillStyle = '#00091f';
  ctx.font = 'bold 32px "Playfair Display", serif';
  ctx.fillText('CERTIFICATE', 540, 95);

  ctx.fillStyle = '#d4af37';
  ctx.font = '14px Outfit, sans-serif';
  ctx.fillText('— OF PARTICIPATION —', 540, 118);

  drawDecorativeLine(ctx, 540, 135);

  ctx.fillStyle = '#555';
  ctx.font = '13px Outfit, sans-serif';
  ctx.fillText('PROUDLY PRESENTED TO', 540, 165);

  // Black ribbon
  ctx.fillStyle = '#1a1a2e';
  ctx.fillRect(250, 172, 580, 32);
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 14px Outfit, sans-serif';
  ctx.fillText('PROUDLY PRESENTED TO', 540, 193);

  // Student Name
  ctx.fillStyle = '#00091f';
  ctx.font = `italic bold ${studentName.length > 20 ? '30' : '38'}px "Playfair Display", serif`;
  ctx.fillText(studentName, 540, 255);

  // Gold underline
  ctx.strokeStyle = '#d4af37';
  ctx.lineWidth = 1.5;
  const nameWidth = Math.min(ctx.measureText(studentName).width + 40, 500);
  ctx.beginPath();
  ctx.moveTo(540 - nameWidth / 2, 268);
  ctx.lineTo(540 + nameWidth / 2, 268);
  ctx.stroke();

  ctx.fillStyle = '#666';
  ctx.font = '13px Outfit, sans-serif';
  ctx.fillText('for successfully participating in the', 540, 298);

  // Event title
  ctx.fillStyle = '#00091f';
  ctx.font = 'bold 20px Outfit, sans-serif';
  ctx.fillText('GRAND FREE ONLINE', 540, 328);

  ctx.fillStyle = '#d4af37';
  ctx.font = 'bold 18px Outfit, sans-serif';
  ctx.fillText('CAREER & EDUCATION SEMINAR 2026', 540, 352);

  ctx.fillStyle = '#666';
  ctx.font = '12px Outfit, sans-serif';
  ctx.fillText('— organized by —', 540, 374);

  ctx.fillStyle = '#00091f';
  ctx.font = 'bold 16px Outfit, sans-serif';
  ctx.fillText('IIT WALA', 500, 396);
  ctx.fillStyle = '#d4af37';
  ctx.fillText('BHAIYAA', 580, 396);

  // Details strip
  ctx.fillStyle = 'rgba(0,9,31,0.06)';
  ctx.fillRect(200, 412, 460, 58);

  const detailItems = [
    { icon: '📅', label: 'DATE', value: '28 JUNE 2026', subval: '(SUNDAY)' },
    { icon: '🕙', label: 'TIME', value: '11:00 AM', subval: 'ONWARDS' },
    { icon: '💻', label: 'PLATFORM', value: 'LIVE ON', subval: 'ZOOM' },
  ];

  detailItems.forEach((item, i) => {
    const x = 280 + i * 160;
    ctx.fillStyle = '#333';
    ctx.font = '10px Outfit, sans-serif';
    ctx.fillText(item.label, x, 432);
    ctx.fillStyle = '#00091f';
    ctx.font = 'bold 13px Outfit, sans-serif';
    ctx.fillText(item.value, x, 450);
    ctx.fillStyle = '#666';
    ctx.font = '10px Outfit, sans-serif';
    ctx.fillText(item.subval, x, 464);
  });

  // YOU WILL GET strip
  ctx.fillStyle = '#00091f';
  ctx.fillRect(200, 480, 460, 22);
  ctx.fillStyle = '#d4af37';
  ctx.font = 'bold 11px Outfit, sans-serif';
  ctx.fillText('✦  YOU WILL GET  ✦', 430, 496);

  const perks = ['📜 Certificate', '🗺️ Career PDF', '🎓 Scholarship', '👨‍👩‍👧 Parents Session', '▶️ Recording'];
  ctx.fillStyle = '#333';
  ctx.font = '9px Outfit, sans-serif';
  perks.forEach((p, i) => ctx.fillText(p, 225 + i * 92, 518));

  // Certificate ID
  ctx.fillStyle = '#888';
  ctx.font = '9px Outfit, sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('CERTIFICATE ID', W - 200, 175);
  ctx.fillStyle = '#00091f';
  ctx.font = 'bold 12px Outfit, sans-serif';
  const certId = 'IWB-2026-' + String(Math.floor(Math.random() * 9000) + 1000);
  ctx.fillText(certId, W - 200, 192);

  // QR code placeholder
  ctx.strokeStyle = '#d4af37';
  ctx.lineWidth = 2;
  ctx.strokeRect(W - 200, 205, 80, 80);
  ctx.fillStyle = '#f0f0f0';
  ctx.fillRect(W - 198, 207, 76, 76);
  // Simple QR pattern
  for (let r = 0; r < 7; r++) {
    for (let c = 0; c < 7; c++) {
      if (Math.random() > 0.4) {
        ctx.fillStyle = '#333';
        ctx.fillRect(W - 195 + c * 10, 210 + r * 10, 9, 9);
      }
    }
  }
  ctx.fillStyle = '#666';
  ctx.font = '8px Outfit, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('SCAN TO VERIFY', W - 160, 298);

  // Signature
  ctx.fillStyle = '#333';
  ctx.font = 'italic bold 20px "Playfair Display", serif';
  ctx.textAlign = 'right';
  ctx.fillText('Ashutosh Tripathi', W - 30, H - 80);
  ctx.fillStyle = '#555';
  ctx.font = '9px Outfit, sans-serif';
  ctx.fillText('Founder & Director', W - 30, H - 65);
  ctx.fillStyle = '#d4af37';
  ctx.font = 'bold 9px Outfit, sans-serif';
  ctx.fillText('IIT WALA BHAIYAA', W - 30, H - 52);

  // Signature line
  ctx.strokeStyle = '#aaa';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(W - 220, H - 92);
  ctx.lineTo(W - 30, H - 92);
  ctx.stroke();

  // Bottom motto
  ctx.fillStyle = '#d4af37';
  ctx.font = 'italic 12px "Playfair Display", serif';
  ctx.textAlign = 'center';
  ctx.fillText('✦ The Right Guidance Today, Bright Future Tomorrow! ✦', 540, H - 25);

  // Watermark
  ctx.save();
  ctx.globalAlpha = 0.04;
  ctx.fillStyle = '#00091f';
  ctx.font = 'bold 90px Outfit, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('IWB', 540, H / 2 + 30);
  ctx.restore();
}

function drawDecorativeLine(ctx, cx, y) {
  ctx.strokeStyle = '#d4af37';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(cx - 140, y);
  ctx.lineTo(cx - 20, y);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(cx + 20, y);
  ctx.lineTo(cx + 140, y);
  ctx.stroke();
  ctx.fillStyle = '#d4af37';
  ctx.font = '10px serif';
  ctx.textAlign = 'center';
  ctx.fillText('✦', cx, y + 4);
}

function downloadCertificate() {
  const canvas = document.getElementById('cert-canvas');
  const link = document.createElement('a');
  link.download = 'IWB_Certificate_of_Participation_2026.png';
  link.href = canvas.toDataURL('image/png', 1.0);
  link.click();
  showToast('Certificate downloaded successfully! 🎉', 'success');
}

// ==========================================
// BOOKING FORM
// ==========================================
function handleBooking(e) {
  e.preventDefault();
  const name = document.getElementById('book-name').value.trim();
  const phone = document.getElementById('book-phone').value.trim();
  const student = document.getElementById('book-student').value.trim();
  const cls = document.getElementById('book-class').value;
  const subject = document.getElementById('book-subject').value;

  if (!name || !phone || !student || !cls || !subject) {
    showToast('Please fill all required fields!', 'error');
    return;
  }
  if (phone.length !== 10 || !/^\d+$/.test(phone)) {
    showToast('Please enter a valid 10-digit phone number!', 'error');
    return;
  }

  const submitBtn = document.querySelector('#booking-form button[type="submit"]');
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Booking...';

  setTimeout(() => {
    document.getElementById('booking-form-wrap').style.display = 'none';
    document.getElementById('booking-success').classList.add('active');
    showToast(`Demo booked for ${student}! Our team will contact ${name} on WhatsApp. 🎉`, 'success');
  }, 1500);
}

// ==========================================
// MERCHANDISE SIZE SELECTOR
// ==========================================
function selectSize(btn, productId) {
  const parent = btn.closest('.merch-size-selector');
  parent.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

function enquireMerch(productName) {
  const msg = encodeURIComponent(`Hi IIT Wala Bhaiyaa! I'm interested in purchasing the ${productName}. Please share the ordering details.`);
  window.open(`https://wa.me/919873996314?text=${msg}`, '_blank');
}

// ==========================================
// COPY PHONE NUMBER
// ==========================================
document.querySelectorAll('a[href^="tel:"]').forEach(link => {
  link.addEventListener('click', () => {
    showToast('Calling 9873996314...', 'success');
  });
});

// ==========================================
// SMOOTH ANCHOR SCROLL
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ==========================================
// PROGRAM CARD ENTRANCE ANIMATION
// ==========================================
const cardObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, 100);
      cardObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.program-card').forEach((card, i) => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(30px)';
  card.style.transition = `opacity 0.5s ease ${i * 0.1}s, transform 0.5s ease ${i * 0.1}s`;
  cardObserver.observe(card);
});

// ==========================================
// MERCHANDISE IMAGE FALLBACK SETUP
// ==========================================
// Attempt to load real merch images; if missing, CSS gradient placeholders are used
(function setupMerchImages() {
  const img1 = document.getElementById('merch-img-1');
  const img2 = document.getElementById('merch-img-2');
  if (img1) img1.src = 'images/merch_blue_tshirt.png';
  if (img2) img2.src = 'images/merch_polo.png';
})();

console.log('%c IIT Wala Bhaiyaa 🎓 ', 'background:#00205b; color:#ffd700; font-size:18px; font-weight:bold; padding:10px 20px; border-radius:8px;');
console.log('%c Dream. Believe. Achieve. ', 'color:#d4af37; font-size:14px; font-style:italic;');
