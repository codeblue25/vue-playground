<template>
  <div>
    <input
      type="file"
      accept="image/jpeg/*"
      @change="uploadImage()"
    />
    <button @click="callGoogleVIsionApi">detect</button>
  </div>
</template>

<script>

export default {
  data() {
    return {
      rawImg: null
    }
  },
  methods: {
    uploadImage() {
    const file = document.querySelector('input[type=file]').files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      this.rawImg = reader.result;
      console.log(this.rawImg);
    }
    reader.readAsDataURL(file);
      console.log(file)
      console.log(this.rawImg)
    },
    async callGoogleVIsionApi() {
      let url = " https://vision.googleapis.com/v1/images:annotate" + "key";


      await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          requests: [
            {
              image: {
                content: this.rawImg,
              },
              features: [
                { type: 'TEXT_DETECTION', maxResults: 5 },
              ],
            },
          ],
        }),
      })
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          fullTextAnnotation: data.responses[0].fullTextAnnotation.text,
        });
      })
      .catch((err) => console.log('error : ', err));
    }
  }
}

</script>

<style lang="scss" scoped>

</style>