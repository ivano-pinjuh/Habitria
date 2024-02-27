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