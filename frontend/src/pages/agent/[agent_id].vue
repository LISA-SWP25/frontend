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
        <div><strong>recent activity:</strong>
            <div v-if="agentInformation.recent_activities.length !== 0" v-for="action in agentInformation.recent_activities">
                {{ action }}
            </div>
            <div v-else>no activity detected</div>
        </div>
        </div>  
        <div v-else>
            Loading agent information...
        </div>
<!--       <v-table>
            <thead>
                <tr>
                    <th>breaks</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="breaks in agentInformation.work_schedule.breaks">
                    <td> {{ breaks.start }}</td>
                    <td> {{ breaks.duration_minutes }}</td>
                </tr>
            </tbody>
        </v-table> -->
</template>


<script setup>
const route = useRoute();
const agentInformation = ref({});
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