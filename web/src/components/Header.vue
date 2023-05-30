<template>
  <header class="custom-header">
    <div class="input-container">
      <input type="text" v-model="firstName" placeholder="First Name" />
      <input type="text" v-model="lastName" placeholder="Last Name" />
      <input type="text" v-model="percentage" placeholder="Participation" />
      <button @click="sendData">SEND</button>
    </div>
  </header>
</template>

<style scoped>
.custom-header {
  background-color: #00b8e2;
  height: 151px;
  margin: 0;
}

.input-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 0 20px;
}

input {
  margin-right: 10px;
  height: 55px;
  max-width: 293px;
  width: 100%;
}

input::placeholder {
  padding: 0 14px;
}

button {
  background-color: #00b8e2;
  padding: 6px 12px;
  border: 2px solid #ffff;
  border-radius: 4px;
  color: white;
  text-transform: uppercase;
  height: 55px;
  max-width: 153px;
  width: 100%;
}
</style>

<script>
import apiClient from "@/services/api";

export default {
  name: "AppHeader",
  data() {
    return {
      firstName: "",
      lastName: "",
      percentage: "",
    };
  },
  methods: {
    async sendData() {
      try {
        const response = await apiClient.post("/participants", {
          firstName: this.firstName,
          lastName: this.lastName,
          percentage: this.percentage,
        });
        console.log("Response:", response.data);
        this.$emit("participantCreated"); // Emite o evento após o envio dos dados
        window.location.reload(); // Realiza o reload da página
      } catch (error) {
        console.error("Error:", error.response);
      }
    },
  },
};
</script>
