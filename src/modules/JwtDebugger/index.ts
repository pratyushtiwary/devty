import {
  SignJWT,
  generateKeyPair,
  generateSecret,
  decodeProtectedHeader,
  decodeJwt,
  importPKCS8,
  importSPKI,
  jwtVerify,
  exportSPKI,
  exportPKCS8
} from 'jose'

export const supportedAlgos = [
  'HS256',
  'HS384',
  'HS512',
  'PS256',
  'PS384',
  'PS512',
  'RS256',
  'RS384',
  'RS512',
  'ES256',
  'ES384',
  'ES512'
]

export interface Keys {
  publicKey?: string
  key: string
}

export function Colorize(jwtToken: string, classes: string[]) {
  if (jwtToken.replace(/\s*/, '') !== '') {
    let temp = jwtToken.split('.')

    temp = temp.map((e, i) =>
      i < classes.length
        ? `<span class="${classes[i]}">${e}</span>`
        : `<span class="${classes[classes.length - 1]}">${e}</span>`
    )

    return temp.join('.')
  }
  return ''
}

export interface JWTData {
  headers: Object
  payload: Object
}

export interface JWTResult {
  token: string
  privateKey: string
  publicKey: string
}

export default {
  getHeadersS(header: string) {
    return JSON.stringify(decodeProtectedHeader(header), null, 4)
  },
  getHeaders(header: string) {
    return decodeProtectedHeader(header)
  },
  getPayloadS(token: string) {
    return JSON.stringify(decodeJwt(token), null, 4)
  },
  getPayload(token: string) {
    return decodeJwt(token)
  },
  async verifySignature(token: string, algo: string, keys: Keys): Promise<boolean> {
    try {
      // check if algo uses hash
      if (algo.toLowerCase().startsWith('h')) {
        // verify hash
        const key = new TextEncoder().encode(keys.key)
        await jwtVerify(token, key)
        return true
      } else {
        // verify public and private keys
        if (!keys.publicKey || !keys.key) {
          return false
        }
        const publicKey = await importSPKI(keys.publicKey, algo)
        await jwtVerify(token, publicKey)
        return true
      }
    } catch (_) {
      return false
    }
  },
  async generateToken(
    data: JWTData,
    algo: string,
    keys: Keys | undefined = undefined
  ): Promise<JWTResult> {
    let token: string = '',
      privateKey: string = ' ',
      publicKey: string = ''
    if (algo.toLowerCase().startsWith('h')) {
      let key = new TextEncoder().encode(' ')
      if (keys?.key) {
        key = new TextEncoder().encode(keys.key)
      }
      const jwt = new SignJWT({ ...data.payload }).setProtectedHeader({
        ...data.headers,
        typ: 'JWT',
        alg: algo
      })
      token = await jwt.sign(key)
      privateKey = keys?.key || ' '
    } else {
      let { publicKey: pubKey, privateKey: prvKey } = await generateKeyPair(algo, {
        extractable: true
      })
      if (keys?.key) {
        prvKey = await importPKCS8(keys.key, algo)
      }

      if (keys?.publicKey) {
        pubKey = await importPKCS8(keys.publicKey, algo)
      }
      const jwt = new SignJWT({ ...data.payload }).setProtectedHeader({
        ...data.headers,
        typ: 'JWT',
        alg: algo
      })
      token = await jwt.sign(prvKey)
      privateKey = await exportPKCS8(prvKey)
      publicKey = await exportSPKI(pubKey)
    }

    return {
      token,
      privateKey,
      publicKey
    }
  }
}
