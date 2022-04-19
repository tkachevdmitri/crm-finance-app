export default {
  bind (el, { value, arg = 'bottom' }) {
    window.M.Tooltip.init(el, {
      html: value,
      position: arg
    })
  },
  unbind (el) {
    const tooltip = window.M.Tooltip.getInstance(el)
    if (tooltip && tooltip.destroy) {
      tooltip.destroy()
    }
  }
}
