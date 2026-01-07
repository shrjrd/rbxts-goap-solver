export function fastHash(o: Record<string, number | boolean>) {
  const keys: string[] = []
  for (const [k] of pairs(o)) keys.push(k)
  keys.sort()

  let result = ''
  
  for (const k of keys) result += `${k}${o[k]}`

  return result
}
