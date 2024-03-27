function isInBrackets(item: string): boolean {
  return item.startsWith('<') && item.endsWith('>');
}

function removeBrackets(item: string): string {
  if (!isInBrackets(item)) {
    return item;
  }

  return item.slice(1, -1);
}

function addBrackets(item: string): string {
  if (isInBrackets(item)) {
    return item;
  }

  return '<' + item + '>';
}

function isEqualExceptBrackets(item1: string, item2: string): boolean {
  return removeBrackets(item1) === removeBrackets(item2)
}

export {
  isInBrackets,
  removeBrackets,
  addBrackets,
  isEqualExceptBrackets
};
