<script lang="ts">
import Dashboard from './components/DashboardComponent.vue'
import SideBar from './components/SideBarComponent.vue'
import TopBar from './components/TopBarComponent.vue'
export default {
  name: 'App',
  components: {
    Dashboard,
    SideBar,
    TopBar,
  },
}
</script>
<template>
  <div class="flex min-h-screen bg-gray-100">
    <SideBar />
    <div class="flex-1 flex flex-col h-screen">
      <TopBar />
      <div class="p-6 flex-1 flex flex-col overflow-y-auto">
        <RouterView />
      </div>
    </div>
  </div>
</template>
