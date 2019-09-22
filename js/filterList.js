const filterList = (
  {
    containerIdentifier = 'data-filter-container',
    inputIdentifier = 'data-filter-input',
    listIdentifier = 'data-filter-list',
    valueIdentifier = 'data-filter-value',
    activeClass = 'active'
  } = {},
) => {
  $$(`[${containerIdentifier}]`).forEach($container => {
    const $input = $container.querySelector(`[${inputIdentifier}]`)
    const $list = $container.querySelector(`[${listIdentifier}]`)
    const $items = $container.querySelectorAll(`[${valueIdentifier}]`)

    if (!$input || !$list) return

    let setState = () => {
      const inputValue = $input.value
      $items.forEach($item => {
        const itemValue = $item.getAttribute(valueIdentifier)
        $item.classList.toggle(activeClass, inputValue === itemValue)
      })
    }

    setState()
    $input.addEventListener('input', setState)
  })
}