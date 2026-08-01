document.addEventListener('click', (event: MouseEvent) => {
  const target = event.target as HTMLElement | null;

  const button = target?.closest<HTMLButtonElement>('[data-toggle-password]');
  if (!button) return;

  const container = button.closest<HTMLElement>('.input-container');
  const input = container?.querySelector<HTMLInputElement>('input');

  const eyeIcon = button.querySelector<HTMLElement>('.icon-eye');
  const eyeOffIcon = button.querySelector<HTMLElement>('.icon-eye-off');

  if (input) {
    const isPassword = input.type === 'password';
    input.type = isPassword ? 'text' : 'password';

    // Toggle icon visibility
    if (eyeIcon && eyeOffIcon) {
      eyeIcon.classList.toggle('hidden', isPassword);
      eyeOffIcon.classList.toggle('hidden', !isPassword);
    }
  }
});
