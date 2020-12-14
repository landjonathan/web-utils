const hashScroll = ({
                      beforeScrollCallback = null,
                      headerMarker = 'data-site-header',
                      alwaysUnsetHash = false,
                      useHeaderMarginBottom = false
                    } = {}) => {
  const $header = document.querySelector(`[${headerMarker}]`)

  const scrollToTarget = (targetElement, setHash = true, ignoreHeader = false, directions = {
    top: true,
    bottom: true
  }) => {
    const headerOffset = ignoreHeader ? 0 : $header.clientHeight + (useHeaderMarginBottom ? parseFloat(getComputedStyle($header).marginBottom) : 0)
    const currentPosition = window.scrollY || window.pageYOffset
    const targetHeight = targetElement.getBoundingClientRect().top + currentPosition - headerOffset
    // console.log(targetHeight, '=', targetElement.getBoundingClientRect().top, currentPosition, headerOffset)
    if (
      (directions.top && targetHeight < currentPosition) ||
      (directions.bottom && targetHeight > currentPosition)) {
      if (typeof beforeScrollCallback === 'function') beforeScrollCallback()
      window.scrollTo({ behavior: 'smooth', top: targetHeight })

      // set hash
      // after target is checked for effects, remove the id ...
      if (setHash) {
        setTimeout(() => {
          const hash = targetElement.id
          const el = document.getElementById(hash)
          el.setAttribute('id', '')
          location.hash = hash
          // ... then wait for animation to finish and restore id
          setTimeout(() => {
            el.setAttribute('id', hash)
          }, 950)
        }, 50)
      }
    }
  }

  const handeAnchorToggle = $target => {
    if ($target.hasAttribute('data-anchor-toggle')) {
      const $toggle = $target.querySelector('[type=checkbox]') || $target.parentElement.querySelector('[checkbox]')
      if ($toggle) {
        $toggle.checked = true
      }
    }
  }

  const handleHashLink = (hash, setHash, ignoreHeader) => {
    if (hash === '#') {
      window.scrollTo({ behavior: 'smooth', top: 0 })
    } else {
      const targetElement = document.querySelector(hash)
      if (targetElement)
        scrollToTarget(targetElement, setHash, ignoreHeader)
      else
        location.assign(`${location.protocol}//${location.hostname}/${hash}`) // go to hash on homepage

      const hashValue = hash.replace('#', '')
      const $target = document.getElementById(hashValue)
      handeAnchorToggle($target)
    }
  }

  const anchorLink = event => {
    const el = event.target
    const linkEl = el.matches('a') ? el : el.closest('a')
    if (linkEl) {
      let href = linkEl.getAttribute('href')
      if (!href) return

      const setHash = !alwaysUnsetHash && !linkEl.hasAttribute('data-unset-hash')
      const ignoreHeader = linkEl.hasAttribute('data-ignore-header') || !document.querySelector(`[${headerMarker}]`)
      // if absolute link to hash on page, set hash only
      if (href.indexOf('#') !== -1 && (
        window.location.href.split('#')[0] === href.split('#')[0]
        || window.location.pathname === href.split('#')[0] // e.g. /#somehash
      ))
        href = '#' + href.split('#')[1]

      if (href.indexOf('#') === 0) {
        event.preventDefault()
        window.dispatchEvent(new Event('hashClicked'))
        handleHashLink(href, setHash, ignoreHeader)
      }
    }
  }
  window.windowListeners.click.push(anchorLink)

  // handle hash  URL on page load
  if (location.hash) {
    const $target = document.getElementById(location.hash.replace('#', ''))
    if (!$target) return false

    setTimeout(() => {
      window.scrollTo(0, 0)
      scrollToTarget($target)
      handeAnchorToggle($target)
    }, 1)
  }
}

export default hashScroll
