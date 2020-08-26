import Vue from 'vue'

let updateScrollWidth = $el => {
  $el.style.setProperty('--scroll-width', $el.scrollWidth + 'px')
}
Vue.directive('scrollWidth', {
  bind: updateScrollWidth,
  componentUpdated: updateScrollWidth
})
