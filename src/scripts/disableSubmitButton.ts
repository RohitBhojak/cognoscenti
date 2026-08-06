const formHasError = () => {
  const form = document.querySelector('form');
  if (!form) return false;
  if (!form.checkValidity()) return true;

  if (form.dataset.validateInline) {
    const errors = form.querySelectorAll('[data-error]');
    return Array.from(errors).some((error) => error.innerHTML.trim() !== '');
  }

  return false;
};

const updateSubmitButtonState = () => {
  const submitButton = document.querySelector('button[type="submit"]') as HTMLButtonElement | null;
  if (!submitButton) return;

  submitButton.disabled = formHasError();
};

document.body.addEventListener('htmx:afterSwap', updateSubmitButtonState);
document.body.addEventListener('input', updateSubmitButtonState);
