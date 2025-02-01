<script setup lang="ts">
import NuggetSearchInput from "~/components/NuggetSearchInput.vue";

const {status, data, signIn, signOut} = useAuth();

const isLoggedIn = status.value === "authenticated";
const authDisabled = useRuntimeConfig().public.authDisabled;

</script>

<template>
  <header class="flow-full flow-full-padding flex py-1 mb-2 gap-4 sticky top-0 bg-gray-800">

    <UButton leading-icon="lucide:map" class="px-0 mx-0 font-[900]" size="xl" variant="link" color="neutral" label="Katalog" to="/" active-class="text-green-400"/>
    <UButton leading-icon="lucide:upload" class="px-0 mx-0 font-[900] mr-auto" size="xl" variant="link" color="neutral" label="Upload" to="/upload" active-class="text-green-400"/>

    <NuggetSearchInput class="grow max-w-60" shortcut/>

    <UButton v-if="!authDisabled && isLoggedIn" :avatar="data?.user?.id" class="px-0 mx-0 ml-auto" variant="link" color="neutral" :label="data?.user?.displayName"/>

  </header>
</template>

<style scoped>


</style>