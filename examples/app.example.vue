<script lang="ts" setup>
import { SRow, SCol } from "@simple/components";

defineOptions({
  name: "Example"
});
</script>

<template>
  <h1>Example</h1>

  <SRow :gutter="100">
    <SCol>123</SCol>
    <SCol>456123</SCol>
    <SCol>456</SCol>
    <SCol>456</SCol>
    <SCol>456</SCol>
    <SCol>456</SCol>
    <SCol>456</SCol>
    <SCol>456</SCol>
    <SCol>456</SCol>
  </SRow>

  <SDialog></SDialog>
</template>

<style></style>
