const mobileViewport = window.matchMedia('(hover: none) and (pointer: coarse)');

if (mobileViewport.matches) {
  const DEFAULT_MARGIN = '-48% 0px -48% 0px';
  const observedCards = new WeakSet<HTMLElement>();
  const observersByMargin = new Map<string, IntersectionObserver>();

  const getObserverForMargin = (margin: string): IntersectionObserver => {
    let obs = observersByMargin.get(margin);
    if (!obs) {
      obs = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            entry.target.classList.toggle('is-active', entry.isIntersecting);
          }
        },
        { rootMargin: margin }
      );
      observersByMargin.set(margin, obs);
    }
    return obs;
  };

  const observeCards = (root: ParentNode) => {
    const cards: HTMLElement[] = [];

    if (root instanceof HTMLElement && root.matches('[data-center-focus]')) {
      cards.push(root);
    }
    cards.push(...root.querySelectorAll<HTMLElement>('[data-center-focus]'));

    for (const card of cards) {
      if (observedCards.has(card)) continue;

      const customMargin =
        card.getAttribute('data-center-focus') ||
        card.closest<HTMLElement>('[data-focus-margin]')?.dataset.focusMargin ||
        DEFAULT_MARGIN;

      getObserverForMargin(customMargin).observe(card);
      observedCards.add(card);
    }
  };

  // HTMX native initializer: runs on page load and after every swap
  document.body.addEventListener('htmx:load', (event) => {
    const target = (event as CustomEvent).detail?.elt || event.target;
    if (target instanceof HTMLElement || target instanceof Document) {
      observeCards(target);
    }
  });

  // Re-observe when navigating back/forward with hx-boost
  document.body.addEventListener('htmx:historyRestore', () => {
    observeCards(document);
  });
}
