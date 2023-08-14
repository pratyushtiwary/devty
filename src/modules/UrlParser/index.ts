export interface QueryString {
  [key: string]: string
}

export interface ParsedURL {
  [key: string]: string | undefined
}

export default {
  parseURL(url: string): ParsedURL {
    const parsed = new URL(url)
    const qs = parsed.searchParams.toString()
    const contents: ParsedURL = {
      Protocol: parsed.protocol.endsWith(':') ? parsed.protocol.slice(0, -1) : parsed.protocol,
      Host: parsed.host,
      Path: parsed.pathname,
      'File name': parsed.pathname.split('/').pop(),
      Query: qs
    }

    return contents
  },
  getQueryString(url: string): string {
    const qs: QueryString = {}

    const parsed = new URL(url)

    parsed.searchParams.forEach((value, key) => {
      qs[key] = value
    })

    return JSON.stringify(qs, null, 4)
  }
}
