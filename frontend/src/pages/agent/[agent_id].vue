<template>
     <div v-if="agentInformation.agent">
    <p><strong>ID:</strong> {{ agentInformation.agent.agent_id }}</p>
    <p><strong>Name:</strong> {{ agentInformation.agent.name }}</p>
    <p><strong>OS:</strong> {{ agentInformation.agent.os_type }}</p>
    <p><strong>Status:</strong> {{ agentInformation.agent.status }}</p>
    <p><strong>Template:</strong> {{ agentInformation.agent.template }}</p>
    <p><strong>Created at:</strong> {{ agentInformation.agent.created_at }}</p>
    <p><strong>Last seen:</strong> {{ agentInformation.agent.last_seen || 'NA' }}</p>
  
    <v-divider/>
        <div>
            <strong>recent activity:</strong>
            <div v-if="heartbeats.length !== 0" v-for="heartbeat in heartbeats">
                {{ heartbeat }}
            </div>
            <div v-else>no activity detected</div>
            </div>
        </div>  
        <div v-else>
            Loading agent information...
        </div>

</template>


<script setup>
import axios from 'axios';
const route = useRoute();
const agentInformation = ref({});
const heartbeats = ref([]);

let intervalId = null

async function fetchHeartbeats() {
  try {
    const res = await fetch(` 'http://localhost:8000/api/agents/${agentInformation.value.agent.agent_id}/heartbeats?limit=10'`)
    const data = await res.json()
    heartbeats = data.heartbeats
    console.log('Agents updated:', heartbeats.value)
  } catch (err) {
    console.error(err)
  }
}
   

onMounted(async () => {
    clearInterval(intervalId) 
    try {
        const res = await fetch(`http://localhost:8000/api/agents/${route.params.agent_id}/status`);
        
        if (!res.ok) {
            const errorText = await res.text();
            console.error(errorText);
            return;
        }

        fetchHeartbeats()
        intervalId = setInterval(fetchAgents, 30_000)

        const data = await res.json();
        agentInformation.value = data;
        console.log(data); 
    } catch (error) {
        console.error(error);
    }
});

</script>