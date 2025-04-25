<script setup lang="ts">
import NuggetSearchInput from "~/components/NuggetSearchInput.vue";

const {status, data, signIn, signOut} = useAuth();

const isLoggedIn = status.value === "authenticated";
const authDisabled = useRuntimeConfig().public.authDisabled;

</script>

<template>
  <header class="flow-full flow-full-padding flex items-center py-1 mb-2 gap-4 sticky top-0 bg-gray-800">

    <UButton leading-icon="lucide:map"
             class="px-0 mx-0 font-[900]"
             size="xl"
             variant="link"
             color="neutral"
             label="Katalog"
             to="/"
             active-class="text-green-400"/>

    <UButton leading-icon="lucide:upload"
             class="px-0 mx-0 font-[900] mr-auto"
             size="xl"
             variant="link"
             color="neutral"
             label="Upload"
             to="/upload"
             active-class="text-green-400"/>

    <NuggetSearchInput class="grow max-w-60" shortcut/>

    <AvatarAndName v-if="!authDisabled && isLoggedIn && data?.user"
                   :avatar-url="data?.user?.avatarUrl"
                   :user-id="data?.user?.id"
                   :display-name="data?.user?.displayName"/>

    <UButton v-if="!authDisabled && !isLoggedIn" variant="subtle" color="secondary" @click="signIn">Login</UButton>

  </header>
</template>

<style scoped>


</style>