<template>
  <div>
    <v-select v-model="selectedRole" label="Roles" item-title="name" :items="roles" :return-object="true" />
    <v-select v-model="selectedTemplate" label="Behaviors" item-title="" :items="templates" :return-object="true"/>
  </div>
  <div v-if="selectedRole">
    ROLE
    <v-text-field v-bind:readonly="rdOnly" v-model="selectedRole.name" />
    name:{{ selectedRole.name }}
    id:{{ selectedRole.id }}
    description:{{ selectedRole.description }}
    active:{{ selectedRole.is_active }}
    <v-btn @click="deleteTemplate('role', selectedRole.id)">DELETE</v-btn>
    <v-btn v-if="rdOnly == true" @click="rdOnly = false" text="change role" />
    <v-btn v-if="rdOnly == false" @click="updateTemplate('role', selectedRole.id)" text="send" />
    
  </div>
  <div v-else-if="selectedTemplate">
    BEHAVIOR
    <v-text-field v-bind:readonly="rdOnly" v-model="selectedTemplate.name" />
    <v-text-field v-bind:readonly="rdOnly" v-model="selectedTemplate.description" />
    <!-- <v-text-field v-bind:readonly="rdOnly" v-model="selectedTemplate." -->
    <v-btn @click="deleteTemplate('behavior', selectedTemplate.id)">DELETE</v-btn>
  </div>
</template>

<script setup>
import axios from 'axios';

const roles = ref([])
const templates = ref([])
const rdOnly = ref(true)
const selectedRole = ref(null)
const selectedTemplate = ref(null)

onMounted(async () => {
  const resRole = await fetch("http://localhost:8000/api/roles?skip=0&limit=100")
        roles.value = await resRole.json();
        console.log(roles.value);
  const resTemplate = await fetch("http://localhost:8000/api/behavior-templates?skip=0&limit=100")
  templates.value = await resTemplate.json();
  console.log(templates.value);
});

  watch(selectedRole, (callback) => {
  if (selectedTemplate.value && callback !== null ) {
    selectedTemplate.value = null
  }
}, { deep: true })

watch(selectedTemplate, (callback) => {
  console.log(selectedTemplate.value)
  if (selectedRole.value && callback !== null ) {
    selectedRole.value = null
  }
}, { deep: true })

async function updateTemplate(table, id) {
  try {
    switch (table) {
      case ('role'):
        const changedRole = selectedRole.value
        const response = await axios.put(`http://localhost:8000/api/roles/${id}`, changedRole)
        console.log(response.data)
        console.log("success!")
        rdOnly.value = true
    }
  } catch (e) {
    console.error(e)
  }
}

async function deleteTemplate(table, id) {
  try {
    switch (table) {

    case ('role'):
      const response = await axios.delete(`http://localhost:8000/api/roles/${id}`)
      console.log(response.data)
      console.log("success!")
      roles.value = roles.value.filter(role => role.id !== id)
      selectedRole.value = null

    case ('behavior'):
      const res = await axios.delete(`http://localhost:8000/api/behavior-templates/${id}`)
      console.log(res.data)
      console.log("success!")
      templates.value = templates.value.filter(template => template.id !== id)
      selectedTemplate.value = null
    }

    
  } catch (e) {
    if (axios.isAxiosError(e)) {
      console.error(e)
    }
  }
}
  
</script>