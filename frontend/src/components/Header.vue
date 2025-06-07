<template>
  <v-app-bar>
    <v-app-bar-nav-icon @click="$emit('toggle-drawer')" />

    <v-toolbar-title>LISA</v-toolbar-title>

    <v-spacer />

    <v-menu>
      <template #activator="{ props }">
        <v-btn icon v-bind="props" color="white"/>
      </template>

      <v-list>
        <v-list-item title="Профиль" />
        <v-list-item title="Выход" @click="logout" />
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script setup lang="ts">
const logout = () => {
  console.log('Logging out...')
  // вызвать store или router.push('/login')
}
</script>
