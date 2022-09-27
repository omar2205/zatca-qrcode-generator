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
