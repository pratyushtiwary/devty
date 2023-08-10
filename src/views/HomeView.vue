<script setup lang="ts">
import Input from "@/components/InputComponent.vue";
import { RouterLink } from "vue-router";
import { useRoutes, type Routes } from "@/stores/routes";
import useThrottle from "@/hooks/useThrottle";
import { ref } from "vue";
const allRoutes = useRoutes().getRoutes();
const routes = ref(allRoutes);
const value = ref('');

function handleChange(newVal: string) {
  if (newVal) {
    const all = Object.keys(allRoutes);
    const regex = new RegExp(newVal.toLowerCase(), 'g');
    let validRoutes: Routes = {};

    all.forEach(e => {
      validRoutes[e] = {
        ...allRoutes[e],
        visible: Boolean(allRoutes[e].name.toLowerCase().match(regex))
      }
    })


    routes.value = validRoutes
  } else {
    routes.value = allRoutes;
  }
}
</script>

<template>
  <main>
    <h1>Devty</h1>
    <div :class="$tt('body1')">
      Your go to place for dev utilities & tools.
    </div>
    <br />
    <Input placeholder="Search..." class="searchBox" @update:value="useThrottle($event, handleChange, 500)"
      :value="value" />
    <div class="modules">
      <ui-card class="module" outlined v-for="(route, index) in Object.keys(routes)" :key="index"
        v-show="routes[route].visible !== false">
        <RouterLink :to="'/' + route" class="link">
          <ui-card-content class="content">
            <ui-icon v-if="routes[route].icon" class="icon">{{ routes[route].icon }}</ui-icon>
            <img v-if="routes[route].image" :src="routes[route].image" :alt="routes[route].name + '\'s icon'"
              class="image" />
            <h3 class="heading">{{ routes[route].name }}</h3>
          </ui-card-content>
        </RouterLink>
      </ui-card>
    </div>
    <div v-if="Object.keys(routes).filter(e => routes[e].visible !== false).length === 0" class="noResults">
      No Result Found!
    </div>
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  align-items: center;
  padding-top: 15px;
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
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
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

.modules .module .heading {
  font-size: 24px;
  text-align: center;
}

.modules .link {
  text-decoration: none;
  color: var(--color-text);
}

.noResults {
  color: var(--color-text);
  width: 100%;
  text-align: center;
  font-size: 24px;
}
</style>
