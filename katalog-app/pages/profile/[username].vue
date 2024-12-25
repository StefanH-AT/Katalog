<script setup lang="ts">

import UserProfile from "~/components/UserProfile.vue";

const route = useRoute();

const username = route.params.username;
const {data} = await useFetch(`/api/user/${username}`)

</script>

<template>

  <div v-if="data == null">
    Unknown profile {{ username }}
  </div>

  <UserProfile v-if="data != null" :user="data"/>

</template>

<style scoped>

</style>