export const routes = [
  {
    title: 'Home',
    path: '/',
    icon: 'mdi-home',
    show_in_nav: true
  },
  {
    title: 'Inspire',
    path: '/inspire',
    icon: 'mdi-chart-bubble',
    show_in_nav: true
  },
  {
    title: 'Profile',
    path: '/profile',
    show_in_nav: true,
    logged_in_only: true
  },
  {
    title: 'Login',
    path: '/login',
    unlogged_in_only: true
  }
] as Route[]
