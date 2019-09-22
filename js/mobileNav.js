const mobileNav = (
  $toggle = document.getElementById('nav-toggle'),
  $header = document.getElementById('site-header')
) => {
  const $items = $header.querySelectorAll('li')
  if (!$toggle || !$header) return

  let open = false
  const toggleOpen = force => {
    open = force !== undefined ? force : !open
    $header.classList.toggle('open', open)

    if (!!window.bodyScrollLock) {
      if (open)
        bodyScrollLock.disableBodyScroll('#site-header')
      else
        bodyScrollLock.clearAllBodyScrollLocks()
    }
  }

  $toggle.addEventListener('click', () => {
    toggleOpen()
  })

  $items.forEach($item => {
    $item.querySelectorAll('a').forEach($a => {
      $a.addEventListener('click', () => {
        if (!$a.getAttribute('href')) return
        toggleOpen(false)
      })
    })
  })
}