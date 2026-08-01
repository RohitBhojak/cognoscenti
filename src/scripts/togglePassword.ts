document.addEventListener('click', (event: MouseEvent) => {
  const target = event.target as HTMLElement | null;

  // Find closest button inside a .input-container
  const button = target?.closest<HTMLButtonElement>('.input-container button');
  if (!button) return;

  const container = button.closest<HTMLElement>('.input-container');
  const input = container?.querySelector<HTMLInputElement>('input');

  if (input) {
    input.type = input.type === 'password' ? 'text' : 'password';
  }
});
