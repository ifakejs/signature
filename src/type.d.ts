export interface Options {
  target: string
  className?: string
  styles?: {
    width: number
    height: number
  }
}

export type GetOption = Partial<Options>
