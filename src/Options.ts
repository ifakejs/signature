export interface DefOptions {
  [key: string]: any
  className?: string
  width: number | string
  height: number | string
  customWidth: boolean
  customHeight: boolean
}

export class CustomOptions {}
export interface Options extends DefOptions, CustomOptions {}

export class OptionsConstructor extends CustomOptions implements DefOptions {
  [key: string]: any
  className?: string
  width: number | string
  height: number | string
  customWidth: boolean
  customHeight: boolean
  constructor() {
    super()
    this.className = 'ifake-signature'
    this.width = 800
    this.height = 400
    this.customWidth = false
    this.customHeight = false
  }

  merge(options?: Options) {
    if (!options) return this
    for (const key in options) {
      this[key] = options[key]
    }
    return this
  }
}
