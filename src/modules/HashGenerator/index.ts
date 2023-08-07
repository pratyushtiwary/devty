import CryptoJS from 'crypto-js'

interface Algos {
  [key: string]: Function
}

export interface GenerateHashReturn {
  [key: string]: string
}

export default function generateHash(value: string): GenerateHashReturn {
  const algos: Algos = {
    MD5: CryptoJS.MD5,
    SHA1: CryptoJS.SHA1,
    SHA3: CryptoJS.SHA3,
    SHA224: CryptoJS.SHA224,
    SHA256: CryptoJS.SHA256,
    SHA384: CryptoJS.SHA384,
    SHA512: CryptoJS.SHA512,
    RIPEMD160: CryptoJS.RIPEMD160
  }

  const output: GenerateHashReturn = {}

  Object.keys(algos).forEach((e) => {
    output[e] = algos[e](value).toString()
  })

  return output
}
