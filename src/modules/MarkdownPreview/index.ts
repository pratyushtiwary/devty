import { Marked } from 'marked'
import { markedHighlight } from 'marked-highlight'
import hljs from 'highlight.js'
import DOMPurify from 'dompurify'

const marked = new Marked(
  markedHighlight({
    langPrefix: 'hljs language-',
    highlight(code: string, lang: string) {
      const language = hljs.getLanguage(lang) ? lang : 'plaintext'
      return hljs.highlight(code, { language }).value
    }
  })
)

export default async function convert(contents: string): Promise<string> {
  // eslint-disable-next-line no-misleading-character-class
  contents = DOMPurify.sanitize(contents.replace(/^[\u200B\u200C\u200D\u200E\u200F\uFEFF]/, ''))
  return (await marked.parse(contents)) || ''
}
