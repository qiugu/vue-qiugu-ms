const mixins = {
    data () {
        return {
            menu: [
              {
                name: '首页',
                name_en: 'home',
                router: '/index',
                icon: 'el-icon-star-off',
                children: []
              },
              {
                name: '项目管理',
                name_en: 'Projects',
                router: '1',
                icon: 'el-icon-time',
                children: [
                  {
                    name: '开发备忘',
                    name_en: 'Notes',
                    router: '/about',
                    icon: 'el-icon-date'
                  },
                  {
                    name: '关于作者',
                    name_en: 'About',
                    router: '/author',
                    icon: 'el-icon-document'
                  }
                ]
              },
              {
                name: '基础表格',
                name_en: 'BaseTable',
                router: '2',
                icon: 'el-icon-news',
                children: [
                  {
                    name: '动态表格',
                    name_en: 'DynamicTable',
                    router: '/dynamic',
                    icon: 'el-icon-edit-outline'
                  },
                  {
                    name: '可编辑表格',
                    name_en: 'EditTable',
                    router: '/editable',
                    icon: 'el-icon-edit-outline'
                  }
                ]
              },
              {
                name: '天气预报',
                name_en: 'Weather',
                router: '/weather',
                icon: 'el-icon-picture-outline',
                children: []
              },
              {
                name: '魔幻立方',
                name_en: 'Cube',
                router: '/cube',
                icon: 'el-icon-menu',
                children: []
              },
              {
                name: '权限测试',
                name_en: 'access',
                router: '/access',
                icon: 'el-icon-setting',
                children: []
              },
              {
                name: '富文本编辑',
                name_en: 'rich_text',
                router: '3',
                icon: 'el-icon-service',
                children: [
                  {
                    name: 'TinyMCE富文本编辑器',
                    name: 'tinymce',
                    router: '/teditor',
                    icon: 'el-icon-edit-outline'
                  },
                  {
                    name: 'wangEditor富文本编辑器',
                    name: 'wangeditor',
                    router: '/weditor',
                    icon: 'el-icon-edit-outline'
                  }
                ]
              }
            ]
        }
    }
}

export default mixins
