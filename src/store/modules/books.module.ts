import { VuexModule, Module, Mutation, Action } from "vuex-module-decorators";
import { fStore } from "@/services/firebaseInit";
import { BookInterface } from "@/interfaces";
import firebase from "firebase";
@Module({ namespaced: true })
class Books extends VuexModule {
  public editedBook = {} as BookInterface;
  public bookList: Array<BookInterface> = [];

  @Mutation
  public addBook(book: any): void {
    this.bookList.push(book);
  }
  @Mutation
  public setBooksList(newBookList: any): void {
    this.bookList = newBookList;
  }
  @Mutation
  public editBook(changedBook: any): void {
    this.bookList.forEach(el => {
      if (el.id == changedBook.id) {
        this.bookList.splice(this.bookList.indexOf(el), 1, changedBook);
      }
    });
  }
  @Mutation
  public deleteBook(book: any): void {
    this.bookList.splice(this.bookList.indexOf(book), 1);
  }

  @Mutation
  public setEditedBook(book: any): void {
    this.editedBook = book;
  }

  @Action
  updateEditedBook(book: any): void {
    this.context.commit("setEditedBook", { ...book });
  }

  @Action
  async saveEditedBook(): Promise<void> {
    let noID = true;
    this.bookList.forEach(el => {
      if (el.id == this.editedBook.id) {
        noID = false;
      }
    });

    if (noID) {
      await fStore.collection("books").add(this.editedBook);
      this.context.commit("addBook", this.editedBook);
    } else {
      await fStore
        .collection("books")
        .where("id", "==", this.editedBook.id)
        .get()
        .then(qSnapshot => {
          qSnapshot.forEach(doc => {
            doc.ref.update(this.editedBook);
          });
        });
      this.context.commit("editBook", this.editedBook);
    }
  }

  @Action
  addNewBook(book: any): void {
    this.context.commit("addBook", book);
  }

  @Action
  async deleteBookAction(book: any): Promise<void> {
    await fStore
      .collection("books")
      .where("id", "==", book.id)
      .get()
      .then(qSnapshot => {
        qSnapshot.forEach(doc => {
          doc.ref.delete();
        });
      });

    this.context.commit("deleteBook", book);
  }

  @Action
  async initBookList(): Promise<void> {
    const bl: Array<Record<string, any>> = [];
    await fStore
      .collection("books")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          bl.push(doc.data());
        });
        this.context.commit("setBooksList", bl);
      });
  }

  get editedBookGet() {
    return this.editedBook;
  }

  get books(): Array<Record<string, any>> {
    return this.bookList;
  }
}

export default Books;
