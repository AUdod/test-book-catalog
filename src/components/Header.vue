<template>
  <v-app-bar color="cyan" dense dark class=".d-flex align-start flex-row">
    <v-app-bar-nav-icon
      class="hidden-md-and-up"
      @click="toggleDrawer()"
    ></v-app-bar-nav-icon>

    <v-toolbar-title>
      <v-icon large center class="mb-1">mdi-book-open-page-variant</v-icon>
      <h3 class="d-inline ml-3">Book Catalog</h3>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-tabs icons-and-text class="hidden-sm-and-down">
      <v-tabs-slider></v-tabs-slider>

      <v-tab to="/">
        Catalog
        <v-icon>mdi-home</v-icon>
      </v-tab>
      <v-spacer></v-spacer>
      <v-tab to="/register" v-if="!currentUser">
        Sign Up
        <v-icon>mdi-account-plus</v-icon>
      </v-tab>
      <v-tab to="/login" v-if="!currentUser">
        Login
        <v-icon>mdi-account</v-icon>
      </v-tab>
      <v-tab to="/profile" v-if="currentUser">
        {{ currentUser.displayName }}
        <v-icon>mdi-account</v-icon>
      </v-tab>
      <v-tab @click.prevent="logOut" v-if="currentUser">
        LogOut
        <v-icon>mdi-exit-run</v-icon>
      </v-tab>
    </v-tabs>
  </v-app-bar>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
const Auth = namespace("Auth");

@Component
export default class Header extends Vue {
  @Auth.State("user")
  private currentUser!: any;

  @Auth.Action
  private signOut!: () => void;

  logOut() {
    this.signOut();
    this.$router.push("/login");
  }

  toggleDrawer() {
    this.$emit("update:drawer", true);
  }
}
</script>

<style lang="scss">
.v-toolbar__title {
  min-width: 230px;
}
</style>
