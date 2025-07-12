<template>
  <div class="center">
    <h>Loading</h>
  <div class="pulse-dot"></div>
  </div>
</template>

<style scoped>
.pulse-dot {
  width: 12px;
  height: 12px;
  background-color: #FFF; /* зелёный */
  border-radius: 50%;
  box-shadow: 0 0 0 #808080;
  animation: pulse 3s infinite;
}

.center {
  display: flex;
  flex-direction: column;
  justify-content: center; /* по горизонтали */
  align-items: center;     /* по вертикали */
  height: 100vh;  
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(249, 249, 249, 0.7);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(74, 222, 128, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(74, 222, 128, 0);
  }
}
</style>