const mobileViewport = window.matchMedia('(hover: none) and (pointer: coarse)');

if (mobileViewport.matches) {
  const observedCards = new WeakSet<HTMLElement>();

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        entry.target.classList.toggle('is-active', entry.isIntersecting);
      }
    },
    {
      rootMargin: '-48% 0px -48% 0px',
    }
  );

  const getCards = (root: ParentNode) => {
    const cards: HTMLElement[] = [];

    if (root instanceof HTMLElement && root.matches('[data-center-focus]')) {
      cards.push(root);
    }

    cards.push(...root.querySelectorAll<HTMLElement>('[data-center-focus]'));
    return cards;
  };

  const observeCards = (root: ParentNode) => {
    for (const card of getCards(root)) {
      if (observedCards.has(card)) continue;

      observedCards.add(card);
      observer.observe(card);
    }
  };

  const unobserveCards = (root: ParentNode) => {
    for (const card of getCards(root)) {
      observer.unobserve(card);
      observedCards.delete(card);
      card.classList.remove('is-active');
    }
  };

  observeCards(document);

  // Covers cards added by any HTMX swap, including outerHTML sentinel swaps.
  const cardLifecycleObserver = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      for (const node of mutation.addedNodes) {
        if (node instanceof HTMLElement) observeCards(node);
      }

      for (const node of mutation.removedNodes) {
        if (node instanceof HTMLElement) unobserveCards(node);
      }
    }
  });

  cardLifecycleObserver.observe(document.body, { childList: true, subtree: true });

  document.body.addEventListener('htmx:afterSettle', (event) => {
    const { elt, target } = (event as CustomEvent<{ elt?: EventTarget; target?: EventTarget }>)
      .detail;

    if (elt instanceof HTMLElement) observeCards(elt);
    if (target instanceof HTMLElement) observeCards(target);
  });
}
