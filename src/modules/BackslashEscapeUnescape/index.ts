export default {
  escape: (content: string) => {
    try {
      return JSON.stringify(content).slice(1, -1).replace(/\\n/g, '\\\\n')
    } catch (_) {
      return content
    }
  },
  unescape: (content: string) => {
    try {
      return JSON.parse('"' + content.replace(/\\\\/g, '\\') + '"')
    } catch (_) {
      return content
    }
  }
}
