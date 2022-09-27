<script lang="ts">
  import { App, Block, Button, Navbar, Page } from 'konsta/svelte'
  import Fatoora from './Forms/Fatoora.svelte'
</script>

<App theme='material' safeareas>
  <Page>
    <Navbar medium title="eInvoice qrCode" />
    <slot />
  <div class="relative max-w-md mx-auto">
    <Block>
      <p>Enter the following information</p>
    </Block>
    <Fatoora />
  </div>
  </Page>
</App>
