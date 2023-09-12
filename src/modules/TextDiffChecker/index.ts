import { diffChars, diffLines, diffWords, type Change } from 'diff'

export type diffType = 'lines' | 'words' | 'chars'

export default function textDiff(
  oldString: string,
  newString: string,
  diffType: diffType
): HTMLSpanElement[] {
  let delta: Change[] = []
  if (diffType === 'lines') {
    delta = diffLines(oldString, newString)
  }

  if (diffType === 'words') {
    delta = diffWords(oldString, newString)
  }

  if (diffType === 'chars') {
    delta = diffChars(oldString, newString)
  }

  const final = delta.map((e) => {
    const span = document.createElement('span')
    if (e.added) {
      span.classList.add('added')
    } else if (e.removed) {
      span.classList.add('removed')
    }
    span.innerText = e.value

    return span
  })

  return final
}
