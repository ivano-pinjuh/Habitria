"use server"

import { revalidatePath } from "next/cache"
import { createServClient } from "./server"


export async function getAllTasks(){
  const supabase = createServClient()

  return await supabase.from("habits").select("*")
}



// These are for /tasks page

export async function createItem(type: number, title: string, list_order?: number){
  const supabase = createServClient()

  if (!list_order) {
    const result = await supabase
        .from("habits")
        .insert({ title, type }).single()
  }
  else {
    const result = await supabase
        .from("habits")
        .insert({ title, type, list_order }).single()
  }
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

export async function updateItem(id: string, title: string, note: string, difficulty: number, options? : {completed?: boolean, positive?: number, target?: number}){
  const supabase = createServClient()

  try {
    if (options?.completed === true && options?.positive !== undefined ) {
      await supabase.from("habits").update({ title, note, difficulty, completed: options.completed, positive: options.positive }).eq("id", id)
    } 
    else if (options?.completed !== undefined) {
      await supabase.from("habits").update({ title, note, difficulty, completed: options.completed }).eq("id", id)
    } 
    else if (options?.positive !== undefined || options?.target !== undefined) {
      await supabase.from("habits").update({ title, note, difficulty, positive: options.positive, target: options.target }).eq("id", id)
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

export async function updateItems(data: ItemData[]){
  const supabase = createServClient()

  try {
    await supabase.from("habits").upsert(data, { onConflict: "id" })
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




// General functions, like daily reset..

export async function fetchOneItem(){
  const supabase = createServClient()

  return await supabase.from("habits").select("*").in('type', [0, 1]).order('created_at', { ascending: true }).limit(1)
}

export async function dailyReset(){
  const supabase = createServClient()

  const data = await supabase.from("habits").select("*")

  const currentDate = new Date().toISOString().split('T')[0]

  const habits = data.data?.filter((item: ItemData) => item.type === 0).map(habit => {
    if(habit.positive === habit.target){
      const [x, y] = habit.completion_rate.split('/').map(Number)
      habit.completion_rate = `${Number(x) + 1}/${Number(y) + 1}`
    }
    else {
      const addedValue = +(habit.positive / habit.target).toFixed(2)
      // + ensures that the value is parsed as a number, and not a string

      const [x, y] = habit.completion_rate.split('/').map(Number)
      habit.completion_rate = `${Number(x) + addedValue}/${Number(y) + 1}`
    }
    habit.positive = 0
    habit.last_reset = currentDate
    return habit
  })
  
  const dailies = data.data?.filter((item: ItemData) => item.type === 1).map(daily => {
    if(daily.completed){
      const [x, y] = daily.completion_rate.split('/').map(Number)
      daily.completion_rate = `${Number(x) + 1}/${Number(y) + 1}`
    }
    else {
      const [x, y] = daily.completion_rate.split('/').map(Number)
      daily.completion_rate = `${x}/${Number(y) + 1}`
    }
    daily.completed = false
    daily.last_reset = currentDate
    return daily
  })

  //console.log(habits?.concat(dailies))

  await supabase.from("habits").upsert(habits?.concat(dailies)).select()
}