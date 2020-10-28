<template>
  <v-app id="app" background-color="grey">
    <Header :drawer.sync="drawer" />
    <v-navigation-drawer v-model="drawer" absolute>
      <v-list nav dense>
        <v-list-item-group
          v-model="group"
          active-class="cyan--text text--accent-4"
        >
          <v-list-item to="/">
            <v-list-item-title>
              <v-icon>mdi-home</v-icon> Каталог</v-list-item-title
            >
          </v-list-item>

          <v-list-item to="/register" v-if="!currentUser">
            <v-list-item-title>
              <v-icon>mdi-account-plus</v-icon> Регистрация
            </v-list-item-title>
          </v-list-item>

          <v-list-item to="/login" v-if="!currentUser">
            <v-list-item-title>
              <v-icon>mdi-account</v-icon> Вход
            </v-list-item-title>
          </v-list-item>

          <v-list-item to="/profile" v-if="currentUser">
            <v-list-item-title>
              <v-icon>mdi-account</v-icon> {{ currentUser.displayName }}
            </v-list-item-title>
          </v-list-item>
          <v-list-item @click.prevent="logOut" v-if="currentUser">
            <v-list-item-title>
              <v-icon>mdi-exit-run</v-icon> Выход
            </v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-container class="fill-height">
      <transition name="router-fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </v-container>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { BookInterface } from "./interfaces";
import Header from "@/components/Header.vue";
const Auth = namespace("Auth");
const Books = namespace("Books");

@Component({
  components: {
    Header,
  },
  /* watch: {
    group() {
      console.log("group");
      this.$emit("update:drawer", false);
    },
  }, */
})
export default class App extends Vue {
  drawer = false;
  group = null;

  @Books.Getter
  private books!: Array<BookInterface>;

  @Books.Action
  private updateEditedBook!: (book: BookInterface) => void;

  @Books.Action
  private initBookList!: () => void;

  @Auth.State("user")
  private currentUser!: any;

  @Auth.Action
  private signOut!: () => void;

  logOut() {
    this.signOut();
    this.$router.push("/login");
  }

  /* get showAdminBoard(): boolean {
    if (this.currentUser && this.currentUser.roles) {
      return this.currentUser.roles.includes("ROLE_ADMIN");
    }

    return false;
  } */
  /*   get showModeratorBoard(): boolean {
    if (this.currentUser && this.currentUser.roles) {
      return this.currentUser.roles.includes("ROLE_MODERATOR");
    }

    return false;
  } */

  @Watch("$route", { deep: true })
  onBookChanged(to: any, from: any) {
    if (this.$route.name === "bookEdit") {
      let _curr = {} as BookInterface;
      this.books.forEach((el: BookInterface) => {
        if (el.id == this.$route.params.id) _curr = el;
      });
      /* console.log(_curr); */
      this.updateEditedBook(_curr);
    }
    if (this.$route.name === "bookNew") {
      const _curr = {} as BookInterface;
      _curr.id = `b${(+new Date()).toString(16)}`;
      _curr.title = "Новая книга";
      this.updateEditedBook(_curr);
    }
    /* if (this.$route.name === "catalog") {
      this.initBookList();
    } */
  }
}
</script>

<style lang="scss">
.router-fade-enter-active {
  transition: all 0.3s ease;
}
.router-fade-leave-active {
  transition: all 0.3s cubic-bezier(0.5, 0.3, 0.4, 0.5);
}
.router-fade-enter, .router-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
