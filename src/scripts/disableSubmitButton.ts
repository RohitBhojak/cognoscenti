const formHasError = () => {
  const form = document.querySelector('form');
  if (!form) return false;
  if (!form.checkValidity()) return true;

  const errors = form.querySelectorAll('[data-error]');

  return Array.from(errors).some((error) => error.innerHTML.trim() !== '');
};

const updateSubmitButtonState = () => {
  const submitButton = document.querySelector('button[type="submit"]') as HTMLButtonElement | null;
  if (!submitButton) return;

  submitButton.disabled = formHasError();
};

document.body.addEventListener('htmx:afterSwap', updateSubmitButtonState);
