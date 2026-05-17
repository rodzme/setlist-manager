type Child = Node | string | Child[];

function appendChild(parent: Element, child: Child): void {
  if (Array.isArray(child)) {
    for (const nested of child) appendChild(parent, nested);
    return;
  }
  parent.append(child instanceof Node ? child : document.createTextNode(child));
}

export function el<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  props?: {
    className?: string;
    text?: string;
    attrs?: Record<string, string>;
  },
  ...children: Child[]
): HTMLElementTagNameMap[K] {
  const node = document.createElement(tag);
  if (props?.className) node.className = props.className;
  if (props?.text !== undefined) node.textContent = props.text;
  if (props?.attrs) {
    for (const [key, value] of Object.entries(props.attrs)) {
      node.setAttribute(key, value);
    }
  }
  for (const child of children) {
    appendChild(node, child);
  }
  return node;
}

export function clearChildren(parent: Element): void {
  while (parent.firstChild) parent.removeChild(parent.firstChild);
}
