<script setup lang="ts">
import TheFeed from "~/components/TheFeed.vue";

definePageMeta({
  auth: false,
  title: "Main",
});

const {status,signIn} = useAuth();
</script>

<template>
  <div>
    <TheFeed v-if="status === 'authenticated'"/>

    <div v-else class="h-full grid place-items-center content-center text-center">
      <h1 class="text-5xl font-semibold tracking-tighty text-green-200">Private Katalog</h1>
      <span class="text-xl tracking-wide mt-2 text-gray-200 text-balance">
        This Katalog is restricted<br>Login to access
      </span>
      <UButton trailing-icon="lucide:log-in" label="Login" size="xl" @click="signIn" class="mt-5" :ui="{base: 'bg-gradient-to-t from-green-600 to-green-500'}"/>
    </div>
  </div>
</template>

<style scoped>

</style>