<template>
  <v-form v-model="valid">
    <v-container>
      <v-row>
        <v-col>
          <v-text-field
            v-model="name"
            label="First name"
            required
          ></v-text-field>
        </v-col>

        <v-col>
          <v-select
        v-model="OS"
        :items="OSs"
        label="OS"
        required/>
        </v-col>

        <v-col>
          <v-select
        v-model="modelTemplate"
        :items="modelTemplates"
        label="Role"
        required/>
        </v-col>

      </v-row>
        <v-container v-if="modelTemplate === 'Create role'">
            <v-row>
                <v-col class="overflow-y-auto" style="max-height: 400px;">
                    <v-text-field v-for="app in apps">
                        <template #append-inner>
                            <v-icon @click="clearText" class="cursor-pointer" color="grey">
                                mdi-close
                            </v-icon>
                        </template>
                    </v-text-field>
                    <v-btn @click="addApp">Add App</v-btn>
                    
                </v-col>
                <v-col class="overflow-y-auto" style="max-height: 400px;">
                    <v-text-field v-for="page in pages">
                        <template #append-inner>
                            <v-icon @click="deleteApp" class="cursor-pointer" color="grey">
                                mdi-close
                            </v-icon>
                        </template>
                    </v-text-field>
                    <v-btn @click="addPage">Add page</v-btn>
                </v-col>
                <v-col class="overflow-y-auto" style="max-height: 400px;">
                    <v-container v-for="brake in brakes">
                        <v-row>
                            <v-col>
                                <v-text-field label="start">
                                </v-text-field>
                            </v-col>
                            <v-col>
                                <v-text-field label="duration">
                                </v-text-field>
                            </v-col>
                        </v-row>                    <template #append-inner>
                            <v-icon @click="clearText" class="cursor-pointer" color="grey">
                                mdi-close
                            </v-icon>
                        </template>
                    </v-container>
                    <v-btn @click="addbrake">Add brake</v-btn>
                </v-col>
            </v-row>  
        </v-container>
        <v-btn @click="submit">submit</v-btn>
    </v-container>
  </v-form>
</template>
<script setup>
const OSs = [
    'WINDOWS',
    'LINUX'  ]
const modelTemplates = [
    'Engineer',
    'Financist',
    'Developer',
    'Create role'
]
    const  name= ref('');
    const OS=ref('');
    const modelTemplate=ref('');
    const apps=ref([])
    const pages=ref([])
    const brakes=ref([])

    function addApp() {
        const newApp = '';
        apps.value.push(newApp);
    }

    function addPage() {
        const newPage = '';
        pages.value.push(newPage);
    }

    function addbrake() {
        const newBrake = '';
        brakes.value.push(newBrake);
    }

</script>