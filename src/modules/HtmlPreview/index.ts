import DOMPurify from 'dompurify'

export default function sanitize(contents: string): string {
  return DOMPurify.sanitize(contents)
}
