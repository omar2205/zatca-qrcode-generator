import { toBase64, toTlv } from '../utils'
import { Tag } from './Tag'
import QRious from 'qrious'

export interface iInvoice {
  seller_name: string
  vat_number: string | number
  invoice_date: string
  total: number
  tax_amount: number
}

class Invoice {
  seller_name: string
  vat_number: string | number
  invoice_date: string
  total: number
  tax_amount: number

  private _tlv: string

  constructor(opts: iInvoice) {
    this.seller_name = opts.seller_name
    this.vat_number = opts.vat_number
    this.invoice_date = opts.invoice_date
    this.total = opts.total
    this.tax_amount = opts.tax_amount

    this._tlv = toTlv([
      new Tag(1, this.seller_name),
      new Tag(2, this.vat_number.toString()),
      new Tag(3, this.invoice_date),
      new Tag(4, this.total.toString()),
      new Tag(5, this.tax_amount.toString()),
    ])
  }

  base64() {
    return toBase64(this._tlv)
  }

  /**
   * @returns Fatoora QRCode in an image base64
   */
  qrcode() {
    const qr = new QRious({
      value: this.base64(),
      padding: 25,
      size: 512
    })
    return qr.toDataURL()
  }
}

export default Invoice
