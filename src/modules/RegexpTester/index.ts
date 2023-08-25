export function formatResults(result: IterableIterator<RegExpMatchArray>, format: string): string {
  let results = ``

  let match = result.next(),
    temp = ''
  const specials = format.match(/\$([0-9]*)/g)

  while (!match.done) {
    temp = format
    // @ts-ignore
    specials.forEach((e: string) => {
      temp = temp.replace(new RegExp('\\$' + e.slice(1), 'g'), match.value[parseInt(e.slice(1))])
    })
    results += temp
    match = result.next()
  }

  return results
}

export function highlight(regex: string, content: string, className: string = 'match') {
  return content.replace(new RegExp(regex, 'g'), `<span class="${className}">$&</span>`)
}

export default function matcher(regex: string, content: string, format: string = '$0\\n'): string {
  const matches = content.matchAll(new RegExp(regex, 'g'))
  const results = formatResults(matches, format)

  return results.replace(/\\n/g, '\n')
}
