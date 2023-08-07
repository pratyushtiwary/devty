export default async function Base64Image(value: File): Promise<string> {
  return await new Promise((r, e) => {
    let output: string = ''

    const reader = new FileReader()

    reader.onloadend = () => {
      output = String(reader.result)
      r(output)
    }

    reader.readAsDataURL(value)
  })
}
