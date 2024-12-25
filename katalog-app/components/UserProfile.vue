<script setup lang="ts">

import type {User} from "next-auth";

const props = defineProps<{user: User}>();

</script>

<template>
<pre>{{props.user}}</pre>
</template>

<style scoped>

</style>