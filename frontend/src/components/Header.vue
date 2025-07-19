<template>
  <v-app-bar height="64">
    <img :style="{ marginLeft:'1%'}" height="100%" src="/fox.png"/>
    <v-toolbar-title>LISA</v-toolbar-title>
    <v-btn to="/" text="about" />
    <v-btn to="/agents" text="agents" />
    <v-menu open-on-hover>
      <template v-slot:activator="{ props }">
        <v-btn v-bind="props" text="Add"/>
      </template>
      <v-list>
        <v-list-item @click="createAgent()">
          <v-list-item-title>Agent</v-list-item-title>
        </v-list-item>

        <v-list-item @click="addServer()">
          <v-list-item-title>Server</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-btn to="/deploy" text="deploy" />
    <v-spacer />

   <v-btn @click="toggleTheme">Сменить тему</v-btn>
  </v-app-bar>
</template>

<script setup>
import { globalTheme } from '@/stores/app';
import { useTheme } from 'vuetify';

const router = useRouter();

const theme = useTheme()

function toggleTheme() {
  theme.global.name.value = theme.global.name.value === 'dark' ? 'light' : 'dark'
}

function createAgent() {
  router.push(`/addAgentRight`);
}

function addServer() {
  router.push("/addServer")
}
</script>
