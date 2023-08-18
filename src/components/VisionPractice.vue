<template>
  <div>
    <input type="file" accept="image/jpeg/*" @change="uploadImage()" />
    <button @click="callGoogleVIsionApi">detect</button>
    <div v-if="fullTextAnnotation">
      The result is <br /><br />
      {{ fullTextAnnotation }}
    </div>
    <div>
      <canvas
        ref="canvas"
        style="position: absolute; top: 200; left: 16; pointer-events: none"
      ></canvas>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      rawImg: null,
      fullTextAnnotation: "",
      textAnnotations: [],
      imgPath: "",
      boundingBoxes: [],
    };
  },
  methods: {
    uploadImage() {
      const file = document.querySelector("input[type=file]").files[0];
      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onloadend = () => {
        this.imgPath = reader.result;
        this.rawImg = reader.result.split(",")[1];
      };
    },
    async callGoogleVIsionApi() {
      const apiKey = "";
      let url = `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`;

      if (apiKey === "") {
        alert("api key가 없습니다");
        return;
      }

      const requestData = {
        requests: [
          {
            image: {
              content: this.rawImg,
            },
            features: [
              {
                type: "TEXT_DETECTION",
              },
            ],
          },
        ],
      };

      axios
        .post(url, requestData)
        .then((response) => {
          console.log(response);
          this.fullTextAnnotation =
            response.data.responses[0].fullTextAnnotation.text;
          this.textAnnotations = response.data.responses[0].textAnnotations;
          this.boundingBoxes =
            response.data.responses[0].textAnnotations[0].boundingPoly.vertices;
          this.drawBoundingBoxes();
        })
        .catch((e) => {
          console.error(e.response);
        });
    },
    drawBoundingBoxes() {
      console.log(this.boundingBoxes);
      const canvas = this.$refs.canvas;
      const context = canvas.getContext("2d");
      const img = new Image();
      img.src = this.imgPath;

      canvas.width = img.width;
      canvas.height = img.height;
      context.drawImage(img, 0, 0);

      // Draw bounding boxes
      context.strokeStyle = "red";
      context.lineWidth = 2;

      const x = this.boundingBoxes[0].x;
      const y = this.boundingBoxes[0].y;
      const width = this.boundingBoxes[1].x - this.boundingBoxes[0].x;
      const height = this.boundingBoxes[3].y - this.boundingBoxes[0].y;

      context.strokeRect(x, y, width, height);
    },
  },
};
</script>

<style scoped>
.original-img {
  width: 200px;
  height: 200px;
}
</style>
