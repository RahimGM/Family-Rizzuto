// [1] منطق التنقل بين الأقسام
function switchTab(tabId) {
    // إخفاء كافة الأقسام بإزالة الكلاس النشط
    document.querySelectorAll('.page-section').forEach(sec => {
        sec.classList.remove('active-section');
    });

    // إظهار القسم المختار
    const targetSection = document.getElementById(tabId);
    if (targetSection) {
        targetSection.classList.add('active-section');
    }

    // تحديث أزرار القائمة (Navbar)
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    const activeLink = document.getElementById('nav-' + tabId);
    if (activeLink) {
        activeLink.classList.add('active');
    }

    // العودة للأعلى عند التغيير
    window.scrollTo(0, 0);
}

// [2] منطق الماوس والذيل
const dot = document.getElementById('cursor-dot');
const outline = document.getElementById('cursor-outline');
const trails = [];

// إنشاء ذيل الماوس (8 قطع)
for (let i = 0; i < 8; i++) {
    const t = document.createElement('div');
    t.className = 'cursor-trail';
    document.body.appendChild(t);
    trails.push({ el: t, x: 0, y: 0 });
}

let mX = 0, mY = 0, dX = 0, dY = 0, oX = 0, oY = 0;

window.addEventListener('mousemove', e => {
    mX = e.clientX;
    mY = e.clientY;
    dot.style.opacity = outline.style.opacity = 1;
});

function animateCursor() {
    // حركة النقطة الأساسية
    dX += (mX - dX) * 0.2;
    dY += (mY - dY) * 0.2;
    dot.style.transform = `translate(${dX}px, ${dY}px) translate(-50%, -50%)`;

    // حركة الدائرة الخارجية
    oX += (mX - oX) * 0.1;
    oY += (mY - oY) * 0.1;
    outline.style.transform = `translate(${oX}px, ${oY}px) translate(-50%, -50%)`;
    
    // حركة الذيل
    let nX = dX, nY = dY;
    trails.forEach((t, i) => {
        t.x += (nX - t.x) * 0.3;
        t.y += (nY - t.y) * 0.3;
        t.el.style.transform = `translate(${t.x}px, ${t.y}px) translate(-50%, -50%) scale(${(8-i)/8})`;
        nX = t.x; 
        nY = t.y;
    });
    requestAnimationFrame(animateCursor);
}
animateCursor();

// منع القائمة اليمينية للحماية
document.addEventListener('contextmenu', e => e.preventDefault());