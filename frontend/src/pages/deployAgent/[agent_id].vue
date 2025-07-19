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
            <v-select v-model = "selectedServer" label="select target server" item-title="name" :items="servers" :return-object="true"/>
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
const servers = ref([])
const selectedServer = ref()

async function deploy() {
    try {
        console.log(deployTemplate.value)
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

watch(selectedServer, (callback) => {
  if (callback) {
    deployTemplate.value.server_ip = callback.ip
    deployTemplate.value.server_password = callback.password
    deployTemplate.value.server_user = callback.login
  }
})

onMounted(async () => {
    try {
        const res = await fetch(`http://localhost:8000/api/agents/${route.params.agent_id}/status`);
        const data = await res.json();
        agentInformation.value = data;
        console.log(agentInformation.value.agent.os_type)
        const getServers = await axios.get('http://localhost:8000/api/servers');
        servers.value = getServers.data.filter(server => server.os == agentInformation.value.agent.os_type);

        console.log("Фильтрованные сервера:", servers.value);
    } catch (error) {
        console.error("Ошибка запроса:", error);
    }
});

</script>