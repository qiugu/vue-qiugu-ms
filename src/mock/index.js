import Mock from 'mockjs'

if (process.env.NODE_ENV !== 'production') {
  require('./services/user')
  require('./services/home')
  require('./services/table')
}

Mock.setup({
  timeout: 400
})
