const mixins = {
    data () {
        return {
            menu: [
                {
                  name: '项目管理',
                  name_en: 'Projects',
                  router: '1',
                  icon: 'el-icon-time',
                  children: [
                    {
                      name: '首页',
                      name_en: 'home',
                      router: '/layout/home-page',
                      icon: 'el-icon-star-off'
                    },
                    {
                      name: '开发备忘',
                      name_en: 'Notes',
                      router: '/layout/about',
                      icon: 'el-icon-date'
                    },
                    {
                      name: '关于作者',
                      name_en: 'About',
                      router: '/layout/about-author',
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
                      router: '/layout/dynamic-table',
                      icon: 'el-icon-edit-outline'
                    },
                    {
                      name: '可编辑表格',
                      name_en: 'EditTable',
                      router: '/layout/editable',
                      icon: 'el-icon-edit-outline'
                    }
                  ]
                },
                {
                  name: '天气预报',
                  name_en: 'Weather',
                  router: '/layout/weather-fore',
                  icon: 'el-icon-picture-outline',
                  children: []
                },
                {
                  name: '魔幻立方',
                  name_en: 'Cube',
                  router: '/layout/cube',
                  icon: 'el-icon-menu',
                  children: []
                },
                {
                  name: '权限测试',
                  name_en: 'Authority',
                  router: '/layout/authority-test',
                  icon: 'el-icon-setting',
                  children: []
                }
            ]
        }
    }
}

export default mixins
