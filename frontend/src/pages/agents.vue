<template>
    <v-card title="Active agents" class="MainContainer">   
        <v-table v-if="allAgents.length != 0">
            <thead>
                <tr>
                    <th>
                        agent
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
            <div v-else class="Text">
            <h>Your active agents will appear here!</h>
            <h>If agent deployed recently, give it some time to make respond</h>
            </div>
    </v-card>
</template>
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const allAgents = ref([])
const router = useRouter()

let intervalId = null

async function fetchAgents() {
  try {
    const res = await fetch("http://localhost:8000/api/agents/active?threshold_minutes=30")
    const data = await res.json()
    allAgents.value = data.agents
    console.log('Agents updated:', allAgents.value)
  } catch (err) {
    console.error(err)
  }
}

onMounted(() => {
  fetchAgents()
  intervalId = setInterval(fetchAgents, 30_000) 
})

onUnmounted(() => {
  clearInterval(intervalId) 
})

function agentInfo(id) {
  router.push(`/agent/${id}`)
}
</script>
<style>

</style>
