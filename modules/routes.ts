export const routes = [
  {
    title: 'Home',
    path: '/',
    icon: 'mdi-home',
    show_in_nav: true
  },
  {
    title: 'Play',
    path: '/play',
    icon: 'mdi-play',
    show_in_nav: true
  },
  {
    title: 'Profile',
    path: '/profile',
    icon: 'mdi-account',
    show_in_nav: true,
    logged_in_only: true
  },
  {
    title: 'Login',
    path: '/login',
    unlogged_in_only: true
  }
] as Route[]

export interface Route {
  path: string;
  title: string;
  icon?: string;
  show_in_nav?: boolean;
  logged_in_only?: boolean;
  unlogged_in_only?: boolean;
}
