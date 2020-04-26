<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-sm-12">
        <h2>Add new user</h2>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-12">
        <div class="card">
          <div class="card-body">
            <form
              novalidate
              data-vv-scope="create-user-form"
            >
              <div class="row">
                <div class="col-lg-6 form-group">
                  <label>Firstname</label>
                  <input
                    v-model="user.name"
                    v-validate="'required'"
                    type="text"
                    name="name"
                    class="form-control"
                  >
                  <div
                    v-if="errors.has('create-user-form.name')"
                    class="invalid-feedback"
                  >
                    {{ errors.first('create-user-form.name') }}
                  </div>
                </div>
                <div class="col-lg-6 form-group">
                  <label>Last Name</label>
                  <input
                    v-model="user.lastname"
                    v-validate="'required'"
                    type="text"
                    name="lastname"
                    class="form-control"
                  >
                  <div
                    v-if="errors.has('create-user-form.lastname')"
                    class="invalid-feedback"
                  >
                    {{ errors.first('create-user-form.lastname') }}
                  </div>
                </div>
                <div class="col-lg-6 form-group">
                  <label>Address</label>
                  <input
                    v-model="user.address"
                    v-validate="'required'"
                    type="text"
                    name="address"
                    class="form-control"
                  >
                  <div
                    v-if="errors.has('create-user-form.address')"
                    class="invalid-feedback"
                  >
                    {{ errors.first('create-user-form.address') }}
                  </div>
                </div>
                <div class="col-lg-6 form-group">
                  <label>Email</label>
                  <input
                    v-model="user.email"
                    v-validate="{ required: true, email: true }"
                    type="email"
                    name="email"
                    class="form-control"
                  >
                  <div
                    v-if="errors.has('create-user-form.email')"
                    class="invalid-feedback"
                  >
                    {{ errors.first('create-user-form.email') }}
                  </div>
                </div>
              </div>
            </form>
            <div class="row">
              <div class="col-sm-12 d-flex">
                <div class="ml-auto">
                  <button
                    class="btn btn-lg btn-primary mr-2"
                    @click="saveUser()"
                  >
                    Save
                  </button>
                  <button
                    class="btn btn-lg btn-secondary"
                    @click="cancel()"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import notifier from '@/shared/messages/';

export default {
  name: 'CreateUser',
  data() {
    return {
      user: {
        name: '',
        lastname: '',
        address: '',
        email: '',
        onloan: '',
        loan_history: []
      }
    };
  },
  methods: {
    ...mapActions(['addUserAction']),
    async saveUser() {
      this.$validator.validateAll('create-user-form').then(async (valid) => {
        if (valid) {
          // check if user email exists
          // If doesnt exist create user
          if (this.getUserByEmail(this.user.email) === undefined) {
            await this.addUserAction(this.user);
            this.$router.push({ name: 'home' });
            // else alert error
          } else {
            notifier.alert(
              `User cant created because this email <b>${this.user.email}</b> exists `
            );
          }
        }
      });
    },
    cancel() {
      this.$router.push({ name: 'home' });
    }
  },
  computed: {
    ...mapGetters(['getUserByEmail'])
  }
};
</script>

<style></style>
