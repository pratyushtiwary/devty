export default function FormatJSON(json: string) {
  // check if the json string is valid
  let parsed
  try {
    parsed = JSON.parse(json)
  } catch (e) {
    throw Error('Failed to validate JSON')
  }

  return JSON.stringify(parsed, null, 4)
}
