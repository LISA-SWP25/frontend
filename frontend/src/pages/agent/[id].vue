<template>
    <td>ID: {{agentInformation.id}}</td>
    <v-divider/>
    <td>name: {{agentInformation.name}}</td>
    <v-divider/>
    still in development...
    <!-- <v-img src="https://preview.redd.it/imhnaes4nzre1.jpeg?width=640&crop=smart&auto=webp&s=26e95595b4d2b7d9789fa787d1f9a1dc22136bb0" /> -->
</template>
<script setup>

const route = useRoute();
const agentInformation = ref({});
 onMounted(async () => {
        const res = await fetch(`https://testapi.jasonwatmore.com/products/${route.params.id}`);
        agentInformation.value = await res.json();
    });

</script>