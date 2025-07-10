<template>
  <div>
    <v-select label="Roles"/>
    <v-select label="Behaviors"/>
  </div>
</template>

<script setup>
const roles = ref([])
const templates = ref([])

onMounted(async () => {
  const resRole = await fetch("http://localhost:8000/api/roles?skip=0&limit=100")
  roles.value = await resRole.json();
  console.log(roles.value);
  const resTemplate = await fetch("http://localhost:8000/api/behavior-templates?skip=0&limit=100")
  templates.value = await resTemplate.json();
  console.log(templates.value);
});

  async function getTemplate(id, source) {
    if (source == 'roles') {
      const res = await fetch('http://localhost:8000/api/roles/$id')
    }
    
  }
</script>