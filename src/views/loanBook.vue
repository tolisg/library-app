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
        <h2>Books Available for loan {{ loanbooks.length }}</h2>
      </div>
    </div>
    <div
      v-show="!loading"
      class="form-row"
    >
      <div
        v-for="(book, index) in books"
        v-show="book.copies_available > 0"
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
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-lg-6 form-group">
                <label>Copies available</label>
                {{ book.copies_available }}
              </div>
              <div class="col-lg-6 form-group">
                <label>Loan book to</label>
                <select
                  class="form-control custom-select"
                  :value="book.loan_to"
                  @change="update(`books.${index}.loan_to`, $event)"
                >
                  <option :value="''" />
                  <option
                    v-for="user in getUsers(book)"
                    :key="user._id"
                    :value="user._id"
                  >
                    {{
                      user.name
                    }}
                  </option>
                </select>
              </div>
            </div>
            <div
              v-show="book.loan_to != ''"
              class="row"
            >
              <div class="col-sm-12">
                <button
                  class="btn btn-block btn-primary"
                  @click="loanBook(book)"
                >
                  Loan book
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex';
import { cloneDeep } from 'lodash-es';
import Loading from '@/components/loading.vue';
import fecha from 'fecha';

export default {
  name: 'LoanBooks',
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
    this.message = 'Getting books please be patient';
    this.loading = true;
    // Get users and books
    await this.loadBooks();
    await this.loadUsers();
    this.message = '';
    this.loading = false;
  },
  methods: {
    ...mapActions([
      'getBooksAction',
      'getUsersAction',
      'updateValue',
      'updateBookAction',
      'updateUserAction'
    ]),
    async loadBooks() {
      await this.getBooksAction();
    },
    async loadUsers() {
      await this.getUsersAction();
    },
    getUsers(book) {
      const loan = book.loan_history;
      const users = this.users.filter((p) => {
        let canLoan = true;
        // A user can have up to 3 books. If loaned books = 3 cant loan any more
        if (p.onloan === 3) {
          canLoan = false;
        }
        // Check each user if have this book and have not returned it yet.
        for (let index = 0; index < loan.length; index++) {
          if (loan[index]._id === p._id && loan[index].is_loaned === true) {
            canLoan = false;
          }
        }
        // if user dont have more than 3 and dont have loaned this book then return him
        if (canLoan) {
          return p;
        }
      });
      return users;
    },
    async update(path, e) {
      await this.updateValue({ path, value: e.target.value });
    },
    async loanBook(book) {
      const loanbook = cloneDeep(book);
      const loanuser = cloneDeep(this.getUserById(loanbook.loan_to));
      const d = new Date();
      // Add fields needed to loan history of book
      loanbook.loan_history.push({
        _id: loanuser._id,
        name: loanuser.name,
        is_loaned: true,
        loan_date: fecha.format(d, 'DD-MM-YYYY hh:mm'),
        return_date: ''
      });
      loanbook.copies_available--;
      loanbook.loan_to = '';
      loanuser.onloan++;
      // Add fields needed to loan history of user
      loanuser.loan_history.push({
        _id: loanbook._id,
        title: loanbook.title,
        is_loaned: true,
        loan_date: fecha.format(d, 'DD-MM-YYYY hh:mm'),
        return_date: ''
      });
      await this.updateBookAction(loanbook);
      await this.updateUserAction(loanuser);
    }
  },
  computed: {
    ...mapGetters(['getUserById']),
    ...mapState(['books', 'users']),
    loanbooks() {
      const loanbooks = this.books.filter((p) => p.copies_available > 0);
      return loanbooks;
    }
  }
};
</script>
<style scoped lang="scss">
.card {
  min-height: 150px;
}
</style>
