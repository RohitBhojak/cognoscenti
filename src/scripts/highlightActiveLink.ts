const updateActiveLinks = () => {
  const currentPath = window.location.pathname;
  const handleActiveLink = (link: Element, activeClasses: string[]) => {
    const linkPath = link.getAttribute('href');
    const isActive = currentPath === linkPath;

    if (isActive) {
      link.classList.add(...activeClasses);
    } else {
      link.classList.remove(...activeClasses);
    }
  };
  document
    .querySelectorAll('#nav-list a')
    .forEach((link) => handleActiveLink(link, ['text-primary', 'border-b-2', 'border-primary']));

  document
    .querySelectorAll('.group a')
    .forEach((link) => handleActiveLink(link, ['text-primary', 'font-semibold']));
};

document.body.addEventListener('htmx:afterSettle', updateActiveLinks);
window.addEventListener('popstate', updateActiveLinks);
document.addEventListener('DOMContentLoaded', updateActiveLinks);
