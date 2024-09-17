a
<script setup lang="ts">
defineOptions({
  name: "SMain"
});
</script>

<template>
  <aside class="su-main">
    <slot />
  </aside>
</template>

<style lang="scss" scoped>
.su-main {
  flex: 1;
  overflow: auto;
}
</style>
