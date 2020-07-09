const ajaxForm = ({
                    formIdentifier = 'data-ajax-form',
                    messageIdentifier = 'data-message',
                    successMessageId = 'success',
                    errorMessageId = 'error'
                  } = {}) => {
  const $forms = document.querySelectorAll(`[${formIdentifier}]`)
  if (!$forms) return

  $forms.forEach($form => {
    const $message = $form.querySelector(`[${messageIdentifier}]`)
    
    let pending = false

    const showMessage = templateId => {
      $message.innerHTML = ''
      const template = document.getElementById(templateId)
      const content = template.content.cloneNode(true)
      $message.appendChild(content)
    }

    $form.onsubmit = function (event) {
      event.preventDefault()
      if (pending) return

      const headers = new Headers()
      headers.set("Content-Type", "application/x-www-form-urlencoded")
      const body = new URLSearchParams([...new FormData(this)]).toString()
      fetch('/', {
        method: 'POST',
        headers,
        body
      })
        .then(res => {
          if (res.ok) {
            showMessage(successMessageId)
            $form.reset()
          } else {
            showMessage(errorMessageId)
          }
        })
        .catch(() => { showMessage(errorMessageId) })
        .finally(() => { pending = false })
    }
  })
}

export default ajaxForm