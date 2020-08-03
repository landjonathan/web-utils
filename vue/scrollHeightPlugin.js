import Vue from 'vue'

Vue.directive('scrollHeight', {
  bind: $el => {
    $el.style.setProperty('--scroll-height', $el.scrollHeight + 'px')
  }
})
