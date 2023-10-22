<script setup lang="ts">
import SearchInput from "@/components/SearchInputComponent.vue";
import useStorage from "@/hooks/useStorage";
import useThrottle from "@/hooks/useThrottle";
import { useRoutes } from "@/stores/routes";
import { useSnackbar } from '@/stores/snackbar';
import { type NestedComponentRef } from '@/types/componentRef';
import { type MenuItem } from '@/types/menuItem';
import { onMounted, onUnmounted, ref } from "vue";
import { RouterLink } from "vue-router";
const snackbarStore = useSnackbar();
const routesState = useRoutes();
const allRoutes = routesState.getRoutes();
const routes = ref(allRoutes);
const isSearchState = ref(false);
const searchTerm = ref("");
const searchInput = ref<NestedComponentRef>();
const storage = useStorage();
const deletedModules = ref<Set<string>>(new Set(storage.load("deletedModules") || []));
const starredModules = ref<Set<string>>(new Set(storage.load("starredModules") || []));
const expandedSections = ref([true, true, false]);
const showOptions = ref(false);
const optionsMenuPosition = ref<{ top: number, left: number }>({
  top: 0,
  left: 0
});
const selectedModuleId = ref<string | null>(null);

function handleChange(newVal: string) {
  searchTerm.value = newVal;
  expandedSections.value[1] = true;
  routes.value = routesState.search(newVal)
  isSearchState.value = true;
}

function reset() {
  routes.value = routesState.getRoutes();
  isSearchState.value = false;

}

const starModule = (e: Event, moduleId: any) => {
  if (e) e.preventDefault();
  try {
    starredModules.value = new Set(starredModules.value);
    if (!starredModules.value.has(moduleId)) {
      starredModules.value.add(moduleId);
    } else {
      starredModules.value.delete(moduleId);
    }
    if (starredModules.value.size === 0) {
      expandedSections.value[0] = false;
    }
    storage.save('starredModules', Array.from(starredModules.value));
  } catch (e) {
    if (e instanceof Error) {
      snackbarStore.show(`Failed to save details! Error: ${e.message}`, 'error')
    }
  }
}

const deleteModule = (e: Event, moduleId: any) => {
  if (e) e.preventDefault();
  try {
    deletedModules.value = new Set(deletedModules.value);
    if (!deletedModules.value.has(moduleId)) {
      deletedModules.value.add(moduleId);
    } else {
      deletedModules.value.delete(moduleId);
    }
    storage.save('deletedModules', Array.from(deletedModules.value));
    routes.value = routesState.getRoutes();
  } catch (e) {
    if (e instanceof Error) {
      snackbarStore.show(`Failed to delete module! Error: ${e.message}`, 'error')
    }
  }
}

function openOptions(e: Event, id: string) {
  e.preventDefault();
  showOptions.value = true;
  const { top, left } = (e.target as Element).getBoundingClientRect();
  optionsMenuPosition.value = {
    top: window.scrollY + top,
    left: window.scrollX + left
  };
  selectedModuleId.value = id;
}

function performAction(menuItem: MenuItem) {
  const moduleId = selectedModuleId.value;
  switch (menuItem.text) {
    case 'Star Module':
    case 'Unstar Module':
      starModule(null, moduleId)
      break;
    case 'Remove':
    case 'Restore':
      deleteModule(null, moduleId)
      break;
  }
}

function closeOptions() {
  selectedModuleId.value = null;
  showOptions.value = false;
}

function handleKeyPress(e: KeyboardEvent) {
  const key = e.key || e.code || e.which || e.keyCode;
  if ((key === 'p' || key === 'P' || key === 'KeyP' || key == 80) && e.ctrlKey) {
    e.preventDefault()
    if (searchInput?.value?.wrapper?.wrapper?.textfield?.querySelector) {
      searchInput.value.wrapper!.wrapper!.textfield!.querySelector('input')!.focus()
    }
  }
}

onMounted(() => {
  document.title = 'Devty'
  if (starredModules.value.size === 0) {
    expandedSections.value[0] = false;
  }
  window.addEventListener('keydown', handleKeyPress)
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyPress)
})
</script>

<template>
  <main>
    <h1><img src="../assets/logo.svg" alt="Devty Logo" height="25"> {{ " " }}Devty</h1>
    <div :class="$tt('body1')">
      Your go to place for dev utilities & tools.
    </div>
    <br />
    <SearchInput placeholder="Search..." class="searchBox" @update:value="useThrottle($event, handleChange)"
      @reset="reset" ref="searchInput" :value="searchTerm" />
    <ui-collapse with-icon ripple class="collapse" v-model="expandedSections[0]" v-show="!isSearchState">
      <template #toggle>
        <div class="heading">Starred Modules ({{ Array.from(starredModules).filter(route =>
          !deletedModules.has(route)).length }})</div>
      </template>
      <div class="modules">
        <div v-if="Array.from(starredModules).filter(route => !deletedModules.has(route)).length === 0" class="noModules">
          No Starred Module Found!
        </div>
        <ui-card class="module" outlined
          v-for="( route, index ) in  Array.from(starredModules).filter(route => !deletedModules.has(route))"
          :key="index">
          <RouterLink :to="'/' + route" class="link">
            <ui-card-content class="content" :title="'Click to open ' + routes[route].name + ' module'">
              <ui-icon-button title="More Options" class="options" icon="more_vert"
                @click="openOptions($event, route)"></ui-icon-button>
              <ui-icon v-if="routes[route].icon" class="icon">{{ routes[route].icon }}</ui-icon>
              <img v-if="routes[route].image" :src="routes[route].image" :alt="routes[route].name + '\'s icon'"
                class="image" />
              <h3 class="heading">{{ routes[route].name }}</h3>
            </ui-card-content>
          </RouterLink>
        </ui-card>
      </div>
    </ui-collapse>
    <ui-collapse with-icon ripple class="collapse" v-model="expandedSections[1]">
      <template #toggle>
        <div class="heading">All Modules ({{ Object.keys(routes).length }})</div>
      </template>
      <div class="modules">
        <ui-card class="module" outlined v-for="( route, index ) in  Object.keys(routes) " :key="index"
          v-show="routes[route].visible !== false">
          <RouterLink :to="'/' + route" class="link">
            <ui-card-content class="content" :title="'Click to open ' + routes[route].name + ' module'">
              <ui-icon-button title="Options" class="options" icon="more_vert"
                @click="openOptions($event, route)"></ui-icon-button>
              <ui-icon v-if="routes[route].icon" class="icon">{{ routes[route].icon }}</ui-icon>
              <img v-if="routes[route].image" :src="routes[route].image" :alt="routes[route].name + '\'s icon'"
                class="image" />
              <h3 class="heading">{{ routes[route].name }}</h3>
            </ui-card-content>
          </RouterLink>
        </ui-card>
      </div>
    </ui-collapse>
    <ui-collapse with-icon ripple class="collapse" v-model="expandedSections[2]" v-show="!isSearchState">
      <template #toggle>
        <div class="heading">Deleted Modules ({{ deletedModules.size }})</div>
      </template>
      <div class="modules">
        <div v-if="deletedModules.size === 0" class="noModules">
          No Deleted Module Found!
        </div>
        <ui-card class="module deleted" outlined v-for="( route, index ) in  Array.from(deletedModules) " :key="index">
          <RouterLink to="#" class="link deleted">
            <ui-card-content class="content deleted">
              <ui-icon-button title="More Options" class="options" icon="more_vert"
                @click="openOptions($event, route)"></ui-icon-button>
              <ui-icon v-if="routesState.routes[route].icon" class="icon">{{ routesState.routes[route].icon }}</ui-icon>
              <img v-if="routesState.routes[route].image" :src="routesState.routes[route].image"
                :alt="routesState.routes[route].name + '\'s icon'" class="image" />
              <h3 class="heading">{{ routesState.routes[route].name }}</h3>
            </ui-card-content>
          </RouterLink>
        </ui-card>
      </div>
    </ui-collapse>
    <ui-menu-anchor class="menu-anchor" :style="{
      top: optionsMenuPosition.top + 'px',
      left: optionsMenuPosition.left + 'px'
    }">
      <ui-menu v-model="showOptions" @selected="performAction" @closed="closeOptions">
        <ui-menuitem v-if="!deletedModules.has(selectedModuleId)">
          <ui-menuitem-icon>
            <ui-icon>{{ starredModules.has(selectedModuleId) ? 'favorite' : 'favorite_border' }}</ui-icon>
          </ui-menuitem-icon>
          <ui-menuitem-text>{{ starredModules.has(selectedModuleId) ? 'Unstar Module' : 'Star Module'
          }}</ui-menuitem-text>
        </ui-menuitem>
        <ui-menuitem>
          <ui-menuitem-icon>
            <ui-icon>{{ deletedModules.has(selectedModuleId) ? 'restore_from_trash' : 'delete' }}</ui-icon>
          </ui-menuitem-icon>
          <ui-menuitem-text>{{ deletedModules.has(selectedModuleId) ? 'Restore' : 'Remove' }}</ui-menuitem-text>
        </ui-menuitem>
      </ui-menu>
    </ui-menu-anchor>

    <div v-if="Object.keys(routes).filter(e => routes[e].visible !== false).length === 0" class="noResults">
      No Module Found!
    </div>
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  align-items: center;
  padding-top: 15px;
  margin: 0 10px;
}

.searchBox {
  width: 400px;
  max-width: 90vw;
}

.modules {
  width: 100%;
  position: relative;
  padding: 0 25px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  margin-top: 10px;
}

.modules .module {
  background-color: var(--color-background);
  margin: 5px;
}

.modules .deleted {
  cursor: no-drop !important;
}

.modules .module .content {
  width: 100%;
  height: 250px;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modules .module .icon {
  font-size: 148px !important;
}

.modules .module .image {
  display: block;
  object-fit: contain;
  width: 50%;
  margin-bottom: 20px;
}

.modules .module .heading,
.collapse .heading {
  font-size: 24px;
  text-align: center;
}

.modules .link {
  text-decoration: none;
  color: var(--color-text);
}


.modules .noModules {
  color: var(--color-text);
  width: 100%;
  text-align: center;
  font-size: 1.25rem;
}

.noResults {
  color: var(--color-text);
  width: 100%;
  text-align: center;
  font-size: 24px;
}

.options {
  position: absolute;
  top: 10px;
  right: 5px;
}

.menu-anchor {
  position: absolute;
}

.collapse {
  width: 100%;
  margin-top: 5px;
}
</style>
