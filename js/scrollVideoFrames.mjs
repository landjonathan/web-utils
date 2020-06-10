const scrollVideoFrames = ({
                             canvasIdentifier = 'data-scroll-video-canvas',
                             $container = document.documentElement,
                             frameWidth = window.innerWidth,
                             frameHeight = window.innerHeight,
                             originX = null,
                             originY = null,
                             sizeCover = true
                           } = {}) => {
  document.querySelectorAll(`[${canvasIdentifier}]`).forEach($canvas => {
    if (getComputedStyle($canvas).display === 'none') return

    // setup canvas
    const context = $canvas.getContext('2d')
    $canvas.width = innerWidth
    $canvas.height = innerHeight

    // setup images
    const draw = img => {
      if (!img) return

      let dx = ($canvas.width - frameWidth) / 2
      let dy = ($canvas.height - frameHeight) / 2
      let dw = img.width
      let dh = img.height

      if (sizeCover) {
        // https://riptutorial.com/html5-canvas/example/19169/scaling-image-to-fit-or-fill-
        const scale = Math.max($canvas.width / img.width, $canvas.height / img.height)
        dx = ($canvas.width / 2) - (img.width / 2) * scale
        dy = ($canvas.height / 2) - (img.height / 2) * scale
        dw = img.width * scale
        dh = img.height * scale
      } else {
        if (originX === 'left')
          dx = 0
        else if (originX === 'right')
          dx = $canvas.width - frameWidth
        if (originY === 'top')
          dy = 0
        else if (originY === 'bottom')
          dy = $canvas.height - frameHeight
      }

      context.drawImage(img, dx, dy, dw, dh)
    }

    const urlTemplate = $canvas.getAttribute(canvasIdentifier)
    const urlTemplateLastNumber = urlTemplate.split('.').slice(-2, -1)[0].split('/').slice(-1)[0]
    const urlPadding = urlTemplateLastNumber.length
    const urlAtIndex = index => urlTemplate.replace(urlTemplateLastNumber, index.toString().padStart(urlPadding, '0'))
    const frameCount = parseInt(urlTemplateLastNumber)
    const images = [null]

    images[1] = new Image()
    images[1].src = urlAtIndex(1)
    images[1].onload = () => {
      draw(images[1])
    }

    const preloadImages = () => {
      for (let i = 1; i < frameCount; i++) {
        images[i] = new Image()
        images[i].src = urlAtIndex(i)
      }
    }
    preloadImages()

    const updateImage = i => {
      draw(images[i])
    }

    const setFrame = () => {
      if (getComputedStyle($canvas).display === 'none') return

      const scrollTop = -1 * ($container.getBoundingClientRect().top)
      const maxScrollTop = $container.scrollHeight - window.innerHeight
      const scrollFraction = scrollTop / maxScrollTop
      const frameIndex = Math.max(0,
        Math.min(frameCount - 1,
          Math.floor(scrollFraction * frameCount)
        )
      )
      requestAnimationFrame(() => updateImage(frameIndex + 1))
    }

    // setup listeners
    const onResize = () => {
      if ($canvas.width !== innerWidth || $canvas.height !== innerHeight) {
        $canvas.width = innerWidth
        $canvas.height = innerHeight
        setFrame()
      }
    }

    if (window.windowListeners) {
      windowListeners.scroll.push(setFrame)
      windowListeners.resize.push(onResize)
    } else {
      window.addEventListener('scroll', setFrame)
      window.addEventListener('resize', onResize)
    }

    document.addEventListener('load', setFrame)
  })
}

export default scrollVideoFrames