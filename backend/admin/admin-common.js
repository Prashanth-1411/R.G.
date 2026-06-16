(function () {
  const NAV = [
    { href: 'dashboard.html', icon: 'fa-chart-pie', label: 'Dashboard' },
    { href: 'navbar.html', icon: 'fa-bars', label: 'Navbar' },
    { href: 'sliders.html', icon: 'fa-images', label: 'Hero Sliders' },
    { href: 'pages.html', icon: 'fa-file-alt', label: 'Pages' },
    { href: 'services.html', icon: 'fa-cogs', label: 'Services' },
    { href: 'testimonials.html', icon: 'fa-quote-left', label: 'Testimonials' },
    { href: 'blogs.html', icon: 'fa-newspaper', label: 'Blog' },
    { href: 'locations.html', icon: 'fa-map-marker-alt', label: 'Locations' },
    { href: 'inquiries.html', icon: 'fa-envelope', label: 'Inquiries' },
    { href: 'settings.html', icon: 'fa-sliders-h', label: 'Site Settings' },
  ];

  window.ADMIN_API = window.location.origin.replace(/:\d+$/, ':5000');

  window.initAdminShell = function initAdminShell(activePage) {
    const token = localStorage.getItem('token');
    if (!token && !activePage.endsWith('index.html')) {
      window.location.href = 'index.html';
      return null;
    }

    const nav = document.getElementById('adminNav');
    if (nav) {
      nav.innerHTML = NAV.map((item) => {
        const isActive = item.href === activePage;
        const cls = isActive
          ? 'flex items-center gap-3 px-4 py-3 rounded-xl bg-blue-600/20 text-blue-400 font-semibold text-sm'
          : 'flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-slate-300 hover:text-white text-sm transition-all';
        return `<a href="${item.href}" class="${cls}"><i class="fas ${item.icon} w-5"></i> ${item.label}</a>`;
      }).join('');
    }

    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user.name) {
      const set = (id, val) => {
        const el = document.getElementById(id);
        if (el) el.textContent = val;
      };
      set('userName', user.name);
      set('userEmail', user.email);
      set('profileName', user.name);
      set('profileEmail', user.email);
      const letter = user.name.charAt(0).toUpperCase();
      ['userAvatar', 'profileAvatar'].forEach((id) => {
        const el = document.getElementById(id);
        if (el) el.textContent = letter;
      });
    }

    // Load and display site logo in sidebar
    (async () => {
      try {
        const res = await fetch(window.ADMIN_API + '/api/settings');
        const settings = await res.json();
        if (settings.logo) {
          const brandIcon = document.querySelector('aside .border-b .gap-3 > div:first-child');
          if (brandIcon) {
            const logoUrl = window.ADMIN_API + '/' + settings.logo.replace(/^\//, '');
            brandIcon.innerHTML = '<img src="' + logoUrl + '" alt="Logo" class="max-h-9 max-w-9 object-contain" onerror="this.style.display=\'none\'" />';
            brandIcon.className = brandIcon.className.replace(/bg-blue-600 rounded-xl/g, '') + ' flex items-center justify-center';
          }
        }
      } catch {}
    })();

    return token;
  };

  window.adminLogout = function adminLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = 'index.html';
  };
})();
