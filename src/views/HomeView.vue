<script setup lang="ts">
import SearchInput from "@/components/SearchInputComponent.vue";
import useStorage from "@/hooks/useStorage";
import useThrottle from "@/hooks/useThrottle";
import { useRoutes } from "@/stores/routes";
import { useSnackbar } from '@/stores/snackbar';
import { type NestedComponentRef } from '@/types/componentRef';
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
const starredModules = ref(new Set(storage.load("starredModules") || []));
const expandedSections = ref([true, true]);

function handleChange(newVal: string) {
  searchTerm.value = newVal;
  routes.value = routesState.search(newVal)
  isSearchState.value = true;
}

function reset() {
  routes.value = allRoutes;
  isSearchState.value = false;

}

const starModule = (e: Event, moduleId: any) => {
  e.preventDefault();
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
        <div class="heading">Starred Modules ({{ starredModules.size }})</div>
      </template>
      <div class="modules">
        <div v-if="starredModules.size === 0" class="noModules">
          No Starred Module Found!
        </div>
        <ui-card class="module" outlined v-for="( route, index ) in  Array.from(starredModules) " :key="index"
          v-show="routes[route].visible !== false">
          <RouterLink :to="'/' + route" class="link">
            <ui-card-content class="content" :title="'Click to open ' + routes[route].name + ' module'">
              <ui-icon-button :title="(starredModules.has(route) ? 'Unstar' : 'Star') + ' Module'"
                :icon="starredModules.has(route) ? 'favorite' : 'favorite_border'" class="star"
                @click="starModule($event, route)"></ui-icon-button>
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
        <div class="heading">All Modules</div>
      </template>
      <div class="modules">
        <ui-card class="module" outlined v-for="( route, index ) in  Object.keys(routes) " :key="index"
          v-show="routes[route].visible !== false">
          <RouterLink :to="'/' + route" class="link">
            <ui-card-content class="content" :title="'Click to open ' + routes[route].name + ' module'">
              <ui-icon-button title="Star Module" :icon="starredModules.has(route) ? 'favorite' : 'favorite_border'"
                class="star" @click="starModule($event, route)"></ui-icon-button>
              <ui-icon v-if="routes[route].icon" class="icon">{{ routes[route].icon }}</ui-icon>
              <img v-if="routes[route].image" :src="routes[route].image" :alt="routes[route].name + '\'s icon'"
                class="image" />
              <h3 class="heading">{{ routes[route].name }}</h3>
            </ui-card-content>
          </RouterLink>
        </ui-card>
      </div>
    </ui-collapse>
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

.star {
  position: absolute;
  top: 10px;
  right: 10px;
}

.collapse {
  width: 100%;
  margin-top: 5px;
}
</style>
