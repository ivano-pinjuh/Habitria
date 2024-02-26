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

export async function updateItem(id: string, title: string, note: string, completed?: boolean){
  const supabase = createServClient()

  try {
    if (completed !== undefined) {
      const res = await supabase.from("habits").update({ title, note, completed }).eq("id", id)
    } 
    else {
      const res = await supabase.from("habits").update({ title, note }).eq("id", id)
      return res.data
    }
  } 
  catch (error) {
    console.error('Error updating item:', error)
  }

  //revalidatePath("/tasks")
}