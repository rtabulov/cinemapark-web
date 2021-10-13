export const ratings = ['G', 'PG', 'PG-13', 'R', 'NC-17'] as const

export type Rating = typeof ratings[number] | null
