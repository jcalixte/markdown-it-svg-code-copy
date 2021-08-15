import Clipboard from 'clipboard'

const PLUGIN_CLASS = 'markdown-it-svg-code-copy'

new Clipboard(PLUGIN_CLASS)

interface Options {
  svg: string
  buttonClass?: string
  buttonStyle?: string
}

type RulesArgs = [Array<{ content: string }>, number]

const defaultOptions: Options = {
  svg: '',
  buttonStyle:
    'position: absolute; top: 7.5px; right: 6px; cursor: pointer; outline: none;'
}

const renderCode = (
  origRule: (...args: RulesArgs) => string,
  options: Options
) => {
  options = { ...defaultOptions, ...options }
  return (...args: RulesArgs) => {
    const [tokens, idx] = args
    const content = tokens[idx].content
    const origRendered = origRule(...args)

    if (content.length === 0) {
      return origRendered
    }

    return `
<div style="position: relative">
	${origRendered}
	<button class="${PLUGIN_CLASS} ${
      options.buttonClass ?? ''
    }" data-clipboard-text="${content}" style="${
      options.buttonStyle
    }" title="Copy code">
		${options.svg}
	</button>
</div>
`
  }
}

export default (md: any, options: Options) => {
  md.renderer.rules.code_block = renderCode(
    md.renderer.rules.code_block,
    options
  )
  md.renderer.rules.fence = renderCode(md.renderer.rules.fence, options)
}
