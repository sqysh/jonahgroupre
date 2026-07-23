export function getListingImageUrl(path: string): string {
  if (!path) return ''
  if (path.startsWith('http')) return path // already absolute
  return `https://cdn.repliers.io/${path}`
}
