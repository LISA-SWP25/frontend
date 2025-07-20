<template>
<v-card title="Add Server" class="MainContainer">
    <v-text-field v-model = "server.name" label="name *" required/>
    <v-textarea v-model="server.description" label="description"/>
    <v-text-field v-model = "server.ip" label="ip *" required/>
    <v-text-field v-model = "server.login" label="login *" required/>
    <v-text-field v-model = "server.password" label="password *" required/>
    <v-select v-model = "server.os" label="OS *" :items="os"/>
    <div class="d-flex justify-center align-end">
    <v-btn @click="submit">Add</v-btn>
    </div>
</v-card>
</template>

<script setup>
import axios from 'axios';

const os = ['windows', 'linux']
const router = useRouter()
const server = ref({  
  name: "",
  description: "",
  ip: "",
  login: "",
  password: "",
  os: ""
})

async function submit() {
    try {    
        const res = await axios.post("http://localhost:8000/api/servers", server.value)
        console.log("success!")
        router.push(`/deploy`);
        
    } catch (e) {
        console.error(e)
    }
}

</script>