<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-lg-4">
        <div class="card">
          <div class="card-body">
            <div class="row">
              <div class="col-sm-12 text-center">
                <h2>Please login</h2>
              </div>
            </div>
            <form
              novalidate
              data-vv-scope="user-login-form"
              @submit.prevent="loginUser"
            >
              <div class="row">
                <div class="col-sm-12 form-group">
                  <label>Username</label>
                  <input
                    v-model="username"
                    v-validate="'required'"
                    type="text"
                    name="username"
                    class="form-control"
                  >
                  <div
                    v-if="errors.has('create-user-form.username')"
                    class="invalid-feedback"
                  >
                    {{ errors.first('create-user-form.username') }}
                  </div>
                </div>
                <div class="col-sm-12 form-group">
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
                <div class="col-sm-12">
                  <button
                    type="submit"
                    class="btn btn-lg btn-primary btn-block"
                  >
                    Login
                  </button>
                </div>
              </div>
            </form>
            <div class="row">
              <div class="col-sm-12 d-flex">
                <button
                  type="button"
                  class="btn btn-lg btn-outline-secondary btn-block mt-3"
                  @click="registerUser"
                >
                  Register user
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
import { mapActions, mapState } from 'vuex';

export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: ''
    };
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    ...mapActions(['loginUserAction']),
    async loginUser() {
      this.$validator.validateAll('user-login-form').then(async (valid) => {
        if (valid) {
          await this.loginUserAction({ username: this.username, password: this.password });
          if (this.user) {
            this.$router.push({ name: 'home' });
          }
        }
      });
    },
    registerUser() {
      this.$router.push({ name: 'register' });
    }
  }
};
</script>
