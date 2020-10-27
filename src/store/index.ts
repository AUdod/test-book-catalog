import Vue from "vue";
import Vuex from "vuex";

import Auth from "./modules/auth.module";
import Books from "./modules/books.module";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    Auth,
    Books
  }
});
