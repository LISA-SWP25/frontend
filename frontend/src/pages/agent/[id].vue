<template>
    дописать
</template>
<script setup>

const route = useRoute();
const agentInformation = ref({});
 onMounted(async () => {
        const res = await fetch(`https://testapi.jasonwatmore.com/products/${route.params.id}`);
        agentInformation.value = await res.json();
    });

</script>