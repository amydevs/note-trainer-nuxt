export interface UserInfo {
  id: string;
  username: string;
}

export async function get_info(vm: Vue, id: string) {
  try {
    let { data, error, status } = await vm.$supabase
      .from("user_info")
      .select(`*`)
      .eq("id", id)
      .single()

    let ret_data = data as UserInfo | undefined

    if (error && status !== 406) throw error
    else {
      ret_data = await update_info(vm, {id} as UserInfo);
    }

    return ret_data;
  } catch (error: any) {
    alert(error.message)
  }
}

export async function update_info(vm: Vue, user_info: UserInfo) {
  try {
    vm.$accessor.SET_LOADING(true);

    let { data, error } = await vm.$supabase.from("user_info").upsert(user_info);

    if (error) throw error

    let found_data = (data as UserInfo[] | null)?.at(0);
    return found_data;

  } catch (error: any) {
    alert(error.message)
  } finally {
    vm.$accessor.SET_LOADING(false);
  }
}
