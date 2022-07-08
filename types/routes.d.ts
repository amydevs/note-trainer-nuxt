interface Route {
  path: string;
  title: string;
  icon?: string;
  show_in_nav?: boolean;
  logged_in_only?: boolean;
  unlogged_in_only?: boolean;
}
