"use server"

import { revalidatePath } from "next/cache"
import { createServClient } from "./server"



// These are for /tasks page

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



// These are for /notes page

export async function createNote(title: undefined | string, note: undefined | string){
  const supabase = createServClient()

  const result = await supabase
        .from("notes")
        .insert({ title, note }).single()

  //return JSON.stringify(result)
}

export async function getNotes(){
  const supabase = createServClient()

  return await supabase.from("notes").select("*")
}

export async function deleteNote(id: string){
  const supabase = createServClient()

  await supabase.from("notes").delete().eq("id", id)
  //revalidatePath("/tasks")
}

export async function updateNote(id: string, options? : {title?: string, note?: string, pinned?: boolean, archived?: boolean, background?: number}){
  const supabase = createServClient()

  try {
    if (options?.title !== undefined || options?.note !== undefined ) {
      await supabase.from("notes").update({ title: options.title, note: options.note }).eq("id", id)
    } 
    else if (options?.pinned !== undefined) {
      await supabase.from("notes").update({ pinned: options.pinned }).eq("id", id)
    } 
    else if (options?.archived !== undefined) {
      await supabase.from("notes").update({ archived: options.archived }).eq("id", id)
    }
    else if (options?.background !== undefined) {
      await supabase.from("notes").update({ background: options.background }).eq("id", id)
    }
  } 
  catch (error) {
    console.error('Error updating item:', error)
  }

  //revalidatePath("/tasks")
}