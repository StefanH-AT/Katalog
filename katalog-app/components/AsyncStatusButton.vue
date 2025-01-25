<script setup lang="ts">

export type AsyncStatusButtonState = "idle" | "loading" | "success" | "fail";

const props = defineProps<{
  state: AsyncStatusButtonState,
  autoIdle?: boolean,
  autoIdleTimeout?: number,

  idleIcon?: string,
  failIcon?: string,
  successIcon?: string,

  idleLabel?: string,
  loadingLabel?: string,
  failLabel?: string,
  successLabel?: string,
}>();

const emit = defineEmits<{
  updateState: [newState: AsyncStatusButtonState]
}>()

const leadingIcon = computed(() => {
  switch (props.state) {
    default:
    case "loading":
    case "idle": {
      return props.idleIcon ?? "lucide:image";
    }
    case "fail": {
      return props.failIcon ?? "lucide:cross";
    }
    case "success": {
      return props.successIcon ?? "lucide:check";
    }
  }
});

const label = computed(() => {
  switch (props.state) {
    default:
    case "idle": {
      return props.idleLabel ?? "Button";
    }
    case "loading": {
      return props.loadingLabel ?? "Loading";
    }
    case "fail": {
      return props.failLabel ?? "Failed";
    }
    case "success": {
      return props.successLabel ?? "Success";
    }
  }
});

watch(() => props.state, (newState, oldState) => {
  if(!props.autoIdle) return;

  if(newState === "fail" || newState === "success") {
    setTimeout(() => {
      emit("updateState", "idle");
    }, props.autoIdleTimeout ?? 3000)
  }
});

</script>

<template>
  <UButton variant="subtle" color="secondary" :leading-icon="leadingIcon" :loading="props.state === 'loading'" :label="label"/>
</template>

<style scoped>

</style>