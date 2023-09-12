const textarea = document.createElement('textarea')

export default function useEncode(text: string): string {
  textarea.innerText = text

  return textarea.innerHTML.split('<br>').join('\n')
}
