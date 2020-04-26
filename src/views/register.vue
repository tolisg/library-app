<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-sm-12">
        <h2>User registration</h2>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-12">
        <div class="card">
          <div class="card-body">
            <form
              novalidate
              data-vv-scope="user-registration-form"
              @submit.prevent="registerUser"
            >
              <div class="row">
                <div class="col-lg-6 form-group">
                  <label>Username</label>
                  <input
                    v-model="username"
                    v-validate="'required'"
                    type="text"
                    name="username"
                    class="form-control"
                  >
                  <div
                    v-if="errors.has('create-user-form.email')"
                    class="invalid-feedback"
                  >
                    {{ errors.first('create-user-form.email') }}
                  </div>
                </div>
                <div class="col-lg-6 form-group">
                  <label>Email</label>
                  <input
                    v-model="email"
                    v-validate="'required'"
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
                <div class="col-lg-6 form-group">
                  <label>Password</label>
                  <input
                    v-model="password"
                    v-validate="'required'"
                    type="password"
                    name="password"
                    class="form-control"
                  >
                  <div
                    v-if="errors.has('create-user-form.password')"
                    class="invalid-feedback"
                  >
                    {{ errors.first('create-user-form.password') }}
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-sm-12 d-flex">
                  <div class="ml-auto">
                    <button
                      type="submit"
                      class="btn btn-lg btn-primary mr-2"
                    >
                      Register
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
      email: ''
    };
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    ...mapActions(['registerUserAction']),
    async registerUser() {
      this.$validator.validateAll('user-registration-form').then(async (valid) => {
        if (valid) {
          await this.registerUserAction({
            username: this.username,
            email: this.email,
            password: this.password
          });
          if (this.user) {
            this.$router.push({ name: 'home' });
          }
        }
      });
    }
  }
};
</script>
