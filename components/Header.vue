<template>
  <header>
    <nav class="navbar navbar-dark bg-dark">
      <ul
        class="navbar-nav d-flex justify-content-center flex-row text-center mb-2 mb-lg-0 w-100"
      >
        <li class="nav-item me-4">
          <nuxt-link to="/stocks" class="link-light">Stocks</nuxt-link>
        </li>
        <li class="nav-item ms-4">
          <nuxt-link to="/crypto" class="link-light">Crypto</nuxt-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
@media (max-width: 1024px) {
  a {
    font-size: 2.5rem;
  }
}

a:link {
  text-decoration: none;
}
a:visited {
  text-decoration: none;
}
a:active {
  text-decoration: none;
}
</style>
