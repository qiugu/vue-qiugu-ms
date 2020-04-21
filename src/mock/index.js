import Mock from 'mockjs'

if (process.env.NODE_ENV !== 'production') {
  require('./services/user')
}

Mock.setup({
  timeout: 400
})
