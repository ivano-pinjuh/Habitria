"use server"

import { revalidatePath } from "next/cache"
import { createServClient } from "./server"

export async function createItem(type: number, title: string){
  const supabase = createServClient()

  const result = await supabase
        .from("habits")
        .insert({ title, type }).single()

  //return JSON.stringify(result)
}

export async function getItems(type: number){
  const supabase = createServClient()

  return await supabase.from("habits").select("*").eq("type", type)
}

export async function deleteItem(id: string){
  const supabase = createServClient()

  await supabase.from("habits").delete().eq("id", id)
  //revalidatePath("/tasks")
}

export async function updateItem(id: string, title: string, note: string, difficulty: number, options? : {completed?: boolean, positive?: number, negative?: number}){
  const supabase = createServClient()

  try {
    if (options?.completed === true && options?.positive !== undefined ) {
      await supabase.from("habits").update({ title, note, difficulty, completed: options.completed, positive: options.positive }).eq("id", id)
    } 
    else if (options?.completed !== undefined) {
      await supabase.from("habits").update({ title, note, difficulty, completed: options.completed }).eq("id", id)
    } 
    else if (options?.positive !== undefined || options?.negative !== undefined) {
      await supabase.from("habits").update({ title, note, difficulty, positive: options.positive, negative: options.negative }).eq("id", id)
    } 
    else {
      await supabase.from("habits").update({ title, note, difficulty }).eq("id", id)
    }
  } 
  catch (error) {
    console.error('Error updating item:', error)
  }

  //revalidatePath("/tasks")
}