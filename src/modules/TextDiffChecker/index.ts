import { diffChars, diffLines, diffWords, type Change } from 'diff'

export type diffType = 'lines' | 'words' | 'chars'

export default function textDiff(oldString: string, newString: string, diffType: diffType): string {
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

  const final = delta
    .map((e) => {
      if (e.added) {
        return `<span class="added">${e.value}</span>`
      } else if (e.removed) {
        return `<span class="removed">${e.value}</span>`
      } else {
        return `<span>${e.value}</span>`
      }
    })
    .join('')

  return final
}
