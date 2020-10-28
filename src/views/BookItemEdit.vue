<template>
  <v-card class="w-inherit">
    <div class="d-flex" v-if="isLoading">
      <v-spacer></v-spacer>
      <v-progress-circular
        :size="170"
        :width="7"
        indeterminate
        color="cyan"
        class="mt-5 mb-5"
      ></v-progress-circular>
      <v-spacer></v-spacer>
    </div>

    <v-container v-else>
      <v-form
        class=""
        @submit.prevent="handleEdit"
        v-model="valid"
        modellazy-validation
      >
        <v-row>
          <v-col cols="12" md="3">
            <img :src="editedBookGet.coverSrc" class="book-cover " />
            <v-text-field
              label="Ссылка на картинку"
              v-model="editedBookGet.coverSrc"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="9">
            <v-text-field
              label="Название"
              v-model="editedBookGet.title"
              required
            ></v-text-field>

            <v-text-field
              label="Автор"
              v-model="editedBookGet.author"
              required
            ></v-text-field>

            <v-text-field
              label="Издатель"
              v-model="editedBookGet.publisher"
              required
            ></v-text-field>

            <v-text-field
              label="Стр."
              v-model="editedBookGet.pages"
              type="number"
              required
            ></v-text-field>

            <v-text-field
              label="ISBN"
              v-model="editedBookGet.isbn"
              required
            ></v-text-field>

            <v-menu
              v-model="menuDate1"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="editedBookGet.publicationDate"
                  label="Дата публикации"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="editedBookGet.publicationDate"
                @input="menuDate1 = false"
              ></v-date-picker>
            </v-menu>
            <v-menu
              v-model="menuDate2"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="editedBookGet.translationDate"
                  label="Дата перевода"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="editedBookGet.translationDate"
                @input="menuDate2 = false"
              ></v-date-picker>
            </v-menu>
          </v-col>
        </v-row>
        <v-textarea
          label="Описание"
          v-model="editedBookGet.description"
          required
        ></v-textarea>
        <v-card-actions>
          <v-btn outlined rounded class="" @click="goBack()" color="info">
            Назад
            <v-icon dark>
              mdi-arrow-left-circle
            </v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn outlined rounded color="success" @click="saveAndLeave()">
            Сохранить
            <v-icon dark>
              mdi-content-save-edit-outline
            </v-icon>
          </v-btn>
          <v-btn outlined rounded color="error" @click="deleteAndLeave()">
            Удалить
            <v-icon dark>
              mdi-trash-can-outline
            </v-icon>
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-container>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { BookInterface } from "../interfaces";

const Books = namespace("Books");
const Auth = namespace("Auth");

@Component
export default class BookItemEdit extends Vue {
  private isLoading = false;
  private menuDate1 = false;
  private menuDate2 = false;

  goBack() {
    this.$router.go(-1);
  }

  mounted() {
    if (this.$route.params.id && !this.editedBookGet.id) {
      this.$router.push("/book/" + this.$route.params.id);
    } else if (!this.$route.params.id && !this.editedBookGet.id) {
      this.$router.push("/");
    }
  }

  @Watch("$route", { deep: true })
  onPersonChanged1(to: any, from: any) {
    console.log("$route");
  }

  @Books.Action
  private deleteBookAction!: (book: any) => void;

  @Books.Getter
  private books!: Array<BookInterface>;

  get currentBook() {
    let _curr;
    this.books.forEach((el) => {
      if (el.id == this.$route.params.id) _curr = el;
    });
    return _curr;
  }

  deleteAndLeave() {
    this.deleteBookAction(this.currentBook);
    this.$router.push("/");
  }

  saveAndLeave() {
    this.isLoading = true;
    this.saveEditedBook().then(() => {
      this.isLoading = false;
      this.$router.push("/book/" + this.editedBookGet.id);
    });
  }

  @Books.Getter
  private editedBookGet!: BookInterface;

  @Books.Action
  private saveEditedBook!: () => Promise<void>;

  valid = true;
  private loading = false;

  /*   get currentBook() {
    let _curr = {} as BookInterface;
    this.books.forEach((el: BookInterface) => {
      if (el.id == this.$route.params.id) _curr = el;
    });
    return _curr;
  }
 */
  /* set currentBook(book: BookInterface) {} */
}
</script>

<style lang="scss">
.w-inherit {
  width: inherit;
}
</style>
