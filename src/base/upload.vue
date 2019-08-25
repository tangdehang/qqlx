<template>
    <input @change="inputChang" multil name="file" type="file" id="jjfxSoft_iconPath">
</template>
<script>

export default {
  props: {
    maxWidth: {
      type: Number,
      default: 750
    },
    maxHeight: {
      type: Number,
      default: 750
    }
  },
  mounted() {
    this.init();
  },
  data() {
    return {};
  },
  methods: {
    init() {
      let eleFile = document.querySelector("#jjfxSoft_iconPath");
      let reader = new FileReader(),
        img = new Image();
      this.reader = reader;
      // 选择的文件对象
      reader.onload = function(e) {
        img.src = e.target.result;
      };
      let _this = this;
      img.onload = function() {
        // 图片原始尺寸
        let originWidth = this.width;
        let originHeight = this.height;
        // 最大尺寸限制
        let maxWidth = _this.maxWidth,
          maxHeight = _this.maxHeight;
        // 目标尺寸
        let targetWidth = originWidth,
          targetHeight = originHeight;
        // 图片尺寸超过300x300的限制
        if (originWidth > maxWidth || originHeight > maxHeight) {
          if (originWidth / originHeight > maxWidth / maxHeight) {
            targetWidth = maxWidth;
            targetHeight = Math.round(maxWidth * (originHeight / originWidth));
          } else {
            targetHeight = maxHeight;
            targetWidth = Math.round(maxHeight * (originWidth / originHeight));
          }
        }
        _this.canvas(targetWidth, targetHeight, img);
      };
    },
    canvas(targetWidth, targetHeight, img) {
      let canvas = document.createElement("canvas");
      let context = canvas.getContext("2d");
      canvas.width = targetWidth;
      canvas.height = targetHeight;
      context.clearRect(0, 0, targetWidth, targetHeight);
      context.drawImage(img, 0, 0, targetWidth, targetHeight);
      let type = "image/jpeg";
      let dataurl = canvas.toDataURL(type);
      this.ajaxImg(dataurl);
    },
    inputChang(event) {
      let file = event.target.files[0];
      if (!file) return;
      // 选择的文件是图片
      if (file.type.indexOf("image") == 0) {
        this.reader.readAsDataURL(file);
      } else {
        this.$emit("errUpload", "请选择图片");
      }
    },
    ajaxImg(url) {
      this.$emit('sendBefor')
      this.$http.post("/uploadImg", { url }).then(res => {
        if (res.data.code) {
          this.$emit("uploadImg", res.data.list);
        } else {
          this.$emit("errUpload", res.data.message);
        }
        this.$emit('sendAfter')
      });
    }
  }
};
</script>

