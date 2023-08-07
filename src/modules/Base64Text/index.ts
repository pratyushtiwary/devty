export default function Base64Text(value: string, decode: boolean = false): string {
  if (decode) {
    return atob(value)
  }

  return btoa(value)
}
