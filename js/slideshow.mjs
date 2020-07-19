const slideshow = ({
                     containerIdentifier = 'data-slideshow',
                     slideIdentifier = 'data-slide',
                     controlIdentifier = 'data-control',
                     activeClass = 'active',
                     nextClass = 'next',
                     prevClass = 'prev',
                     interval = null,
                     removePrevAndNextClassesOnStop = false,
                     onChange = (index, $slide, $control, $container) => {}
                   } = {}) => {
  const $containers = document.querySelectorAll(`[${containerIdentifier}]`)
  if (!$containers) return

  $containers.forEach($container => {
    const $slides = $container.querySelectorAll(`[${slideIdentifier}]`)
    const $controls = $container.querySelectorAll(`[${controlIdentifier}]`)
    const max = $slides.length
    let timer

    interval = interval
      || parseInt($container.getAttribute('data-slideshow-timer'))
      || null

    let index = [...$slides].findIndex($slide => $slide.classList.contains(activeClass))

    const next = () => index === max ? 1 : index + 1
    const prev = () => index === 1 ? max : index - 1

    const setState = newIndex => {
      index = newIndex || next()

      $slides.forEach($slide => {
        $slide.classList.toggle(activeClass, parseInt($slide.getAttribute(slideIdentifier)) === index)
        nextClass && $slide.classList.toggle(nextClass, parseInt($slide.getAttribute(slideIdentifier)) === next())
        prevClass && $slide.classList.toggle(prevClass, parseInt($slide.getAttribute(slideIdentifier)) === prev())
      })

      $controls.forEach($control => {
        $control.classList.toggle(activeClass, parseInt($control.getAttribute(controlIdentifier)) === index)
        nextClass && $control.classList.toggle(nextClass, parseInt($control.getAttribute(controlIdentifier)) === next())
        prevClass && $control.classList.toggle(prevClass, parseInt($control.getAttribute(controlIdentifier)) === prev())
      })

      // console.log(timer)
      if (removePrevAndNextClassesOnStop && !timer) {
        [...$controls, ...$slides].forEach($el => {
          $el.classList.remove('prev')
          $el.classList.remove('next')
        })
      }

      typeof onChange === 'function' && onChange(index, $slides[index - 1], $controls[index - 1], $container)
    }

    if (typeof interval === 'number') {
      timer = setInterval(setState, interval)
      $container.classList.add('with-timer')
    }

    $controls.forEach($control => {
      $control.addEventListener('click', () => {
        if (timer) {
          clearInterval(timer)
          timer = null
          $container.classList.remove('with-timer')
        }
        setState(parseInt($control.getAttribute(controlIdentifier)))
      })
    })

    setState()
  })
}

export default slideshow