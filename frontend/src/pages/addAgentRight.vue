<template> 
<v-stepper alt-labels :items=steps>
<!-- name & ip -->

  <template v-slot:item.1>
    <div>
      create new role or choose existing...
      <v-select v-model = "selected" label="preset" :items="roles" item-title="name" :return-object="true"/>
      <v-text-field v-model = "agentRole.name" label="name" required/>
      <v-text-field v-model = "agentRole.description" label="description" required/>
      <v-select v-model = "agentRole.category" label="category" :items="categories"/>
    </div>
  </template>

<!-- OS -->

  <template v-slot:item.2>
    <v-card title="OS" flat>
      <v-container class="d-flex justify-center"> 
        <v-btn @click="addOS('windows')">
            <v-img src="/win.png" width="30" height="30" />
        </v-btn>
        <v-spacer/>
        <v-btn @click="addOS('linux')">
            <v-img src="/Linux.png" width="30" height="30" cover />
        </v-btn>
      </v-container>  
    </v-card>
  </template>

<!-- behavior -->

  <template v-slot:item.3>
    <v-card title="settings" flat>
      <v-select v-model = "selectedTemplate" label="preset" :items="templates" item-title="name" :return-object="true"/>
      <v-row>

        <v-col class="overflow-y-auto" style="max-height: 400px;">
          <v-card title="Apps" flat>
            <v-text-field v-for="(app, index) in agentTemplate.template_data.activities[0].apps"
            :key="index" v-model="agentTemplate.template_data.activities[0].apps[index]" label="App" 
            append-icon="mdi-close" @click:append="remove(app, agentTemplate.template_data.activities[0].apps)"/>
          </v-card>
          <v-btn @click="add(agentTemplate.template_data.activities.apps)" icon="mdi-plus" flat/>
        </v-col>

        <v-col class="overflow-y-auto" style="max-height: 400px;">
          <v-card title="Pages" flat>
            <v-text-field v-for="(app, index) in agentTemplate.template_data.activities[0].pages"
            :key="index" v-model="agentTemplate.template_data.activities[0].pages[index]" label="App" 
            append-icon="mdi-close" @click:append="remove(app, agentTemplate.template_data.activities[0].pages)"/>
          </v-card>
          <v-btn @click="add(agentTemplate.template_data.activities.pages)" icon="mdi-plus" flat/>
        </v-col>

        <v-col class="overflow-y-auto" style="max-height: 400px;">
          <v-card title="Breaks" flat>
            <div v-for="(breakItem, index) in agentTemplate.template_data.schedule.breaks" :key="index" class="mb-4 pa-4">
              <v-text-field v-model="breakItem.start" label="Start"/>
              <v-text-field v-model="breakItem.duration_minutes" label="Duration"/>
            </div>
          </v-card>
          <v-btn @click="addBreak()" icon="mdi-plus" flat/>
        </v-col>

      </v-row>
    </v-card>
  </template>

<!-- send -->
  <template v-slot:item.4>
    <v-label>agent information</v-label>

    <v-card flat class="d-flex">
      <div>
        apps
      <v-list :items="agentTemplate.template_data.activities[0].apps" />    
      </div>
      <v-spacer/>
      <div>
        pages
      <v-list :items="agentTemplate.template_data.activities[0].pages" />
      </div>
      <v-spacer/>
      <div>
        breaks
        <div v-for="(breakItem, index) in agentTemplate.template_data.schedule.breaks" :key="index" class="mb-4 pa-4">
          <div>start: {{ breakItem.start }} </div>
          <div>duration: {{ breakItem.duration_minutes }} </div>
        </div>
      </div>
      
    </v-card>
    <div>name :{{ agentRole.name }}</div>
    <div>category :{{ agentRole.category }}</div>
    <div class="d-flex justify-center align-end">
    <v-btn @click="submit">send</v-btn>
    </div>
  </template>

</v-stepper>
</template>



<script setup>
const router = useRouter();

const categories = ['developer', 'admin', 'user', 'analyst', 'security']
const roles = ref([])
const templates = ref([])
const steps = ['role', 'OS', 'behavior', 'submit'];
const IP = ref('')
const presets = ref('')

const selected = ref(null)
const selectedTemplate = ref(null)

const agentRole = ref({
  name: "",
  description: "",
  category: ""
})

const agentTemplate = ref({
  name: "",
  role_id: null,
  os_type: "",
  template_data: {
    activities: [{
      apps: [],
      pages: [],
    }],
    schedule: {
      breaks: []
    },
    stealth_config: {}
  },
  version: "1.0"
})

const agentConfig = ref({
  name: "",
  role_id: null,
  template_id: null,
  os_type: "",
  injection_target: "explorer.exe",
  stealth_level: "medium",
  custom_config: {}

})

   onMounted(async () => {
        const resRole = await fetch("http://localhost:8000/api/roles?skip=0&limit=100")
        roles.value = await resRole.json();
        console.log(roles.value);
        const resTemplate = await fetch("http://localhost:8000/api/behavior-templates?skip=0&limit=100")
        templates.value = await resTemplate.json();
        console.log(templates.value);   
    });

  watch(selected, (callback) => {
    if (callback) {
      agentRole.value.name = callback.name
      agentRole.value.category = callback.category
      agentRole.value.description = callback.description

      agentConfig.value.name = callback.name
      agentConfig.value.role_id = callback.id
    }
  })

  watch(selectedTemplate, (callback) => {
  if (callback) {
    agentTemplate.value.template_data.activities[0].apps = [...callback.template_data.activities[0].apps]
    agentTemplate.value.template_data.activities[0].pages = [...callback.template_data.activities[0].pages]
    agentTemplate.value.template_data.schedule.breaks = [...callback.template_data.schedule.breaks]

    agentConfig.value.template_id = callback.id
  }
})

  watch(agentRole, (callback) => {
  const selectedRole = selected.value
  if (selectedRole && ( callback.name !== selectedRole.name || callback.category !== selectedRole.category || callback.description !== selectedRole.description )) {
    selected.value = null
  }
}, { deep: true })

  function add(container) {
    const newElement = '';
    container.push(newElement);
  }

  function addBreak() {
    data.value.breaks.push({ start: '', duration: '' })
  }

  function remove(item, container) {
    container.pop(item);
  }

  function addOS(os) {
    agentConfig.value.os_type = os;
  }
  
 //создание роли
async function submitAndContinue() {
  if (selected === null) {
    try {
      const response = await fetch('http://localhost:8000/api/roles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: jsonData,
      })

      if (response.ok) {
        const result = await response.json()
        console.log('role created', result)  
      } else {
        const errorText = await response.text()
        console.error('Ошибка ответа сервера:', response.status, errorText)
      }
    } catch (err) {
      console.error('Ошибка отправки запроса:', err)
    }
  } else {
  //  step.value++
  }
}


  async function submit() {
  const agentJson = JSON.stringify(agentConfig.value)
  console.log(agentJson)
  try{

   const res = await fetch('http://localhost:8000/api/agents/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: agentJson
  })
  const resData = await(res.json())
  if (res.ok) {
    router.push(`/agent/${resData.agent_id}`);
  }

  } catch (err) {
    console.error("ERROR:", err)
  }

}

</script>
