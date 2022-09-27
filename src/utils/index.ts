import { Buffer } from 'buffer/'
import { Tag } from '../models/Tag'

export function toHex(value: number): string {
  let hex = value.toString(16)

  if (hex.length % 2 > 0) {
    hex = '0' + hex
  }

  return Buffer.from(hex, 'hex').toString('utf-8')
}

export function toTlv(tags: Tag[]) {
  return tags.map((tag) => tag.toTlv()).join('')
}

export function toBase64(s: string) {
  return Buffer.from(s).toString('base64')
}

export interface FileShareOptions {
  url: string,
  filename: string,
  title: string,
  text?: string
}

export async function shareFile(opts: FileShareOptions) {
  const blob = await fetch(opts.url).then(r => r.blob())

  const data = {
    files: [
      new File([blob], opts.filename, {
        type: blob.type,
      })
    ],
    title: opts.title,
    text: opts.text
  }

  try {
    if (!navigator.canShare(data)) {
      throw new Error('cant share')
    }

    await navigator.share(data)
  } catch(err) {
    console.error('Share Catch', err)
  }
}
