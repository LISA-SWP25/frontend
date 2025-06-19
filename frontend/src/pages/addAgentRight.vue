<template>
<v-stepper alt-labels :items=steps height="100%">
  <template v-slot:item.1>
    <v-card title="name & IP" flat>
        <v-text-field v-model="data.name" label="name" required/>
        <v-text-field v-model="IP" label="IP" required ref="ipField"/>
    </v-card>
  </template>

  <template v-slot:item.2>
    <v-card title="OS" flat>
        <v-btn>
            <v-img src="/win.png" width="30" height="30" cover />
        </v-btn>
        <v-btn>
            <v-img src="/win.png" width="30" height="30" cover />линукс на самом деле
        </v-btn>
    </v-card>
  </template>

  <template v-slot:item.3>
    <v-card title="settings" flat>
            <v-row>
                <v-col class="overflow-y-auto" style="max-height: 400px;">
                    <v-text-field v-for="(app, index) in data.apps" :key="index" v-model="data.apps[index]" label="App" append-icon="mdi-close" @click:append="remove(app, data.apps)"/>
                    <v-btn @click="add(data.apps)">Add App</v-btn>
                </v-col>
                <v-col class="overflow-y-auto" style="max-height: 400px;">
                    <v-text-field v-for="(page, index) in data.pages" :key="index" v-model="data.pages[index]" label="URL" append-icon="mdi-close" @click:append="remove(page, data.pages)"/>
                    <v-btn @click="add(data.pages)">Add page</v-btn>
                </v-col>
                <v-col class="overflow-y-auto" style="max-height: 400px;">
                    <v-text-field v-for="(brake, index) in data.breaks" :key="index" v-model="data.breaks[index]" label="break" append-icon="mdi-close" @click:append="remove(brake, data.breaks)"/>
                    <v-btn @click="add(data.breaks)">Add brake</v-btn>
                </v-col>
            </v-row>
            <v-btn @click="submit">send</v-btn>
    </v-card>
  </template>
  <template v-slot:item.4>
    check everything...
    <v-btn @click="submit">send</v-btn>
  </template>
</v-stepper>
</template>

<script setup>

const steps = ['name & IP', 'OS', 'behavior', 'submit'];

const data = ref({
    name: '',
    os: '',
    apps: [],
    pages: [],
    breaks: [],
})

const IP = ref('')

  function add(container) {
  const newElement = '';
  container.push(newElement);
  }

  function remove(item, container) {
    container.pop(item);
  }



function submit() {
  const jsonData = JSON.stringify(data.value)
  const jsonIP = JSON.stringify(IP.value)
  console.log(jsonData)

 //посылка всей инфы на агент
  fetch('/agents/api', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: jsonData
  })
  .then(res => res.json())
  .then(data => console.log('Ответ сервера:', data))
  .catch(err => console.error('Ошибка отправки:', err))


//  посылка IP
  fetch('/wrapper/api', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: jsonIP
  })
  .then(res => res.json())
  .then(data => console.log('Ответ сервера:', data))
  .catch(err => console.error('Ошибка отправки:', err))

}

</script>
