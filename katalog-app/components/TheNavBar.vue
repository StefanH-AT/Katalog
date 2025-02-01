<script setup lang="ts">
import NuggetSearchInput from "~/components/NuggetSearchInput.vue";

const {status, data, signIn, signOut} = useAuth();

const isLoggedIn = status.value === "authenticated";
const authDisabled = useRuntimeConfig().public.authDisabled;

function buildItems() {

  const authDisabled = useRuntimeConfig().public.authDisabled;

  if(authDisabled) {
    return [
        [
          buildHomeLink(),
          buildUploadLink(),
        ],
        [
          buildSearch(),
        ],
        []
    ];
  }

  if(isLoggedIn) {
    return [
        [
          buildHomeLink(),
          buildUploadLink(),
        ],
        [ buildSearch() ],
        buildProfileLinks()
    ]
  } else {
    return [
        [ buildHomeLink() ],
        [ buildSearch() ],
        buildLoginLinks(),
    ]
  }
}

const items = buildItems();

function buildSearch() {
  return {
    label: "Search",
    slot: "search",
  }
}

function buildLoginLinks() {
  return [{
    label: "Login",
    icon: "lucide:log-in",
    click: () => signIn("discord")
  }];
}

function buildHomeLink() {
  return {
    label: "Katalog",
    icon: "lucide:map",
    to: "/"
  };
}

function buildUploadLink() {
  return {
    label: "Upload",
    icon: "lucide:upload",
    to: "/upload",
  };
}

function buildProfileLinks() {
  return [
    {
      label: data.value?.user?.displayName,
      avatar: {
        src: data.value?.user?.image
      },
      to: "/profile/" + data.value?.user?.id,
    },
    {
      icon: "lucide:log-out",
      click: () => signOut(),
    }
  ];
}

</script>

<template>
  <header class="flow-full flow-full-padding flex py-1 mb-2 gap-4 sticky top-0 bg-gray-800">

    <UButton leading-icon="lucide:map" class="px-0 mx-0" size="xl" variant="link" color="neutral" label="Katalog"/>
    <UButton leading-icon="lucide:upload" class="px-0 mx-0 mr-auto" size="xl" variant="link" color="neutral" label="Upload"/>

    <NuggetSearchInput class="grow max-w-60" shortcut/>

    <UButton v-if="!authDisabled && isLoggedIn" :avatar="data?.user?.id" class="px-0 mx-0 ml-auto" variant="link" color="neutral" :label="data?.user?.displayName"/>

  </header>
</template>

<style scoped>


</style>