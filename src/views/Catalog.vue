<template>
  <div class="container">
    <div class="d-flex" v-if="isLoading">
      <v-spacer></v-spacer>
      <v-progress-circular
        :size="170"
        :width="7"
        indeterminate
        color="cyan"
      ></v-progress-circular>
      <v-spacer></v-spacer>
    </div>
    <div v-else>
      <v-btn
        outlined
        rounded
        class="mb-5"
        to="/new-book"
        color="info"
        v-if="currentUser"
      >
        <v-icon dark>
          mdi-plus
        </v-icon>
        Добавить книгу
      </v-btn>

      <v-card class="mb-5" v-for="book in books" :key="book.id">
        <v-img
          class="ml-auto mr-auto hidden-md-and-up "
          height="350px"
          max-width="350"
          contain
          :src="book.coverSrc"
        >
        </v-img>
        <div class="d-flex flex-no-wrap ">
          <img :src="book.coverSrc" class="book-cover hidden-sm-and-down" />
          <div>
            <v-card-title
              ><router-link :to="'/book/' + book.id"
                >{{ book.title }}
              </router-link></v-card-title
            >
            <v-card-subtitle> {{ book.author }}</v-card-subtitle>
            <v-card-text class="short ">
              <b>Описание: </b>{{ book.description }}</v-card-text
            >
            <div class="d-flex">
              <v-card-text class=" ">
                <b>Издатель: </b> {{ book.publisher }}</v-card-text
              >
              <v-card-text class="">
                <b>Стр.: </b> {{ book.pages }}</v-card-text
              >
              <v-card-text class=""> <b>ISBN: </b> {{ book.isbn }}</v-card-text>
            </div>
            <v-card-actions v-if="currentUser">
              <v-spacer></v-spacer>
              <v-btn
                outlined
                rounded
                color="warning"
                :to="'/book/' + book.id + '/edit'"
              >
                Редактировать
                <v-icon dark>
                  mdi-circle-edit-outline
                </v-icon>
              </v-btn>
              <v-btn
                outlined
                rounded
                color="error"
                @click="deleteBookAction(book)"
              >
                Удалить
                <v-icon dark>
                  mdi-trash-can-outline
                </v-icon>
              </v-btn>
            </v-card-actions>
          </div>
        </div>
      </v-card>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { BookInterface } from "@/interfaces";

const Books = namespace("Books");
const Auth = namespace("Auth");

@Component
export default class Home extends Vue {
  private isLoading = true;

  private content = "";

  @Auth.State("user")
  private currentUser!: any;

  @Books.Getter
  private books!: Array<BookInterface>;

  @Books.Action
  private initBookList!: () => Promise<void>;

  @Books.Action
  private deleteBookAction!: (book: any) => void;

  mounted() {
    this.initBookList().then(() => {
      this.isLoading = false;
    });
  }
}
</script>
<style lang="scss">
.v-card__text.short {
  overflow: hidden;
  max-height: 150px;

  text-overflow: ellipsis;
}
.book-cover {
  height: 350px;
  /* margin-top: auto;
  margin-bottom: auto; */
}
</style>
