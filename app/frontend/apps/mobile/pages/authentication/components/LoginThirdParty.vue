<!-- Copyright (C) 2012-2024 Zammad Foundation, https://zammad-foundation.org/ -->

<script setup lang="ts">
import useFingerprint from '#shared/composables/useFingerprint.ts'
import { getCSRFToken } from '#shared/server/apollo/utils/csrfToken.ts'
import { ref, nextTick, onMounted } from 'vue'
import type { ThirdPartyAuthProvider } from '#shared/types/authentication.ts'

export interface Props {
  providers: ThirdPartyAuthProvider[]
}

const props = defineProps<Props>()

const csrfToken = getCSRFToken()
const { fingerprint } = useFingerprint()

const buttonRefs = ref<(HTMLElement | null)[]>([])

function hasSamlQueryParam(): boolean {
  const urlParams = new URLSearchParams(window.location.search)
  return urlParams.has('saml')
}

onMounted(() => {
  nextTick(() => {
    if (hasSamlQueryParam()) {
      const firstButton = buttonRefs.value[0] as HTMLElement | null
      if (firstButton) {
        firstButton.click()
      }
    }
  })
})
</script>

<template>
  <section class="mb-16 mt-4 w-full max-w-md" data-test-id="loginThirdParty">
    <p class="p-3 text-center">
      {{
        $c.user_show_password_login
          ? $t('Or sign in using')
          : $t('Sign in using')
      }}
    </p>
    <div class="-m-2 flex flex-wrap p-1">
      <form
        v-for="(provider, index) in props.providers"
        :key="provider.name"
        class="min-w-1/2 flex grow"
        method="post"
        :action="`${provider.url}?fingerprint=${fingerprint}`"
      >
        <input type="hidden" name="authenticity_token" :value="csrfToken" />
        <button
          v-bind:ref="(el) => buttonRefs[index] = el"
          class="m-1 flex h-14 w-full cursor-pointer select-none items-center justify-center rounded-xl bg-gray-600 px-4 py-2 text-white"
        >
          <CommonIcon
            :name="provider.icon"
            size="base"
            decorative
            class="shrink-0 ltr:mr-2.5 rtl:ml-2.5"
          />
          <span class="truncate text-xl leading-7">
            {{ $t(provider.label) }}
          </span>
        </button>
      </form>
    </div>
  </section>
</template>
