<template>
    <v-card>   
        <v-table>
            <thead>
                <tr>
                    <th>
                        agent
                    </th>
                    <th>
                       status
                    </th>
                </tr>
            </thead>
            <tbody> 
                <tr v-if="sortType='id'" v-for="agent in allAgents" :key="agent.id" @click="agentInfo(agent.id)">
                    <td>{{ agent.name }}</td>
                    <td> {{ agent.id }}</td>
                </tr>
            </tbody>
        </v-table>
    </v-card>
</template>
<script setup>
    const sortType = 'id';
    const allAgents = ref([]);
    const router = useRouter();
    onMounted(async () => {
        const res = await fetch('https://testapi.jasonwatmore.com/products');
        allAgents.value = await res.json();
    });

    function agentInfo(id) {
        router.push(`/agent/${id}`);
        
    }
</script>
<style></style>
