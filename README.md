# M聊

## 技术栈
vue+vuex+vue-router+better-scroll+socket.io+koa2+mongodb+pm2自动化部署+图灵机器人+nginx+linux部署

## 功能清单
1、注册登录选择头像功能(canvas压缩大图片)

2、即时查看在线离线人员;

3、对聊、下拉加载更多信息、点击查看高清大图可左右滑动

4、群聊、下拉加载更多信息、点击查看高清大图可左右滑动

5、智能机器人对聊、下拉加载更多信息、点击查看高清大图可左右滑动

6、点击头像查看用户信息、可看关注、聊天、查看高清大图；

7、查看文章，支持上拉加载下拉刷新、评论、收藏、关注；

8、进入文章可以评论、回复、收藏、喜欢、点赞；

9、搜索、搜索用户姓名和文章、热门搜索、历史搜索；

10、我的个人中心、查看我的发布、收藏、喜欢的文章；

11、我的个人中心、我的关注、粉丝、评论、回复
私聊

## 项目目录

```
E:.
│   .babelrc
│   .editorconfig
│   .gitignore
│   .postcssrc.js
│   index.html
│   package-lock.json
│   package.json
│   README.md
│       
├───build
│       
├───config      
│                      
│           
├───src
│   │   App.vue
│   │   main.js
│   │   
│   ├───assets
│   │   ├───css
│   │   │       base.less
│   │   │       icon.less
│   │   │       index.less
│   │   │       mixin.less
│   │   │       reset.less
│   │   │       variable.less
│   │   │       
│   │   ├───fonts
│   │   │       icomoon.eot
│   │   │       icomoon.svg
│   │   │       icomoon.ttf
│   │   │       icomoon.woff
│   │   │       
│   │   ├───image
│   │   │       logo.png
│   │   │       
│   │   └───js
│   │           appback.js
│   │           history.js
│   │           mixin.js
│   │           util.js
│   │           
│   ├───base
│   │       bubble.vue
│   │       comment.vue
│   │       err.vue
│   │       evaluate.vue
│   │       fileup.vue
│   │       follow.vue
│   │       historyItem.vue
│   │       loading.vue
│   │       message.vue
│   │       nocomment.vue
│   │       nolist.vue
│   │       picture.vue
│   │       return.vue
│   │       scroll.vue
│   │       send.vue
│   │       slider.vue
│   │       toast.vue
│   │       updown.vue
│   │       upload.vue
│   │       vialogList.vue
│   │       
│   ├───components
│   │   │   bgImg.vue
│   │   │   groupItem.vue
│   │   │   listItem.vue
│   │   │   personItem.vue
│   │   │   personlist.vue
│   │   │   search.vue
│   │   │   tab.vue
│   │   │   tbsm.vue
│   │   │   vInput.vue
│   │   │   
│   │   └───messageBox
│   │       │   index.js
│   │       │   message.vue
│   │       │   
│   │       └───assets
│   │               error.svg
│   │               info.svg
│   │               success.svg
│   │               warning.svg
│   │               
│   ├───pages
│   │       article.vue
│   │       common.vue
│   │       dynamic.vue
│   │       fans.vue
│   │       follow.vue
│   │       group.vue
│   │       groupRoom.vue
│   │       login.vue
│   │       me.vue
│   │       message.vue
│   │       myperson.vue
│   │       news.vue
│   │       person.vue
│   │       personal.vue
│   │       photo.vue
│   │       pllist.vue
│   │       replay.vue
│   │       resign.vue
│   │       robot.vue
│   │       room.vue
│   │       searchList.vue
│   │       upUser.vue
│   │       val.vue
│   │       
│   ├───router
│   │       index.js
│   │       
│   └───store
│           actions.js
│           getters.js
│           index.js
│           mutations.js
│           state.js
│           
├───static
│   │   .gitkeep
│   │   
│   └───image
│           006.jpg
│           err.png
│           group.jpg
│           loading.gif
│           loginbg.jpg
│           loginbg1.jpg
│           me.png
│           news.png
│           nocomment.png
│           noList.png
│           preloading.jpg
│           robot.jpg
│           
└───uu     

```
该项目基础组件20个公共组件10个页面组件23个总共43个组件；

## 项目概况
![注册](https://raw.githubusercontent.com/TJLHQ/qqlx/master/static/gitImg/registor.gif)
![登录](https://raw.githubusercontent.com/TJLHQ/qqlx/master/static/gitImg/login.gif)
![页面](https://raw.githubusercontent.com/TJLHQ/qqlx/master/static/gitImg/pages.gif)
![发送](https://raw.githubusercontent.com/TJLHQ/qqlx/master/static/gitImg/send.gif)
![群组](https://raw.githubusercontent.com/TJLHQ/qqlx/master/static/gitImg/groups.gif)
![朋友圈](https://raw.githubusercontent.com/TJLHQ/qqlx/master/static/gitImg/news.gif)
![查找](https://raw.githubusercontent.com/TJLHQ/qqlx/master/static/gitImg/find.gif)
![我的](https://raw.githubusercontent.com/TJLHQ/qqlx/master/static/gitImg/me.gif)
![返回](https://raw.githubusercontent.com/TJLHQ/qqlx/master/static/gitImg/back.gif)

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```


For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
