<template>
  <v-card class="mx-auto pl-5 pr-5 pb-5">
    <v-img
      id="profile-img"
      src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
      class="rounded-circle mx-auto mt-5 mb-5"
      max-height="150"
      max-width="150"
    />
    <v-form @submit.prevent="handleLogin" v-model="valid" modellazy-validation>
      <v-text-field
        v-model="user.email"
        :rules="emailRules"
        label="Email"
        required
      ></v-text-field>

      <v-text-field
        :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
        v-model="user.password"
        :rules="passRules"
        label="Password"
        required
        :type="showPass ? 'text' : 'password'"
        @click:append="showPass = !showPass"
      ></v-text-field>

      <v-btn :disabled="!valid" color="success" type="submit">
        Login
      </v-btn>
    </v-form>
    <v-alert v-if="message" dense type="error" class="mt-4 mb-0">
      {{ message }}
    </v-alert>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
const Auth = namespace("Auth");

@Component
export default class Login extends Vue {
  [x: string]: any;
  emailRules = [
    (v: any) => !!v || "E-mail is required",
    (v: string) => /.+@.+\..+/.test(v) || "E-mail must be valid",
  ];

  passRules = [
    (v: any) => !!v || "Password is required",
    (v: any) =>
      (v && v.length >= 6) || "Password must be more than 6 characters",
  ];
  private valid = true;
  showPass = false;
  private user: any = {
    email: "",
    password: "",
  };
  private loading = false;
  private message = "";

  @Auth.Getter
  private isLoggedIn!: boolean;

  @Auth.Action
  private login!: (data: any) => Promise<any>;

  created() {
    if (this.isLoggedIn) {
      this.$router.push("/profile");
    }
  }

  handleLogin() {
    this.loading = true;
    this.$validator.validateAll().then((isValid: any) => {
      if (!isValid) {
        this.loading = false;
        return;
      }

      if (this.user.email && this.user.password) {
        this.login(this.user).then(
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          (data) => {
            this.$router.push("/profile");
          },
          (error) => {
            this.loading = false;
            this.message = error;
          }
        );
      }
    });
  }
}
</script>

<style scoped></style>
