<template>
  <nav class="navbar navbar-dark bg-dark navbar-expand-lg">
    <router-link to="/" class="navbar-brand">
      {{ $t('home') }}
    </router-link>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarNavAltMarkup"
      aria-controls="navbarNavAltMarkup"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon" @click="toggleNavbar" />
    </button>
    <div id="navbarNavAltMarkup" ref="navbarNavAltMarkup" class="collapse navbar-collapse">
      <div class="navbar-nav flex-grow-1">
        <div v-if="isLoggedIn" class="d-lg-flex">
          <router-link to="/createuser" class="nav-item nav-link">
            {{ $t('createNewUser') }}
          </router-link>
          <router-link to="/createbook" class="nav-item nav-link">
            {{ $t('createNewBook') }}
          </router-link>
          <router-link to="/manageusers" class="nav-item nav-link">
            {{ $t('ManageUsers') }}
          </router-link>
          <router-link to="/managebooks" class="nav-item nav-link">
            {{ $t('ManageBooks') }}
          </router-link>
          <router-link to="/loanbook" class="nav-item nav-link">
            {{ $t('LoanBook') }}
          </router-link>
          <router-link to="/returnbook" class="nav-item nav-link">
            {{ $t('ReturnBook') }}
          </router-link>
        </div>
        <div class="ml-lg-auto d-flex">
          <router-link v-if="!isLoggedIn" to="/login" class="nav-item nav-link">
            {{ $t('login') }}
          </router-link>
          <template v-else>
            <span class="username align-self-center">Welcome {{ user }}</span>
            <button type="button" class="btn btn-link" @click="logout">
              {{ $t('logout') }}
            </button>
          </template>
          <li class="nav-item border-left d-flex">
            <a
              v-for="lang in languages"
              :key="lang"
              href="javascript:;"
              :class="['nav-link', `${$i18n.locale === lang && 'active'}`]"
              @click="setLanguage(lang)"
              >{{ lang }}
            </a>
          </li>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex';
import { supportedlanguages, loadLanguageAsync } from '@/lang/i18n';

export default {
  name: 'NavBar',
  data() {
    return {
      languages: supportedlanguages
    };
  },
  computed: {
    ...mapGetters(['isLoggedIn']),
    ...mapState(['user'])
  },
  methods: {
    ...mapActions(['logoutUserAction']),
    setLanguage(lang) {
      loadLanguageAsync(lang);
    },
    toggleNavbar() {
      const { navbarNavAltMarkup } = this.$refs;
      if (!navbarNavAltMarkup.classList.contains('show')) {
        navbarNavAltMarkup.classList.add('show');
      } else {
        navbarNavAltMarkup.classList.remove('show');
      }
    },
    async logout() {
      await this.logoutUserAction();
      this.$router.push({ name: 'login' });
    }
  }
};
</script>
<style scoped lang="scss">
.router-link-active {
  color: white !important;
}
.navbar {
  position: fixed;
  z-index: 9999;
  width: 100%;
}
</style>
