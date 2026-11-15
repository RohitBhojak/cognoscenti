const syncCounter = (el: Element | null) => {
  if (!(el instanceof HTMLTextAreaElement) || !el.dataset.characterCounter) return;
  const counter = document.getElementById(`${el.dataset.characterCounter}-count`);
  if (!counter) return;

  const len = el.value.length;
  counter.textContent = String(len);
  counter.parentElement?.classList.toggle('text-error', el.maxLength > 0 && len >= el.maxLength);
};

const syncAll = (root: ParentNode = document) => {
  if (root instanceof Element) syncCounter(root);
  root.querySelectorAll('textarea[data-character-counter]').forEach(syncCounter);
};

document.addEventListener('input', (e) => syncCounter(e.target as Element));
document.addEventListener('reset', (e) => queueMicrotask(() => syncAll(e.target as ParentNode)));
document.addEventListener('htmx:load', (e) => syncAll((e as CustomEvent).detail?.elt ?? e.target));
syncAll();
