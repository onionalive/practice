<template>
  <v-container>
    <v-layout text-center wrap>
      <v-flex mb-5>
        <h1 class="display-2 font-weight-bold mb-3">Screenshot Difference Checker</h1>
      </v-flex>

      <v-flex xs12 mb-5>
        <v-form ref="form" v-model="valid">
          <v-text-field v-model="url" label="URL to screenshot" required></v-text-field>

          <v-select :items="deviceSizes" label="Select a Device Size" name="deviceSize" v-model="size"></v-select>

          <v-btn :disabled="!valid" color="success" class="mr-4" @click="getScreenshot">Get Screenshot</v-btn>
          <v-btn color="success" class="mr-4" @click="getExistingFiles">Get Existing Screenshots</v-btn>
        </v-form>
      </v-flex>

      <v-flex xs12 mb-5>
        <v-select :items="listOfFiles" label="List of ScreenShots" name="screenshots" v-model="screenshot" v-on:change="showScreenshot"></v-select>
      </v-flex>

      <v-flex xs12 mb-5>
        <v-row align="center" justify="center">
          <v-img :src="screenshotUrl"></v-img>
        </v-row>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  name: "Main",

  data: () => ({
    deviceSizes: [
      'Desktop',
      'Laptop',
      'iPad',
      'iPhoneX',
      'iPhone6'
    ],
    url: '',
    size: '',
    siteUrl: window.location.href,
    listOfFiles: [],
    screenshot: '',
    screenshotUrl: ''
  }),
  methods: {
    getScreenshot () {
      const { url, size, siteUrl } = this;

      let deviceSize = (size.length > 0) ? size : 'Desktop';

      let data = {
        "urlLocation": url,
        "size": deviceSize
      };
      data = JSON.stringify(data);
      console.log(data); // eslint-disable-line no-console

      fetch(`${siteUrl}v1/screenshot`, {
        method: 'post',
        body: data,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
    },
    getExistingFiles () {
      const { siteUrl } = this;
      const _this = this;

      axios.get(`${siteUrl}v1/get-files`)
      .then(function(response) {
        console.log(response.data) // eslint-disable-line no-console
        _this.listOfFiles = response.data;
      });
    },
    showScreenshot () {
      const { screenshot  } = this;
      const screenshotDir = `http://localhost/personal/practice/javascript/screenshot-diff/screenshots/`;
      this.screenshotUrl = `${screenshotDir}${screenshot}`;
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
