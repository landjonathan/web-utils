const whichTransitionEvent = () => {
  let t,
    el = document.createElement("fakeelement")

  let transitions = {
    "transition": "transitionend",
    "OTransition": "oTransitionEnd",
    "MozTransition": "transitionend",
    "WebkitTransition": "webkitTransitionEnd",
  }

  for (t in transitions)
    if (el.style[t] !== undefined)
      return transitions[t]
}

const whichAnimationEvent = () => {
  let t,
    el = document.createElement("fakeelement");

  let animations = {
    "animation": "animationend",
    "OAnimation": "oAnimationEnd",
    "MozAnimation": "animationend",
    "WebkitAnimation": "webkitAnimationEnd",
  }

  for (t in animations)
    if (el.style[t] !== undefined)
      return animations[t]
}

const animationEndEvents = () => {
  window.transitionEndEvent = whichTransitionEvent()
  window.animationEndEvent = whichAnimationEvent()
}
