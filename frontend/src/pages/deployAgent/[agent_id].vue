<template>
    <v-card title="Deploy agent" class="MainContainer">
     <div v-if="agentInformation.agent">
    <p><strong>ID:</strong> {{ agentInformation.agent.agent_id }}</p>
    <p><strong>Name:</strong> {{ agentInformation.agent.name }}</p>
    <p><strong>OS:</strong> {{ agentInformation.agent.os_type }}</p>
    <p><strong>Status:</strong> {{ agentInformation.agent.status }}</p>
    <p><strong>Template:</strong> {{ agentInformation.agent.template }}</p>
    <p><strong>Created at:</strong> {{ agentInformation.agent.created_at }}</p>
    <p><strong>Last seen:</strong> {{ agentInformation.agent.last_seen || 'NA' }}</p>   
    </div>  
        <div v-else>
            Loading agent information...
        </div>
        <div class="CenterContainer">
        <v-card title="deploy" class="CenterCard">
            <v-text-field v-model="deployTemplate.server_ip" label="Server IP" hint="IP"/>
            <v-text-field v-model="deployTemplate.server_user" label="User" />
            <v-text-field v-model="deployTemplate.server_password" label="Password" />
             <div class="CenterButton">
                <v-btn text="deploy" @click="deploy" />
            </div>
        </v-card>
        </div>
    </v-card>
</template>


<script setup>
import axios from 'axios';
const route = useRoute();
const agentInformation = ref({});

async function deploy() {
    try {
        const response = await axios.post(`http://localhost:8000/api/agents/${agentInformation.value.agent.agent_id}/deploy`, deployTemplate.value);
        console.log(response.data)
        console.log("sended!")

    }
    catch (e) {
        console.error(e)
    }
}

const deployTemplate = ref({
    server_ip: "",
    server_user: "",
    server_password: ""
    });

onMounted(async () => {
    try {
        const res = await fetch(`http://localhost:8000/api/agents/${route.params.agent_id}/status`);
        
        if (!res.ok) {
            const errorText = await res.text();
            console.error("Ошибка при получении данных:", errorText);
            return;
        }

        const data = await res.json();
        agentInformation.value = data;
        console.log(data); 
    } catch (error) {
        console.error("Ошибка запроса:", error);
    }
});

</script>