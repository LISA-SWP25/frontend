<template> 
<v-stepper alt-labels :items=steps>

  <template v-slot:item.1>
    <v-card title="name & IP" flat>
        <v-text-field v-model="data.name" label="name" required/>
        <v-text-field v-model="IP" label="IP" required ref="ipField"/>
    </v-card>
  </template>

  <template v-slot:item.2>
    <v-card title="OS" flat>
      <v-container class="d-flex justify-center"> 
        <v-btn @click="addOS('windows')">
            <v-img src="/win.png" width="30" height="30" />
        </v-btn>
        <v-spacer/>
        <v-btn>
            <v-img src="/Linux.png" width="30" height="30" cover />
        </v-btn>
      </v-container>  
    </v-card>
  </template>

  <template v-slot:item.3>
    <v-card title="settings" flat>
      <v-row>
        <v-col class="overflow-y-auto" style="max-height: 400px;">
          <v-card title="Apps" flat>
            <v-text-field v-for="(app, index) in data.apps" :key="index" v-model="data.apps[index]" label="App" append-icon="mdi-close" @click:append="remove(app, data.apps)"/>
          </v-card>
          <v-btn @click="add(data.apps)" icon="mdi-plus" flat/>
        </v-col>
        <v-col class="overflow-y-auto" style="max-height: 400px;">
          <v-card title="Pages" flat>
            <v-text-field v-for="(page, index) in data.pages" :key="index" v-model="data.pages[index]" label="URL" append-icon="mdi-close" @click:append="remove(page, data.pages)"/>
          </v-card>
          <v-btn @click="add(data.pages)" icon="mdi-plus" flat/>
        </v-col>
        <v-col class="overflow-y-auto" style="max-height: 400px;">
          <v-card title="Breaks" flat>
            <v-text-field v-for="(brake, index) in data.breaks" :key="index" v-model="data.breaks[index]" label="break" append-icon="mdi-close" @click:append="remove(brake, data.breaks)"/>
          </v-card>
          <v-btn @click="add(data.breaks)" icon="mdi-plus" flat/>
        </v-col>
      </v-row>
    </v-card>
  </template>

  <template v-slot:item.4>
    <v-label>agent information</v-label>

    <v-card flat class="d-flex">
      <v-list :items="data.apps" />    
      <v-list :items="data.pages" />
      <v-list :items="data.breaks" />
    </v-card>
    <div class="d-flex justify-center align-end">
    <v-btn @click="submit">send</v-btn>
    </div>
  </template>

</v-stepper>
</template>



<script setup>

const steps = ['name & IP', 'OS', 'behavior', 'submit'];

const data = ref({
    name: '',
    os: 'windows',
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

  function addOS(os) {
    data.os = os;
  }



  function submit() {
  const jsonData = JSON.stringify(data.value)
  const jsonIP = JSON.stringify(IP.value)
  console.log(jsonData)

 //посылка всей инфы на агент
  fetch('backend/api/endpoints/agents', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: jsonData
  })
  .then(res => res.json())
  //.then(data => console.log('Ответ сервера:', data))
  // .catch(err => console.error('Ошибка отправки:', err))


//  посылка IP
  fetch('backend/api/endpoints/wrapper', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: jsonIP
  })
  .then(res => res.json())
  //.then(data => console.log('Ответ сервера:', data))
  // .catch(err => console.error('Ошибка отправки:', err))

}

</script>
