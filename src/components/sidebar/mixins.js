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
              name: '开发备忘',
              name_en: 'Notes',
              router: '/about'
            },
            {
              name: '表单验证',
              name_en: 'Validate',
              router: '/validate'
            },
            {
              name: '动态表格',
              name_en: 'DynamicTable',
              router: '/dynamic'
            },
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
          children: []
        },
        {
          name: '文本编辑',
          name_en: 'rich_text',
          router: '3',
          icon: 'el-icon-s-order',
          children: []
        },
        {
          name: '魔幻立方',
          name_en: 'Cube',
          router: '/cube',
          icon: 'el-icon-star-on',
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
