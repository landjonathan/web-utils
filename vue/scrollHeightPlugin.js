import Vue from 'vue'

let updateScrollHeight = $el => {
  $el.style.setProperty('--scroll-height', $el.scrollHeight + 'px')
}
Vue.directive('scrollHeight', {
  bind: updateScrollHeight,
  componentUpdated: updateScrollHeight
})
