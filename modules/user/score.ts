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
