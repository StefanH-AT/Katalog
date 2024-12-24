<script setup lang="ts">
const route = useRoute();
const router = useRouter();

if(!route.params.username) {
  const auth = useAuth();
  if(auth.status.value === "authenticated") {
    router.push("/profile/" + auth.data.value?.user?.name);
  } else {
    router.push("/");
  }
}
</script>

<template>

</template>

<style scoped>

</style>