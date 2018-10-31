import store from '@/store/index'

const permission = {
  inserted (el, binding, vnode) {
    const { value } = binding
    const roles = store.getters && store.getters.roles
    if (value && value instanceof Array && value.length > 0) {
      const permissionRoles = value
      const hasPermission = roles.some(role => {
        return permissionRoles.includes(role)
      })
      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    } else {
      throw new Error('roles is must be Array!')
    }
  }
}
export default permission
