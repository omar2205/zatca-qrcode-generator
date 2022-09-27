<script lang="ts">
  import { App, Block, Button, Navbar, Page } from 'konsta/svelte'
  import Fatoora from './Forms/Fatoora.svelte'
</script>

<App theme='material' safeareas>
  <Page>
    <Navbar medium title="eInvoice qrCode" />
    <slot />
  <div class="relative">
    <Block>
      <p>Enter the following information</p>
    </Block>
    <Fatoora />
    <!-- <Block class="space-y-4">
      <p>Here comes the button</p>
      <Button>Action</Button>
      <Button>Action</Button>
    </Block> -->
  </div>
  </Page>
</App>
