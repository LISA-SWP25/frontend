<template>
  <v-form v-model="valid">
    <v-container>
      <v-row>
        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="name"
            label="First name"
            required
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="4"
        >
          <v-select
        v-model="OS"
        :items="OSs"
        label="OS"
        required/>
        </v-col>

      </v-row>
    </v-container>
  </v-form>
</template>
<script setup>
const OSs = [
    'WINDOWS',
    'LINUX'  ]
    const  name= ref('');
    const OS=ref('')

</script>