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
      <div
        v-show="books.length"
        class="col-sm-12"
      >
        <h2>Books Available {{ books.length }}</h2>
      </div>
    </div>
    <div
      v-show="!loading"
      class="form-row"
    >
      <div
        v-for="book in books"
        :key="book._id"
        class="col-lg-6 mb-2 flex-column"
      >
        <div class="card h-100">
          <div class="card-header d-flex">
            <h4
              class="text-truncate flex-grow-1 flex-shrink-1 mb-0 pb-1 align-self-center"
              :title="book.title"
            >
              {{ book.title }}
            </h4>
            <button
              class="btn btn-lg btn-link flex-grow-0 flex-shrink-0"
              @click="askToDelete(book)"
            >
              Delete book
            </button>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-sm-12">
                {{ book.summary }}
              </div>
              <div class="col-lg-6">
                <label>Copies purchased</label>
                {{ book.copies }}
              </div>
              <div class="col-lg-6">
                <label>Copies available</label>
                {{ book.copies_available }}
              </div>
              <div class="col-lg-6">
                <label>{{ book.loan_history.filter((h) => h.is_loaned === true).length }} Copies
                  loaned</label>
                <ul v-if="book.loan_history.length > 0">
                  <li
                    v-for="(loan, index) in book.loan_history"
                    v-show="loan.is_loaned === true"
                    :key="index"
                  >
                    {{ loan.name }}
                  </li>
                </ul>
              </div>
              <div class="col-lg-6">
                <label>ISBN</label>
                {{ book.ISBN }}
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
  name: 'ManageBooks',
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
    await this.loadBooks();
  },
  methods: {
    ...mapActions(['getBooksAction', 'deleteBookAction']),
    async loadBooks() {
      this.message = 'Getting books please be patient';
      this.loading = true;
      await this.getBooksAction();
      this.message = '';
      this.loading = false;
    },
    askToDelete(book) {
      // Check book If loaned
      // If not loaned then open confirmation message
      if (book.loan_history.filter((h) => h.is_loaned === true).length === 0) {
        const onOK = () => this.deleteBook(book);
        const onCancel = () => {};
        notifier.confirm(`Are you sure you want to delete <b>${book.title}</b>`, onOK, onCancel, {
          labels: {
            confirm: 'Delete confirmation'
          }
        });
        // Else show error message
      } else {
        notifier.alert(
          `Book cant deleted because is loaned by <b>${book.loan_history.map((h) => h.name)}</b>`
        );
      }
    },
    async deleteBook(book) {
      if (book) {
        await this.deleteBookAction(book);
      }
      // await this.loadBooks();
    }
  },
  computed: {
    ...mapState(['books'])
  }
};
</script>
<style scoped lang="scss">
.card {
  min-height: 150px;
}
</style>
