<template>
  <v-app-bar>
    <img :style="{ marginLeft:'1%'}" height="100%" src="/fox.png"/>
    <v-toolbar-title>LISA</v-toolbar-title>
    <v-btn to="/" text="about" />
    <v-btn to="/agents" text="agents" />
    <v-btn to="addAgentRight" text="add agent" />
    <v-spacer />

   <v-btn @click="toggleTheme">Сменить тему</v-btn>
  </v-app-bar>
</template>

<script setup>
import { useTheme } from 'vuetify'

const theme = useTheme()

function toggleTheme() {
  theme.global.name.value = theme.global.name.value === 'dark' ? 'light' : 'dark'
}
</script>
