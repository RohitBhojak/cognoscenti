// Allow htmx to render 4xx status responses
document.body.addEventListener('htmx:beforeSwap', (event: Event) => {
  const customEvent = event as CustomEvent<{
    xhr: XMLHttpRequest;
    shouldSwap: boolean;
    isError: boolean;
  }>;

  const status = customEvent.detail.xhr.status;

  if (status >= 400 && status < 500) {
    customEvent.detail.shouldSwap = true;
    customEvent.detail.isError = false;
  }
});

document.body.addEventListener('htmx:configRequest', (event: Event) => {
  const customEvent = event as CustomEvent<{
    elt: HTMLElement;
    parameters: Record<string, string | string[]>;
  }>;

  if (customEvent.detail.elt.id !== 'search') return;

  for (const [name, value] of Object.entries(customEvent.detail.parameters)) {
    if (value === '') {
      delete customEvent.detail.parameters[name];
    }
  }
});
