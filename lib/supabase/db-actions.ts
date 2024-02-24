"use server"

import { revalidatePath } from "next/cache"
import { createServClient } from "./server"

export async function createHabit(title: string){
  const supabase = createServClient()

  const result = await supabase
        .from("habits")
        .insert({title: title}).single()

  //return JSON.stringify(result)
}

export async function getHabits(){
  const supabase = createServClient()

  return await supabase.from("habits").select("*")
}

export async function deleteHabit(id: string){
  const supabase = createServClient()

  await supabase.from("habits").delete().eq("id", id)
  revalidatePath("/tasks")
}

export async function updateHabit(id: string, title: string){
  const supabase = createServClient()

  await supabase.from("habits").update({ title }).eq("id", id)
  revalidatePath("/tasks")
}