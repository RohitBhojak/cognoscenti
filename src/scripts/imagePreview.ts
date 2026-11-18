document.addEventListener('change', (e) => {
  const input = e.target;
  if (!(input instanceof HTMLInputElement) || !input.matches('[data-image-input]')) return;

  const container = input.closest('label');
  const preview = container?.querySelector<HTMLImageElement>('[data-image-preview]');
  const file = input.files?.[0];
  if (!container || !preview || !file) return;

  if (preview.src.startsWith('blob:')) URL.revokeObjectURL(preview.src);

  preview.src = URL.createObjectURL(file);
  preview.alt = preview.title = file.name;
  preview.classList.remove('hidden');

  container.querySelector('[data-image-overlay]')?.classList.remove('hidden');
  container.querySelector('[data-image-placeholder]')?.classList.add('hidden');
});
