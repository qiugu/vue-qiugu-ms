const mixins = {
  data () {
    return {
      menu: [
        {
          name: '控制台',
          name_en: 'Dashboard',
          router: '/index',
          icon: 'el-icon-s-home',
          children: [
            {
              name: '预览',
              name_en: 'Overview',
              router: '/index'
            }
          ]
        },
        {
          name: '项目模块',
          name_en: 'Modules',
          router: '1',
          icon: 'el-icon-s-grid',
          children: [
            {
              name: '可编辑表格',
              name_en: 'EditTable',
              router: '/editable'
            }
          ]
        },
        {
          name: '视频播放',
          name_en: 'Video',
          router: '2',
          icon: 'el-icon-video-camera-solid',
          children: [
            {
              name: '视频播放',
              name_en: 'video',
              router: '/video'
            }
          ]
        },
        {
          name: '文本编辑',
          name_en: 'rich_text',
          router: '3',
          icon: 'el-icon-s-order',
          children: []
        },
        {
          name: '图表展示',
          name_en: 'Charts',
          router: '/charts',
          icon: 'el-icon-picture',
          children: []
        },
        {
          name: '权限测试',
          name_en: 'access',
          router: '/access',
          icon: 'el-icon-warning',
          children: []
        }
      ]
    }
  }
}

export default mixins
