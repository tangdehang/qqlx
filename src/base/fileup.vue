<div style="margin-top: -6%; float: right;">
  <!-- 选择图片 -->
  <v-btn color="blue" depressed style="color:#FFFFFF;font-size:8px;width:15%;border-radius: 7px;position: absolute;left:72%;top:14%;float: right">点击上传</v-btn>
  <input style="position: absolute;left:76%;top:30%;opacity:0;float: right;" id="inp" type="file"
         accept="image/*"
         @change="chooseImg" />
  <!-- 预览图片 -->
  <canvas style="position: absolute;left:56%;top:12%;" ref="imgPreview"
          height="0"
          width="0"></canvas>
  <!-- 提交图片 -->
  <!--<button @click="uploadImg">提交图片</button>-->
  <!-- 通过后台返回的url向文件服务器请求图片 -->
  <img :src="imgUrlFromServer">
</div>
