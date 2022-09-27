<script lang="ts">
  import { onMount } from 'svelte'
  import { Block, Button, Link, List, ListInput, Toolbar, Page, Popup, Sheet, Toast } from "konsta/svelte"
  import Fatora, { iInvoice } from '../../models/Fatora'

  let qr_url = ''
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


  const generate = async () => {
    if (values.invoice_date && values.seller_name && values.tax_amount && values.total && values.vat_number) {
      const f = new Fatora({
        seller_name: values.seller_name,
        vat_number: values.vat_number,
        invoice_date: values.invoice_date,
        total: Number(values.total),
        tax_amount: Number(values.tax_amount)
      })
  
      qr_url = await f.qrcode()
      isOpen = true
    } else {
      isToastOpened = true
      toastMessage = 'Please fill all the fields'
    }

  }

  onMount(() => {
    const { seller_name, vat_number} = localStorage
    if (seller_name) values.seller_name = seller_name
    if (vat_number) values.vat_number = vat_number
    // yyyy-MM-ddThh:mm
    const now = new Date()
    values.invoice_date = now.toLocaleDateString('en-CA')+'T'+now.toTimeString().split(' ')[0]
  })

</script>

<List>
  <ListInput value={values.seller_name} onInput={(e) => onValueChange('seller_name', e.target.value)} label="Seller Name" outline floatingLabel={values.seller_name} />
  <ListInput value={values.vat_number} onInput={(e) => onValueChange('vat_number', e.target.value)} label="Tax Number" outline floatingLabel={values.vat_number} />
  <ListInput value={values.invoice_date} onInput={(e) => onValueChange('invoice_date', e.target.value)} type="datetime-local" defaultValue="now"
    label="Invoice Date" outline />
  <ListInput onInput={(e) => onValueChange('total', e.target.value)} type="number" label="Total" outline floatingLabel />
  <ListInput onInput={(e) => onValueChange('tax_amount', e.target.value)} type="number" label="Tax Amount" outline floatingLabel />
  <Block>
    <Button onClick={generate}>Generate</Button>
  </Block>

  <Toast opened={isToastOpened}>
    <Button
    slot="button"
    clear
    inline
    onClick={() => (isToastOpened = false)}
    >
    Close
  </Button>
  <div class="shrink">{toastMessage}</div>
  </Toast>

  <Sheet 
    opened={isOpen} 
    onBackdropClick={() => isOpen = false}
    class="pb-safe w-full"
    style="height: min(500px, 50vh)"
  >
  <Toolbar top>
    <div class="left">Your invoice</div>
    <div class="right">
      <Link toolbar onClick={() => (isOpen = false)}>Done</Link>
    </div>
  </Toolbar>

      <div class="flex justify-center items-start mt-4">
        <img src={qr_url} alt="qrcode" />
      </div>
  </Sheet>

</List>