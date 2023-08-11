export default {
  encode(url: string): string {
    return encodeURIComponent(url)
  },
  decode(encodedStr: string): string {
    return decodeURIComponent(encodedStr)
  }
}
