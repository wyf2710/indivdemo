<template>
  <div id="music">
    <el-container v-show="!ishow">
      <el-header height="118px">
        <div class="btn">
          <el-button round color="#ec4141" icon="Back">回到首页</el-button>
          <h1>小小的 Music</h1>
        </div>
        <div class="search">
          <el-input v-model="input1" size="large" prefix-icon="Search" clearable>
            <template #append>
              <el-button icon="Search" @click="searchMusic" />
            </template>
          </el-input>
        </div>
      </el-header>
      <el-container>
        <el-aside width="280px">

          <el-scrollbar ref="scrollbarRef" height="400px" always @scroll="scroll">
            <h1>Music List</h1>
            <div ref="innerRef">
              <div class="scrollbar-demo-item" v-for="(item,index) in musicList" :key="index">
                <p class="listitem">
                  {{item.name}}
                </p>
                <div class="btnitem">
                  <el-button class="video" icon="VideoPlay" color="#ec4141" @click="playMusic(item.id,item.name)" />
                  <el-button class="video" icon="VideoCamera" color="#ec4141" :disabled="item.mvid==0" @click="playMv(item.mvid)" />
                </div>
              </div>
            </div>
          </el-scrollbar>
        </el-aside>
        <el-container>
          <el-main>
            <el-scrollbar ref="scrollbarRef" height="368px" always @scroll="scroll">
              <div class="uishow">
                <div class="small-rou"></div>
                <div :class="isplay ? ['rac-div','move'] :['rac-div']"></div>
                <div :class="isplay ? ['rou-div','rotate'] :['rou-div']">
                  <img :src="picUrl" alt="">
                </div>
              </div>
              <div class="text">
                <h1>热门留言

                </h1>
                <div v-for="(item,index) in hotComments" :key="index" class="scrollbar-demo-item">
                  <p style="color:#ec4141;margin-bottom:10px;">{{item.user.nickname}}----</p>{{item.content}}
                </div>
              </div>
            </el-scrollbar>
          </el-main>

        </el-container>
      </el-container>
      <el-footer height="80px">
        <div class="info">
          <p>{{name}}-{{songname}}</p>
        </div>
        <audio :src="musicUrl" @play="play" @pause="pause" autoplay controls>

          您的浏览器不支持 audio 标签。
        </audio>
      </el-footer>
    </el-container>

    <div v-show="ishow">
      <video :src="mvUrl" autoplay controls></video>
      <div @click="hide" class="mask" style="display: block;"></div>
    </div>
  </div>
</template>

<script>
// import musicImg from './../assets/logo.png'
// import musicUrl from './../static/tyzssq.mp3'
export default {
  name: 'music',
  // setup() {
  //   return {
  //     musicUrl,
  //     musicImg
  //   }
  // },
  data() {
    return {
      input1: '许巍',
      musicList: [],
      hotComments: [],
      name: '',
      songname: '',
      isplay: false,
      ishow: false,
      musicUrl: '',
      picUrl: '',
      mvUrl: ''
    }
  },
  methods: {
    // showvideo() {
    //   this.$message({
    //     message: '正为你播放视频 ...',
    //     // grouping: true,
    //     showClose: true,
    //     type: 'success'
    //   })
    // },
    // 歌曲查询
    searchMusic() {
      this.$axios.get('https://autumnfish.cn/search?keywords=' + this.input1).then(
        res => {
          // console.log(res.data.result.songs)
          // console.log(this.musicList)
          this.musicList = res.data.result.songs
        },
        err => {
          console.log(err)
        }
      )
    },
    // 歌曲播放
    playMusic(musicId, songname) {
      console.log(musicId)
      // 获取歌曲地址
      this.$axios.get('https://autumnfish.cn/song/url?id=' + musicId).then(
        res => {
          console.log(res)

          this.musicUrl = res.data.data[0].url
          // console.log(this.musicUrl)
          this.name = this.input1
          this.songname = songname
        },
        err => {
          console.log(err)
        }
      )
      // 获取歌曲封面
      this.$axios.get('https://autumnfish.cn/song/detail?ids=' + musicId).then(
        res => {
          this.picUrl = res.data.songs[0].al.picUrl
        },
        err => {
          console.log(err)
        }
      )
      // 歌曲评论获取
      this.$axios.get('https://autumnfish.cn/comment/hot?type=0&id=' + musicId).then(
        res => {
          this.hotComments = res.data.hotComments
          console.log(this.hotComments)
        },
        err => {
          console.log(err)
        }
      )
    },
    play() {
      this.$message({
        message: '正为你播放音乐 ...',
        // grouping: true,
        showClose: true,
        type: 'success'
      })
      this.isplay = true
    },
    pause() {
      this.isplay = false
    },
    playMv(mvid) {
      this.$axios.get('https://autumnfish.cn/mv/url?id=' + mvid).then(
        res => {
          this.ishow = true
          this.mvUrl = res.data.data.url
          this.musicUrl = ''
          this.isplay = false
          console.log(this.mvUrl)
        },
        err => {
          console.log(err)
        }
      )
    },
    hide() {
      this.ishow = false
      this.mvUrl = ''
    }
  }
}
</script>

<style lang="less" scoped>
#music,
.el-container {
  // color: #fc1ea4;
  height: 100%;
}

.el-header {
  // background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
  display: flex;
  justify-content: space-around;
  align-items: center;

  .btn {
    display: flex;
    // background-color: #c08f8f;
    // color: #fc1ea4;

    align-items: center;
    .el-button {
      margin-right: 30px;
    }
  }

  .el-input {
    width: 400px;
  }
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  // line-height: 200px;
  position: relative;
  h1 {
    // width: 99%;
    position: sticky;
    top: 0;
    text-align: center;
    border-bottom: 1px solid #c4c4c4;
    height: 40px;
    line-height: 40px;
    background-color: #ec4141;
    color: #fff;
    z-index: 99;
  }
  .scrollbar-demo-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 50px;
    margin: 10px;
    text-align: center;
    border-radius: 4px;
    background: var(--el-color-primary-light-9);
    color: var(--el-color-primary);
    padding: 0 10px;
    .listitem {
      width: 100px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    @keyframes wordsLoop {
      0% {
        transform: translateX(100%);
        -webkit-transform: translateX(100%);
      }
      100% {
        transform: translateX(-100%);
        -webkit-transform: translateX(-100%);
      }
    }
  }
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  // line-height: 160px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .uishow {
    margin: 20px auto 0;
    width: 80%;
    height: 360px;
    border-radius: 20px;
    background: #e0e0e0;
    box-shadow: 13px 13px 20px #a8a8a8, -13px -13px 20px #ffffff;
    position: relative;
    .small-rou {
      position: absolute;
      left: 10px;
      top: 15px;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: #919090;
      box-shadow: 13px 13px 20px #a8a8a8, -13px -13px 20px #ffffff;
    }
    .move {
      // transform-origin: 20px 10px;
      transform-origin: left bottom;
      transform: rotate(25deg);
      transition: 2s;
    }

    @keyframes rotate {
      from {
        transform: rotate(0deg);
      }

      to {
        transform: rotate(359deg);
      }
    }
    .rotate {
      animation: rotate 4s linear infinite;
    }

    .rac-div {
      position: absolute;
      left: 30px;
      top: 35px;
      width: 200px;
      height: 10px;
      background-color: #ec4141;
      border-radius: 5px;
      box-shadow: 3px 3px 10px #ec4141;
      z-index: 10;
      border-left: #000 3px solid;
      border-bottom: #000 1px solid;
      transition: 2s;
    }
    .rou-div {
      box-sizing: border-box;
      position: absolute;
      left: 110px;
      top: 90px;
      width: 240px;
      height: 240px;
      background-color: #5e5d5d;
      border-radius: 50%;
      border: 50px solid #000;
      box-shadow: 13px 13px 20px #a8a8a8, -13px -13px 20px #ffffff;
      overflow: hidden;
      img {
        width: 120%;
      }
    }
  }
  .text {
    margin-top: 40px;
    .scrollbar-demo-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      // height: 50px;
      margin: 30px 10px;
      text-align: center;
      border-radius: 4px;
      background: var(--el-color-primary-light-9);
      color: var(--el-color-primary);
      padding: 0 10px;
      overflow: auto;
    }
  }
}
.mask {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background-color: #000;
  opacity: 0.8;
  z-index: 998;
  overflow: hidden;
}
video {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 600px;
  height: 400px;
  z-index: 999;
  transform: translate(-50%, -50%);
}
.el-footer {
  background-color: #ec4141;
  display: flex;
  align-items: center;
  justify-content: space-around;
  color: #fff;
  audio {
    width: 80%;
    height: 60px;
  }
}
</style>