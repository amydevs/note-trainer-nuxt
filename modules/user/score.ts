import Vue from "vue";

export interface Score {
  id: string;
  user_id: string;
  score: number;
  created_at: string;
}

export async function insert_score(vm: Vue, score: Partial<Score>) {
  try {
    vm.$accessor.SET_LOADING(true);
    let { data, error } = await vm.$supabase.from("scores").insert(score);
    if (error) throw error;
    return data;
  } catch (error: any) {
    alert(error.message)
  }
}

export async function get_scores_from_user_id(vm: Vue, id: string) {
  try {
    let { data, error } = await vm.$supabase.from("scores").select(`*`).eq("user_id", id);
    if (error) throw error;
    return data as Score[];
  } catch (error: any) {
    alert(error.message)
  }
}
