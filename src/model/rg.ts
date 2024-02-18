

export function isNumber(input: string): boolean {
  const regex = /^[0-9]+$/; 
  return regex.test(input);
}