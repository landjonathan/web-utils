const hashScroll = () => {
  const scrollToTarget = (targetElement, directions = { top: true, bottom: true }) => {
    const headerOffset = document.querySelector('#site-header').clientHeight
    const currentPosition = window.scrollY || window.pageYOffset
    const targetHeight = targetElement.getBoundingClientRect().top + currentPosition - headerOffset
    if (
      (directions.top && targetHeight < currentPosition) ||
      (directions.bottom && targetHeight > currentPosition)) {
      window.scrollTo({ behavior: 'smooth', top: targetHeight })

      // set hash
      // after target is checked for effects, remove the id ...
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

  const handeAnchorToggle = $target => {
    if ($target.hasAttribute('data-anchor-toggle')) {
      const $toggle = $target.querySelector('[type=checkbox]') || $target.parentElement.querySelector('[checkbox]')
      if ($toggle) {
        $toggle.checked = true
      }
    }
  }

  const handleHashLink = hash => {
    if (hash === '#') {
      window.scrollTo({ behavior: "smooth", top: 0 })
    } else {
      const targetElement = document.querySelector(hash)
      if (targetElement)
        scrollToTarget(targetElement)
      else
        location.assign(`${location.protocol}//${location.hostname}/${hash}`) // go to hash on homepage

      const hashValue = hash.replace('#', '')
      const $target = document.getElementById(hashValue);
      handeAnchorToggle($target)
    }
  }

  const anchorLink = event => {
    const el = event.target;
    const linkEl = el.matches('a') ? el : el.closest('a')
    if (linkEl) {
      let href = linkEl.getAttribute('href')

      // if absolute link to hash on page, set hash only
      if (href.indexOf('#') !== -1 && window.location.href.split('#')[0] === href.split('#')[0])
        href = '#' + href.split('#')[1]

      if (href.indexOf('#') === 0) {
        event.preventDefault()
        window.dispatchEvent(new Event('hashClicked'))
        handleHashLink(href)
      }
    }
  }
  window.windowListeners.click.push(anchorLink)

  // handle hash  URL on page load
  if (location.hash) {
    const $target = document.getElementById(location.hash.replace('#', ''));
    scrollToTarget($target)
    handeAnchorToggle($target)
  }
}