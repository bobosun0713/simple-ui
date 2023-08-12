export function addClass(el: HTMLElement, className: string) {
  if (!el) return;
  const classes = (className || "").split(" ");
  for (const name of classes) {
    el.classList.add(name);
  }
}

export function removeClass(el: HTMLElement, className: string) {
  if (!el) return;
  const classes = (className || "").split(" ");
  for (const name of classes) {
    el.classList.remove(name);
  }
}

export function setStyle(el: HTMLElement, cssKey: string, cssValue: string) {
  if (!el) return;
  el.setAttribute(cssKey, cssValue);
}
