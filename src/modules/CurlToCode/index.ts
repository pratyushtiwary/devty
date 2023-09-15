import {
  toAnsible,
  toCFML,
  toClojure,
  toCSharp,
  toDart,
  toElixir,
  toGo,
  toHarString,
  toHTTP,
  toHttpie,
  toJava,
  toJavaScript,
  toJsonString,
  toKotlin,
  toMATLAB,
  toOCaml,
  toPhp,
  toPowershellRestMethod,
  toPython,
  toR,
  toRuby,
  toRust,
  toSwift,
  toWget
} from 'curlconverter'

export const SUPPORTED_CONVERTERS = {
  ansible: toAnsible,
  cfml: toCFML,
  clojure: toClojure,
  csharp: toCSharp,
  dart: toDart,
  elixir: toElixir,
  go: toGo,
  har: toHarString,
  http: toHTTP,
  httpie: toHttpie,
  java: toJava,
  javascript: toJavaScript,
  json: toJsonString,
  kotlin: toKotlin,
  matlab: toMATLAB,
  ocaml: toOCaml,
  php: toPhp,
  powershell: toPowershellRestMethod,
  python: toPython,
  r: toR,
  ruby: toRuby,
  rust: toRust,
  swift: toSwift,
  wget: toWget
}

export type SUPPORTED_LANGUAGES = keyof typeof SUPPORTED_CONVERTERS

export default function convert(cURLString: string, language: SUPPORTED_LANGUAGES = 'javascript') {
  if (!SUPPORTED_CONVERTERS[language]) return cURLString
  return SUPPORTED_CONVERTERS[language](cURLString)
}
