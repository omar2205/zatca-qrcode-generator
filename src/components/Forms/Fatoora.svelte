<script lang="ts">
  import { onMount } from 'svelte'
  import {
    Block,
    Button,
    Link,
    List,
    Icon,
    ListInput,
    Toolbar,
    Sheet,
    Toast,
  } from 'konsta/svelte'
  import Fatora, { iInvoice } from '../../models/Fatora'
  import { shareFile } from '../../utils'

  let qr_url = ''
  let invoice_name = ''
  let isOpen = false
  let isToastOpened = false
  let toastMessage = ''

  const values: Partial<iInvoice> = {}

  const SAVE_INFO = ['seller_name', 'vat_number']

  const onValueChange = (elName: string, value: string) => {
    values[elName] = value
    if (SAVE_INFO.includes(elName.toLowerCase())) {
      localStorage.setItem(elName, value)
    }
  }

  const get_invoice_name = () => {
    const now = new Date()
    return `invoice_${now.toLocaleDateString('en-CA')}_${
      now.toTimeString().split(' ')[0]
    }`
  }

  const generate = async () => {
    if (
      values.invoice_date &&
      values.seller_name &&
      values.tax_amount &&
      values.total &&
      values.vat_number
    ) {
      const f = new Fatora({
        seller_name: values.seller_name,
        vat_number: values.vat_number,
        invoice_date: values.invoice_date,
        total: Number(values.total),
        tax_amount: Number(values.tax_amount),
      })

      invoice_name = get_invoice_name()
      qr_url = await f.qrcode()
      isOpen = true
    } else {
      // auto close the toast
      setTimeout(() => {
        isToastOpened = false
      }, 2000)
      isToastOpened = true
      toastMessage = 'Please fill all the fields'
    }
  }

  const share_qrcode = async () => {
    await shareFile({
      url: qr_url,
      filename: `${get_invoice_name()}.png`,
      title: get_invoice_name()
    })
    .catch((r) => {
      console.log('inside,', r)
    })
  }

  onMount(() => {
    const { seller_name, vat_number } = localStorage
    if (seller_name) values.seller_name = seller_name
    if (vat_number) values.vat_number = vat_number
    // yyyy-MM-ddThh:mm
    const now = new Date()
    values.invoice_date =
      now.toLocaleDateString('en-CA') + 'T' + now.toTimeString().split(' ')[0]
  })
</script>

<List>
  <ListInput
    value={values.seller_name}
    onInput={(e) => onValueChange('seller_name', e.target.value)}
    label="Seller Name"
    outline
    floatingLabel={values.seller_name}
  />
  <ListInput
    value={values.vat_number}
    onInput={(e) => onValueChange('vat_number', e.target.value)}
    label="Tax Number"
    outline
    floatingLabel={values.vat_number}
  />
  <ListInput
    value={values.invoice_date}
    onInput={(e) => onValueChange('invoice_date', e.target.value)}
    type="datetime-local"
    defaultValue="now"
    label="Invoice Date"
    outline
  />
  <ListInput
    onInput={(e) => onValueChange('total', e.target.value)}
    type="number"
    label="Total"
    outline
    floatingLabel
  />
  <ListInput
    onInput={(e) => onValueChange('tax_amount', e.target.value)}
    type="number"
    label="Tax Amount"
    outline
    floatingLabel
  />
  <Block>
    <Button onClick={generate}>Generate</Button>
  </Block>

  <Toast position="center" opened={isToastOpened}>
    <Button slot="button" clear inline onClick={() => (isToastOpened = false)}>
      Close
    </Button>
    <div class="shrink">{toastMessage}</div>
  </Toast>

  <Sheet
    opened={isOpen}
    onBackdropClick={() => (isOpen = false)}
    class="pb-safe w-full"
    style="height: min(500px, 50vh)"
  >
    <Toolbar top>
      <div class="left">Your invoice</div>
      <div class="right">
        <Link
          class="py-1 px-4 rounded-lg h-10 w-full"
          onClick={() => (isOpen = false)}>Done</Link
        >
      </div>
    </Toolbar>

    <div class="flex flex-col justify-center items-center gap-4 mt-4">
      <img src={qr_url} alt="qrcode" />
      <!-- TODO -->
      <div class="footer w-full max-w-md flex gap-4">
        <Link class="h-10 overflow-hidden w-full rounded-lg" href={qr_url} download={invoice_name}>
          <span class="material-symbols-outlined">download</span>
          <span>Download</span>
        </Link>
        <Link onClick={share_qrcode} class="h-10 overflow-hidden w-full rounded-lg">
          <span class="material-symbols-outlined">ios_share</span>
          <span>Share</span>
        </Link>
      </div>
    </div>
  </Sheet>
</List>

<style>
  img {
    max-width: 170px;
  }
  .footer {
    gap: 1rem;
    padding: 0 1rem;
    margin-top: 1rem;
  }
</style>
