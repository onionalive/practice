<template>
  <v-container>
    <v-layout text-center wrap>
      <v-flex mb-4>
        <h1 class="display-2 font-weight-bold mb-3">Screenshot Difference Checker</h1>
      </v-flex>

      <v-flex xs12 mb-5>
        <v-form ref="form" v-model="valid">
          <v-text-field v-model="url" label="URL to screenshot" required></v-text-field>

          <v-btn :disabled="!valid" color="success" class="mr-4" @click="screenshotUrl">Validate</v-btn>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "Main",

  data: () => ({
    url: '',
  }),
  methods: {
    screenshotUrl () {
      const { url } = this;
      const siteUrl = window.location.href;
      console.log(url, siteUrl); // eslint-disable-line no-console

      fetch(`${siteUrl}v1/screenshot`, {
        method: 'post',
        body: url,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped="true">
  form {
    padding: 20px;
  }
</style>
