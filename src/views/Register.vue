<template>
  <v-card class="mx-auto pl-5 pr-5 pb-5">
    <v-img
      id="profile-img"
      src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
      class="rounded-circle mx-auto mt-5 mb-5"
      max-height="150"
      max-width="150"
    />
    <v-form
      name="form"
      v-model="valid"
      @submit.prevent="handleRegister"
      modellazy-validation
    >
      <div v-if="!successful">
        <v-text-field
          v-model="user.username"
          :rules="nameRules"
          label="Username"
          required
        ></v-text-field>

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
          Sign Up
        </v-btn>
      </div>
    </v-form>

    <v-alert
      v-if="message"
      dense
      :type="successful ? 'success' : 'error'"
      class="mt-4 mb-0"
    >
      {{ message }}
    </v-alert>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
const Auth = namespace("Auth");

@Component
export default class Register extends Vue {
  [x: string]: any;
  valid = true;
  private user: any = {
    username: "",
    email: "",
    password: "",
  };
  showPass = false;
  nameRules = [
    (v: any) => !!v || "Name is required",
    (v: any) =>
      (v && v.length >= 3 && v.length <= 20) ||
      "Password must be more than 3 and less than 20 characters",
  ];
  passRules = [
    (v: any) => !!v || "Password is required",
    (v: any) =>
      (v && v.length >= 6) || "Password must be more than 6 characters",
  ];

  emailRules = [
    (v: any) => !!v || "E-mail is required",
    (v: string) => /.+@.+\..+/.test(v) || "E-mail must be valid",
  ];

  private submitted = false;
  private successful = false;
  private message = "";

  @Auth.Getter
  private isLoggedIn!: boolean;

  @Auth.Action
  private register!: (data: any) => Promise<any>;

  mounted() {
    if (this.isLoggedIn) {
      this.$router.push("/profile");
    }
  }

  handleRegister() {
    this.message = "";
    this.submitted = true;

    this.$validator.validate().then((isValid: any) => {
      if (isValid) {
        this.register(this.user).then(
          (data) => {
            this.message = data.message;
            this.successful = true;
          },
          (error) => {
            this.message = error;
            this.successful = false;
          }
        );
      }
    });
  }
}
</script>

<style scoped>
label {
  display: block;
  margin-top: 10px;
}

.card-container.card {
  max-width: 350px !important;
  padding: 40px 40px;
}

.card {
  background-color: #f7f7f7;
  padding: 20px 25px 30px;
  margin: 0 auto 25px;
  margin-top: 50px;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 2px;
  -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}

.profile-img-card {
  width: 96px;
  height: 96px;
  margin: 0 auto 10px;
  display: block;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
}
</style>
