<template>
    <v-card title="Deploy" class="MainContainer">   
        <v-table>
            <thead>
                <tr>
                    <th>
                        agent template
                    </th>
                    <th>
                       ID
                    </th>
                </tr>
            </thead>
            <tbody> 
                <tr v-for="agent in allAgents" :key="agent.id" @click="agentInfo(agent.agent_id)">
                    <td>{{ agent.name }}</td>
                    <td> {{ agent.id }}</td>
                </tr>
            </tbody>
        </v-table>
    </v-card>
</template>
<script setup>
    const allAgents = ref([]);
    const router = useRouter();
    onMounted(async () => {
        const res = await fetch("http://localhost:8000/api/agents?skip=0&limit=100")
        allAgents.value = await res.json();
        console.log(allAgents);
        
    });

    function agentInfo(id) {
        router.push(`/deployAgent/${id}`);
        
    }
</script>
<style></style>
