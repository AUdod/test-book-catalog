<template>
  <v-card class="mb-5 w-inherit">
    <v-row>
      <v-col cols="12" md="3">
        <v-img
          :src="currentBook.coverSrc"
          class="book-cover "
          contain
        /> </v-col
      ><v-col cols="12" md="9">
        <v-card-title> {{ currentBook.title }} </v-card-title>
        <v-card-subtitle> {{ currentBook.author }}</v-card-subtitle>
        <v-card-text class=" ">
          <b>Издатель: </b> {{ currentBook.publisher }}</v-card-text
        >
        <v-card-text class="">
          <b>Стр.: </b> {{ currentBook.pages }}</v-card-text
        >
        <v-card-text class="">
          <b>ISBN: </b> {{ currentBook.isbn }}</v-card-text
        >
        <v-card-text class="">
          <b>Дата публикации: </b>
          {{ currentBook.publicationDate }}</v-card-text
        >
        <v-card-text class="">
          <b>Дата перевода: </b>
          {{ currentBook.translationDate }}</v-card-text
        >
      </v-col>
    </v-row>
    <v-card-text class="color_black">
      <b>Описание: </b>{{ currentBook.description }}</v-card-text
    >
    <v-card-actions v-if="currentUser">
      <v-btn outlined rounded class="" to="/" color="info">
        Назад
        <v-icon dark>
          mdi-arrow-left-circle
        </v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn
        outlined
        rounded
        color="warning"
        :to="'/book/' + currentBook.id + '/edit'"
      >
        Редактировать
        <v-icon dark>
          mdi-circle-edit-outline
        </v-icon>
      </v-btn>
      <v-btn outlined rounded color="error" @click="deleteAndLeave()">
        Удалить
        <v-icon dark>
          mdi-trash-can-outline
        </v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { BookInterface } from "@/interfaces";

const Books = namespace("Books");
const Auth = namespace("Auth");

@Component
export default class BookItem extends Vue {
  @Auth.State("user")
  private currentUser!: any;

  @Books.Getter
  private books!: Array<BookInterface>;

  @Books.Action
  private deleteBookAction!: (book: any) => void;

  deleteAndLeave() {
    this.deleteBookAction(this.currentBook);
    this.$router.push("/");
  }

  get currentBook() {
    let _curr;
    this.books.forEach((el) => {
      if (el.id == this.$route.params.id) _curr = el;
    });
    return _curr;
  }
}
</script>

<style lang="scss">
.color_black {
  color: #000000 !important;
}
.small-card-image {
  margin-top: 15px;
}
</style>
