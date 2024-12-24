<script setup lang="ts">

import UserProfile from "~/components/UserProfile.vue";

const route = useRoute();

const store = useStorage("data");

const username = route.params.username;

const userKv = await store.getItem(`user:${username}`);

</script>

<template>

  <UserProfile v-if="userKv != null" :user="userKv"/>
  <div v-if="userKv == null">
    Unknown profile {{ username }}
  </div>

</template>

<style scoped>

</style>