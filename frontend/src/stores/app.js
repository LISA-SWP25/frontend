// Utilities
import { defineStore } from 'pinia'
import { useTheme } from 'vuetify'

export const useAppStore = defineStore('app', {
  state: () => ({
    //
  }),
})

export const globalTheme = defineStore('counter', () => {
  const theme = useTheme()
  function change() {
   theme.global.name.value = theme.global.name.value === 'dark' ? 'light' : 'dark'
  }

  return { change }
})
