const textarea = document.createElement('textarea')
export default {
  encode(text: string): string {
    textarea.innerText = text

    return textarea.innerHTML.split('<br>').join('\n')
  },
  decode(text: string): string {
    textarea.innerHTML = text

    return textarea.value
  }
}
