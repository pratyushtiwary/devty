export interface RefWrapper {
  [field: string]: HTMLElement
}

export interface ComponentRef {
  wrapper: RefWrapper
}

export interface NestedComponentRef {
  wrapper: ComponentRef
}
