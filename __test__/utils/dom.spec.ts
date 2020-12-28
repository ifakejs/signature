import { $, addEvent, addClass, appendChild, createElem } from '../../src/utils/dom'

describe('Dom Utils', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="editor-wrapper">
        <div id="editor-title">test</div>
        <ul>
            <li>1</li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
        </ul>
      </div>
    `
  })

  afterEach(() => {
    document.body.innerHTML = ''
  })

  it('$', () => {
    expect(($('#editor-title') as HTMLElement).innerHTML).toBe('test')
  })

  it('addEvent', () => {
    const edTitle = $('#editor-title') as HTMLElement
    addEvent(edTitle, 'click', (e: Event) => {
      expect((e.target as HTMLElement).innerHTML).toBe('test')
    })
    const e = new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true
    })
    edTitle.dispatchEvent(e)
  })

  it('addClass', () => {
    const edTitle = $('#editor-title') as HTMLElement
    expect(edTitle.className).toBe('')
    addClass(edTitle, 'hahaha')
    addClass(edTitle, 'heihei')
    expect(edTitle.className).toBe('hahaha heihei')
  })
  it('appendChild', () => {
    const wrapper = $('#editor-wrapper') as HTMLElement
    expect(wrapper.children.length).toBe(2)
    appendChild(wrapper, document.createElement('p'))
    expect(wrapper.children.length).toBe(3)
  })
  it('createElem', () => {
    expect(createElem('p').tagName.toLowerCase()).toBe('p')
  })
})
