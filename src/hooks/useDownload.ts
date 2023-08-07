function extractURLExtension(url: string): string {
  const temp = url.slice(0, 20).match(/\/+([\w\W]*)+;/)
  if (temp) return temp[1].split('+')[0]

  return ''
}

export default function useDownload(file: File | string) {
  let url: string,
    temp = file
  const a = document.createElement('a')

  a.style.display = 'none'

  if (file instanceof File) {
    temp = URL.createObjectURL(new Blob([file]))
    url = temp
    a.href = url
    a.download = file.name
  } else {
    url = file
    a.href = url
    a.download = 'download.' + extractURLExtension(url)
  }

  document.querySelector('body')?.appendChild(a)

  a.click()
  a.remove()
}
