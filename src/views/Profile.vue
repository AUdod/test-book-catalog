<template>
  <v-card>
    <v-card-title>Пользователь {{ currentUser.displayName }} </v-card-title>
    <v-card-text><strong>Id:</strong> {{ currentUser.uid }}</v-card-text>
    <v-card-text><strong>E-mail:</strong> {{ currentUser.email }}</v-card-text>
  </v-card>
  <!--<p>
      <strong>Token:</strong>
      {{ currentUser.accessToken.substring(0, 20) }} ...
      {{ currentUser.accessToken.substr(currentUser.accessToken.length - 20) }}
    </p> -->
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
const Auth = namespace("Auth");

@Component
export default class Profile extends Vue {
  @Auth.State("user")
  private currentUser!: any;

  mounted() {
    if (!this.currentUser) {
      this.$router.push("/login");
    }
  }
}
</script>
