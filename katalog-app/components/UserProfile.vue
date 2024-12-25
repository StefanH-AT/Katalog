<script setup lang="ts">

import type {User} from "next-auth";

const props = defineProps<{user: User}>();
// TODO: Create actual user profile page
</script>

<template>
<pre>{{props.user}}</pre>
</template>

<style scoped>

</style>