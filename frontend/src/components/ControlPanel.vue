<template>
    <v-card>
        <v-table>
            <thead>
                <tr>
                    <th class="text-center">
                        agent
                    </th>
                    <th class="text-center">
                        status
                    </th>
                    <v-menu>
                        <v-btn color="white">
                            sort by:
                        </v-btn>
                        <v-list>
                            <v-list-item title="Status" />
                            <v-list-item title="Data of creation" />
                        </v-list>
                    </v-menu>
                </tr>
            </thead>
            <tbody>
                <tr v-for="agent in agents" :key="agent.id">
                    <td>{{ agent.name }}</td>
                    <td> {{ agent.status }}</td>
                </tr>
            </tbody>
        </v-table>
    </v-card>
</template>
<script>
    export default {
        data() {
            return {
                agents: [
                    {
                        name: "Engineer",
                        status: "Active",
                    },
                    {
                        name: "Engineer",
                        status: "Sleep",
                    },
                    {
                        name: "Engineer",
                        status: "ERROR",
                    },
                ]
            }
        }
    }
</script>
<style></style>
