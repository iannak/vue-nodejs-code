<template>
  <Header />
  <div class="table-container">
    <TableComponent />

    <DonutLabels />
  </div>
</template>

<script>
import Header from './components/Header.vue'
import TableComponent from './components/TableComponent.vue'
import DonutLabels from "@/components/DonutLabels.vue";

export default {
  name: 'App',
  components: {
    DonutLabels,
    Header,
    TableComponent
  }
}
</script>

<style>
.table-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;
}

body {
  margin: 0;
  padding: 0;
}
</style>
