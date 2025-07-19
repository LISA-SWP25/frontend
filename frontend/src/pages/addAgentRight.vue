<template> 
<v-card title="Create agent" class="MainContainer">
<v-stepper v-model="step" :items=steps alt-labels hide-actions class="fill-height d-flex flex-column">

<v-stepper-actions 
      @click:next="stepper()"
      @click:prev="step--"
></v-stepper-actions>


<!-- name & ip -->

  <template v-slot:item.1 class="fill-height d-flex flex-column">
    <v-card title="create new role or choose existing..."  >
      
      <v-select v-model = "selected" label="preset" :items="roles" item-title="name" :return-object="true"/>
      <v-text-field v-model = "agentRole.name" label="name" required/>
      <v-text-field v-model = "agentRole.description" label="description" required/>
      <v-select v-model = "agentRole.category" label="category" :items="categories"/>
    </v-card>
  </template>

<!-- OS -->

  <template v-slot:item.2>
    <v-card title="OS">
      <v-container class="d-flex justify-center"> 
        <v-btn @click="addOS('windows')" class="SelectOS" text="Windows">
        </v-btn>
        <v-spacer/>
        <v-btn @click="addOS('linux')" class="SelectOS" text="Linux">
        </v-btn>
      </v-container>  
    </v-card>
  </template>

<!-- behavior -->

  <template v-slot:item.3>
    <v-card title="settings" flat>
      <!-- <v-select v-model = "selectedTemplate" label="preset" :items="templates" item-title="name" :return-object="true"/> -->
      <v-row>

        <v-col class="overflow-y-auto" style="max-height: 400px;">
          <v-card title="Apps" flat>
            <!-- <v-text-field v-for="(app, index) in agentTemplate.template_data.applications_used" -->
            <!-- :key="index" v-model="agentTemplate.template_data.applications_used[index]" label="App" -->
            <v-select v-for="(app, index) in agentTemplate.template_data.applications_used"
            :key="index" v-model="agentTemplate.template_data.applications_used[index]" label="App"
            :items="apps" append-icon="mdi-close" @click:append="remove(index, agentTemplate.template_data.applications_used)"/>
            <!-- append-icon="mdi-close" @click:append="remove(index, agentTemplate.template_data.applications_used)"/> -->
          </v-card>
          <v-btn @click="add(agentTemplate.template_data.applications_used)" icon="mdi-plus" flat/>
        </v-col>

        <v-col class="overflow-y-auto" style="max-height: 400px;">
          <v-card title="Breaks" flat>
            <div class="mb-4 pa-4">
              <div v-for="(breakItem, index) in agentTemplate.template_data.work_schedule.breaks" :key="index">                
                <v-text-field v-model="breakItem.start" label="Start" hint="HH:MM"
                append-icon="mdi-close" @click:append="remove(index, agentTemplate.template_data.work_schedule.breaks)"
                />
                <v-text-field v-model.number="breakItem.duration_minutes" label="Duration (in minutes)"/>
              </div>
              <v-text-field v-model="agentTemplate.template_data.work_schedule.start_time" label="begin work" hint="HH:MM" />
              <v-text-field v-model="agentTemplate.template_data.work_schedule.end_time" label="end work" hint="HH:MM" />
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

    <v-card flat >
      <v-list :items="agentTemplate.template_data.work_schedule.breaks"/>
      <div>
        <v-select v-model="agentConfig.stealth_level" label="stealth level" :items="stealthLevels" />
      </div>
    </v-card>
    
    <div class="d-flex justify-center align-end">
    <v-btn @click="submit">send</v-btn>
    </div>
  </template>

</v-stepper>
</v-card>

</template>



<script setup>
import Loader from '@/components/Loader.vue';
import axios from 'axios'

const router = useRouter();

const isLoading = ref(false)

const categories = ['developer', 'admin', 'user', 'analyst', 'security']
const apps = ['Visual Studio Code', 'Firefox', 'Terminal', 'Slack', 'Mousepad', 'chocolate-doom']
const stealthLevels = ['low', 'medium', 'high']
const roles = ref([])
const templates = ref([])
const steps = ['role', 'OS', 'behavior', 'submit'];
const step = ref('')

const selected = ref(null)
const selectedTemplate = ref(null)

const agentRole = ref({
  name: "",
  description: "",
  category: "",
})


//used to POST behavior-templates
const agentTemplate = ref({
  name: "",
  description: "",
  role_id: null,
  template_data: {
    activity_pattern: "",
    applications_used: [],
    productivity_metrics: {
      average_session_length: "",
      break_frequency: "",
      code_sessions_per_day: ""
    },
    work_schedule: {
      breaks: [],
      end_time: "",
      start_time: ""
    }
  },
  os_type: "",
  version: "1.0"
}
)

const agentConfig = ref({
  name: "",
  role_id: null,
  template_id: null,
  os_type: "",
  injection_target: "",
  stealth_level: "",
  custom_config: {},
  version_info: {}
})

   onMounted(async () => {
        const resRole = await fetch("http://localhost:8000/api/roles?skip=0&limit=100")
        const data = await resRole.json()
        roles.value = data.filter(role => role.is_active === false)
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

      agentTemplate.value.name = callback.name
      agentTemplate.value.description = callback.description
      agentTemplate.value.role_id = callback.id

      agentConfig.value.name = callback.name
      agentConfig.value.role_id = callback.id
    }
  })


  watch(selectedTemplate, (callback) => {
  if (callback) {
    agentTemplate.value.template_data.applications_used.apps = [...callback.template_data.applications_used.apps]
    agentTemplate.value.template_data.schedule.breaks = [...callback.template_data.schedule.breaks]

    agentConfig.value.template_id = callback.id
  }
})

  watch(agentRole, (callback) => {
  const selectedRole = selected.value
  if (selectedRole && ( callback.name !== selectedRole.name || callback.category !== selectedRole.category || callback.description !== selectedRole.description )) {
    selected.value = null
    agentConfig.value.role_id = null
  }
}, { deep: true })

  watch(agentTemplate, (callback) => {
  const fields = selectedTemplate.value
  if (fields && ( callback.template_data !== fields.template_data)) {
    selectedTemplate.value = null
  }
}, { deep: true })

  function add(container) {
    const newElement = '';
    container.push(newElement);
  }

  function addBreak() {
    agentTemplate.value.template_data.work_schedule.breaks.push({ start: '', duration_minutes: '' })
  }

  function remove(index, container) {
     container.splice(index, 1);
  }

  function addOS(os) {
    agentTemplate.value.os_type = os
    agentConfig.value.os_type = os
  }


  async function stepper() {
    const result = await validate()
    if (result) step.value++
  }

  // validation at each step
  async function validate() {
    console.log(step.value)
    isLoading.value = true
    switch (step.value) {




      case 1:
        if (agentConfig.value.role_id == null) {
        console.log('no template selected. Validation...')
        try {
          console.log(agentRole.value)
          const response = await axios.post('http://localhost:8000/api/roles', agentRole.value)
          if (response.data.id != null) {

            agentTemplate.value.role_id = response.data.id
            agentTemplate.value.name = response.data.name
            agentConfig.value.role_id = response.data.id
            agentConfig.value.name = response.data.name


            console.log("Template ID:", agentConfig.value.role_id)
            console.log('success!')

            isLoading.value = false
            return true

          } else {
            console.error('Ошибка в ответе:', response.data)

            isLoading.value = false
            return false
          }
        } catch (error) {
          if (axios.isAxiosError(error)) {
            console.error(error)
          }   

          isLoading.value = false
          return false
          }
        }
        console.log("Template ID:", agentConfig.value.role_id)

        isLoading.value = false
        return true





      case 2:
        if (agentConfig.value.os_type == null) {
          console.error("ERROR : null OS")

          isLoading.value = false
          return false

        }
        console.log('OS:', agentTemplate.value.os_type)

        isLoading.value = false
        return true




      case 3:
        if (agentConfig.value.template_id == null) {
        console.log('no template selected. Validation...')
        try {
          console.log(agentTemplate.value)
          const response = await axios.post('http://localhost:8000/api/behavior-templates', agentTemplate.value)

            console.log('success!')

          //agent role becomes active - can't use for now
          agentRole.value.is_active = true
          const UpdateRole = await axios.put(`http://localhost:8000/api/roles/${agentTemplate.value.role_id}`, agentRole.value)
            console.log('role is active')

            agentConfig.value.template_id = response.data.id
            isLoading.value = false
            return true

         
        } catch (error) {
          if (axios.isAxiosError(error)) {
            console.error(error)
          }   

          isLoading.value = false
          return false

          }
        }

        isLoading.value = false
        return true

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
    router.push(`/deploy`);
  }

  } catch (err) {
    console.error("ERROR:", err)
  }

}

</script>
