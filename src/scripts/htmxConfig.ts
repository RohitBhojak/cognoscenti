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
