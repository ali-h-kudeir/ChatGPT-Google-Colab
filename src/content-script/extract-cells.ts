export function insertAfter(newNode: Element, referenceNode: Element) {
  (referenceNode.parentNode as Element).insertBefore(newNode, referenceNode.nextSibling);
}
