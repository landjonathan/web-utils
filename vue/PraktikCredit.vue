<template>
  <p class="praktik-credit"><slot>Designed and built by</slot><a href="https://praktik.design" target="_blank" rel="noopener">
    <svg
      version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 457 457">
      <path d="M0,0v457h457V0H0z M427,427H30V30h397V427z"></path>
      <path
        d="M116,287H98v26h68v-26h-20v-30h33.5c13.4,0,24.6-2.7,33.6-8.3c9-5.6,15.8-12.5,20.4-20.9 c4.6-8.4,6.9-17.5,7-27.4c0.1-9.9-2.1-18.9-6.6-27.3c-4.4-8.4-11.2-15.3-20.2-20.9c-9.1-5.6-20.5-8.2-34.2-8.2H97v27h19V287z M146,171h33.5c7.1,0,13.1,1.5,17.8,4.4c4.8,2.9,8.3,6.6,10.7,11.1c2.3,4.4,3.5,9.3,3.5,14.4c0,5.2-1.2,10-3.5,14.4 c-2.4,4.4-5.9,8.2-10.7,11.1c-4.8,2.9-10.7,4.5-17.8,4.5H146V171z"></path>
      <polygon
        points="303,275 329,275 329,243 360,243 360,218 329,218 329,186 303,186 303,218 271,218 271,243 303,243"></polygon>
    </svg>
    Studio Praktik</a></p>
</template>

<script>
  export default {
    name: "PraktikCredit"
  }
</script>

<style scoped lang="sass">
  .praktik-credit
    display: block

  a
    text-decoration: none
    display: inline

  svg
    width: 1.5em
    display: inline-block
    margin: 0 .25em -.33em .5em

  path, polygon
    fill: currentColor
</style>
