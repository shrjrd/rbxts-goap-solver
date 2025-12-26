export function fastHash(o: Record<string, number | boolean>) {
  let result = ''

  for (const k in o) result += `${k}${o[k]}`

  return result
}
