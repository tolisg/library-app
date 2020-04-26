<template>
  <div class="container-fluid text-center">
    <h1 class="title">
      My Library app
    </h1>
    <h4>Manage books loaning system</h4>
    <div class="card">
      <div class="card-body">
        <div class="row">
          <div class="col-lg-6">
            <h5>{{ users.length }} Users exists in the system</h5>
          </div>
          <div class="col-lg-6">
            <h5>{{ books.length }} Books exists in the system</h5>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'Home',
  computed: {
    ...mapState(['books', 'users']),
  },
  async created() {
    await this.loadUsers();
    await this.loadBooks();
  },
  methods: {
    ...mapActions(['getBooksAction', 'getUsersAction']),
    async loadUsers() {
      await this.getUsersAction();
    },
    async loadBooks() {
      await this.getBooksAction();
    },
  },
};
</script>
