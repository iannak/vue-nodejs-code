<template>
  <div class="table-container">
    <table class="custom-table">
      <thead>
        <tr>
          <th></th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Participation (%)</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in paginatedData" :key="item._id">
          <td>{{ index + 1 }}</td>
          <td>{{ item.firstName }}</td>
          <td>{{ item.lastName }}</td>
          <td>{{ item.percentage }}%</td>
        </tr>
      </tbody>
    </table>
    <div class="pagination">
      <button :disabled="currentPage === 1" @click="previousPage">Previous</button>
      <span>{{ currentPage }} / {{ totalPages }}</span>
      <button :disabled="currentPage === totalPages" @click="nextPage">Next</button>
    </div>
  </div>
</template>

<script>
import apiClient from "@/services/api";

export default {
  name: "TableComponent",
  data() {
    return {
      tableData: [],
      currentPage: 1,
      pageSize: 5,
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.tableData.length / this.pageSize);
    },
    paginatedData() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.tableData.slice(startIndex, endIndex);
    },
  },
  mounted() {
    this.fetchTableData();
  },
  methods: {
    async fetchTableData() {
      try {
        const response = await apiClient.get("/participants");
        this.tableData = response.data;
      } catch (error) {
        console.error("Error:", error.response);
      }
    },
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
  },
};
</script>

<style scoped>
.table-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  width: 50%;
}

table.custom-table {
  width: 100%;
  max-width: 800px;
  border-collapse: collapse;
  border: 1px solid #ccc;
}

th,
td {
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ccc;
  border-right: 1px solid #ccc;
  border-top: 1px solid #ccc;
  color: #c6c6c6;
}

th {
  color: #c5c5c5;
}

td:last-child {
  border-right: none;
}

.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
}

button {
  background-color: #00b8e2;
  padding: 6px 12px;
  border: 2px solid #ffff;
  border-radius: 4px;
  color: white;
  text-transform: uppercase;
  margin: 0 5px;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
