<script setup lang="ts">
import { RouterView } from 'vue-router'
import Snackbar from './components/SnackbarComponent.vue';
import { useSnackbar } from './stores/snackbar';

const snackbarStore = useSnackbar();
</script>

<template>
  <RouterView />
  <Snackbar :state="snackbarStore.status" :visible="snackbarStore.visible" :content="snackbarStore.message" />
</template>

<style scoped></style>
