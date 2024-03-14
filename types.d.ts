type ItemData = {
  type: number,
  created_at?: string,
  created_by?: string,
  difficulty: number,
  id: string,
  tags?: string[],
  note: string,
  title: string
  negative: number,
  positive: number,
  completed?: boolean,
  repeats?: number
}

type Note = {
  id: string,
  created_at: string,
  created_by?: string,
  title?: string,
  note: string,
  archived?: boolean,
  pinned?: boolean,
  reminder?: string
  background: number
}