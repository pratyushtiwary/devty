<script setup lang="ts">
import { useConfirm } from 'balm-ui';
import { useRegisterSW } from 'virtual:pwa-register/vue';
import { ref, type Ref } from "vue";
import { RouterView } from 'vue-router';
import Snackbar from './components/SnackbarComponent.vue';
import { useSnackbar } from './stores/snackbar';

const snackbarStore = useSnackbar();
const confirm = useConfirm();
const showBanner: Ref<boolean> = ref(false);
const helper: Ref<any> = ref(undefined);

const serviceWorker = useRegisterSW({
  onOfflineReady() {
    snackbarStore.show('Website ready for offline use.', 'success')
  },
  onNeedRefresh() {
    confirm({
      // @ts-ignore
      title: 'New Content Available',
      message: 'Would you like to refresh now?',
      acceptText: 'Refresh',
      cancelText: 'Dismiss',
      stateOutlined: true,
      callback(result: boolean) {
        if (result) {
          updateSW();
        }
      }
    })
  },
});

function updateSW() {
  serviceWorker.updateServiceWorker();
  window.location.reload();
}

window.addEventListener('beforeinstallprompt', e => {
  if (!helper.value) {
    helper.value = e;
    displayBanner();
  }
})
function displayBanner() {
  const expiry = parseInt(localStorage.getItem('bannerHidden')) || (new Date()).getTime();
  const now = Date.now();

  if (now >= expiry) {
    showBanner.value = true;
  }
}

function hideBanner() {
  // show banner again after * 2 days
  const expiry = new Date();

  expiry.setDate(expiry.getDate() * 2);
  localStorage.setItem('bannerHidden', expiry.getTime().toString());

  showBanner.value = false;
}

function installApp() {
  hideBanner();
  if (helper.value) {
    helper.value?.prompt && helper.value.prompt();
    localStorage.removeItem('bannerHidden');
    showBanner.value = false;
  }
}

window.addEventListener('appinstalled', () => {
  showBanner.value = false;
})
</script>

<template>
  <div :class="{ 'installation-banner': true, 'open': showBanner }" v-if="showBanner" aria-role="dialog">
    Install Devty as app? It won't take much space and will work offline!
    <div class="actions">
      <ui-button @click="hideBanner">Dismiss</ui-button>
      <ui-button @click="installApp">Install</ui-button>
    </div>
  </div>
  <RouterView />
  <Snackbar :state="snackbarStore.status" :visible="snackbarStore.visible" :content="snackbarStore.message" />
</template>

<style scoped>
.installation-banner {
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0%;
  left: 0;
  width: 100%;
  background-color: var(--color-background) !important;
  box-shadow: 0 0px 10px rgba(0, 0, 0, 0.25);
  color: var(--color-text) !important;
  padding: 30px 15px;
  font-size: 1.25rem;
  z-index: 9;
  transform: translateY(-10%);
  height: 0;
  opacity: 0;
  pointer-events: none;
  transition: 15ms linear;
}

.installation-banner.open {
  transform: translateY(0%);
  height: auto;
  opacity: 1;
  pointer-events: auto;
}

.installation-banner .actions {
  display: flex;
  justify-content: flex-end;
}

@media screen and (max-width: 800px) {
  .installation-banner {
    top: auto;
    bottom: 0;
    transform: none;
  }

  .installation-banner.open {
    height: auto;
  }
}
</style>
