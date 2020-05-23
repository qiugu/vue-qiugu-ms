<template>
  <div class="video">
    <video-player
      ref="video"
      :playsinline="true"
      :options="options"
      @waiting="onPlayWaiting"
      @resize="onPlayResize"
    />
  </div>
</template>

<script>
import { videoPlayer } from 'vue-video-player'
import 'video.js/dist/video-js.css'
export default {
  components: {
    videoPlayer
  },
  data () {
    return {
      options: {
        language: 'zh-CN',
        muted: false,
        playbackRates: [0.5, 1.0, 1.5, 2.0],
        sources: [
          {
            type: 'video/mp4',
            src:
              'https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm'
          }
        ],
        poster: require('@/assets/images/sky.jpg')
      }
    }
  },
  computed: {
    player () {
      return this.$refs.video.player
    }
  },
  mounted () {
    console.log(this.player)
  },
  methods: {
    // 监听视频加载中事件
    onPlayWaiting (player) {
      console.log(player)
      player.log()
    },
    onPlayResize (player) {
      console.log(this.player)
    }
  }
}
</script>

<style lang="scss" scoped>
.video {
  background: #fff;
}
</style>
