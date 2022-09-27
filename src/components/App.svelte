<script lang="ts">
  import { App, Block, Navbar, Page } from 'konsta/svelte'
  import Fatoora from './Forms/Fatoora.svelte'
</script>

<App theme="material" safeareas>
  <Page>
    <Navbar centerTitle title="eInvoice qrCode" />
    <slot />
    <div class="relative max-w-md mx-auto">
      <Block>
        <p>Enter the following information</p>
      </Block>
      <Fatoora />
    </div>
    <p class="text-sm text-center dark:text-gray-600 text-gray-400">Your data is private. Nothing is being stored or logged.</p>
  </Page>
</App>
