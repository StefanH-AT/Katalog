<script setup lang="ts">

const {status, data, signIn, signOut} = useAuth();

const authLink = status.value === "authenticated" ?
    [
      {
        label: data.value?.user?.name,
        avatar: {
          src: data.value?.user?.image
        },
        to: "/profile/" + data.value?.user?.name
      },
      {
        icon: "lucide:log-out",
        click: () => signOut(),
      }
    ] :
    [
      {
        label: "Login",
        icon: "lucide:log-in",
        click: () => signIn("discord")
      }
    ];

const links = [
  [
    {
      label: "Katalog",
      icon: "lucide:map",
      to: "/"
    },
  ],
  authLink
];

</script>

<template>
  <UContainer>
    <UHorizontalNavigation :links="links"/>
    <slot/>
  </UContainer>
</template>

<style scoped>

</style>