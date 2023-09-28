import { toDataURL } from 'qrcode'
import QrScanner from 'qr-scanner'

export async function generateQRCode(value: string): Promise<string> {
  try {
    return await toDataURL(value)
  } catch (error) {
    // Empty if not wrong format
    return ''
  }
}

export async function readQRCode(value: File): Promise<string> {
  const base64Image: string = await new Promise((r, e) => {
    let output: string = ''

    const reader = new FileReader()

    reader.onloadend = () => {
      output = String(reader.result)
      r(output)
    }

    reader.readAsDataURL(value)
  })
  return await QrScanner.scanImage(base64Image)
}

export const SUPPORTED_TEMPLATES = {
  url: {
    label: 'URL',
    template: 'https://example.com'
  },
  phone: {
    label: 'Phone',
    template: 'tel:+1234567890'
  },
  sms: {
    label: 'SMS',
    template: 'sms:+1234567890?body=Hello%20there'
  },
  email: {
    label: 'Email',
    template: 'mailto:contact@example.com?subject=Hello&body=Message%20here'
  },
  vcard: {
    label: 'vCard',
    template:
      'BEGIN:VCARD\nVERSION:2.1\nFN:Full name\nN:Last name;First name\nTITLE:Your Title\nTEL;CELL:mobile-phone-number\nTEL;WORK;VOICE:business-phone-number\nTEL;HOME;VOICE:personal-phone-number\nEMAIL;HOME;INTERNET:personal-email@example.com\nEMAIL;WORK;INTERNET:business-email@exapmel.com\nURL:https://example.com\nADR:;;address street;City name;;000000;Country name\nORG:Company name\nEND:VCARD'
  },
  event: {
    label: 'Event',
    template:
      'BEGIN:VEVENT\nSUMMARY:Sample Event\nDTSTART:20230101T090000Z\nDTEND:20230101T120000Z\nLOCATION:Sample Location\nDESCRIPTION:Sample event description\nEND:VEVENT'
  },
  wifi: {
    label: 'WiFi',
    template: 'WIFI:T:WPA;S:MyNetwork;P:MyPassword;;'
  }
}

export type SUPPORTED_TEMPLATES_KEYS = keyof typeof SUPPORTED_TEMPLATES
