<script setup lang="ts">
const {status, data, signIn, signOut} = useAuth();

const isLoggedIn = status.value === "authenticated";

function buildLinks() {
  if(isLoggedIn) {
    return [
        [
          buildHomeLink(),
          buildUploadLink(),
        ],
        buildProfileLinks()
    ]
  } else {
    return [
        [ buildHomeLink() ],
        buildLoginLinks(),
    ]
  }
}

const links = buildLinks();

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
      to: "/profile/" + data.value?.user?.name
    },
    {
      icon: "lucide:log-out",
      click: () => signOut(),
    }
  ];
}

</script>

<template>

  <UHorizontalNavigation :links="links"/>
</template>

<style scoped>

</style>