import { Buffer } from 'buffer/'
import { toHex } from '../utils'

export class Tag {
  private tag: number
  private value: string

  constructor(tag: number, value: string) {
    this.tag = tag
    this.value = value
  }

  private getValueByteLength() {
    return Buffer.byteLength(this.value)
  }

  toTlv(): string {
    return toHex(this.tag) + toHex(this.getValueByteLength()) + this.value
  }
}
