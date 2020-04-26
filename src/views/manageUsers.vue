<template>
  <div class="container-fluid">
    <Loading
      v-if="loading"
      :msg="message"
    />
    <div
      v-show="!loading"
      class="row"
    >
      <div class="col-sm-12">
        <h2>Users Available {{ users.length }}</h2>
      </div>
    </div>
    <div
      v-show="!loading"
      class="form-row"
    >
      <div
        v-for="user in users"
        :key="user._id"
        class="col-lg-6 mb-2 flex-column"
      >
        <div class="card h-100">
          <div class="card-header d-flex">
            <h4
              class="text-truncate flex-grow-1 flex-shrink-1 mb-0 pb-1 align-self-center"
              :title="user.name"
            >
              {{ fullname(user) }} ({{ user.email }})
            </h4>
            <button
              class="btn btn-lg btn-link flex-grow-0 flex-shrink-0"
              @click="askToDelete(user)"
            >
              Delete user
            </button>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-lg-6">
                <h5 class="card-title">
                  Address
                </h5>
                {{ user.address }}
              </div>
              <div class="col-lg-6">
                <label>{{ user.loan_history.filter((h) => h.is_loaned === true).length }} Copies
                  loaned</label>
                <ul v-if="user.loan_history.length > 0">
                  <li
                    v-for="(loan, index) in user.loan_history"
                    v-show="loan.is_loaned === true"
                    :key="index"
                  >
                    {{ loan.title }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import Loading from '@/components/loading.vue';
import notifier from '@/shared/messages/';

export default {
  name: 'ManageUsers',
  components: {
    Loading
  },
  data() {
    return {
      message: '',
      loading: false
    };
  },
  async created() {
    await this.loadUsers();
  },
  methods: {
    ...mapActions(['getUsersAction', 'deleteUserAction']),
    async loadUsers() {
      this.message = 'Getting users please be patient';
      this.loading = true;
      await this.getUsersAction();
      this.message = '';
      this.loading = false;
    },
    fullname(user) {
      return `${user.name} ${user.lastname}`;
    },
    askToDelete(user) {
      // Check user If have books loaned
      // If no book loaned then open confirmation message
      if (user.loan_history.filter((h) => h.is_loaned === true).length === 0) {
        const onOK = () => this.deleteUser(user);
        const onCancel = () => {};
        notifier.confirm(
          `Are you sure you want to delete <b>${user.name} ${user.lastname}</b>`,
          onOK,
          onCancel,
          {
            labels: {
              confirm: 'Delete confirmation'
            }
          }
        );
        // Else show error message
      } else {
        notifier.alert(
          `User cant deleted because has loaned <b>${user.loan_history.map((h) => h.title)}</b>`
        );
      }
    },
    async deleteUser(user) {
      if (user) {
        await this.deleteUserAction(user);
      }
      // await this.loadUsers();
    }
  },
  computed: {
    ...mapState(['users'])
  }
};
</script>
<style scoped lang="scss">
.card {
  min-height: 150px;
}
</style>
