import MarkdownIt from 'markdown-it'
import svgCodeCopy from './index'

describe('markdown-it-svg-code-copy', () => {
  test('adds svg icon', () => {
    const svg = '<svg>Je suis SVG</svg>'
    const renderer = new MarkdownIt().use(svgCodeCopy, {
      svg
    })

    expect(
      renderer
        .render(
          `\`\`\`
test
\`\`\``
        )
        .replace(/\t/g, '')
        .replace(/\n/g, '')
    ).toEqual(
      `<div style="position: relative"><pre><code>test</code></pre><button class="markdown-it-svg-code-copy " data-clipboard-text="test" style="position: absolute; top: 7.5px; right: 6px; cursor: pointer; outline: none;" title="Copy code">${svg}</button></div>`
    )
  })

  test('adds svg icon with button class', () => {
    const buttonClass = 'button-class'
    const renderer = new MarkdownIt().use(svgCodeCopy, {
      buttonClass
    })

    expect(
      renderer
        .render(
          `\`\`\`
test
\`\`\``
        )
        .replace(/\t/g, '')
        .replace(/\n/g, '')
    ).toEqual(
      `<div style="position: relative"><pre><code>test</code></pre><button class="markdown-it-svg-code-copy ${buttonClass}" data-clipboard-text="test" style="position: absolute; top: 7.5px; right: 6px; cursor: pointer; outline: none;" title="Copy code"></button></div>`
    )
  })

  test('adds svg icon with button style', () => {
    const buttonStyle = 'position: "absolute"; top: 0;'
    const renderer = new MarkdownIt().use(svgCodeCopy, {
      buttonStyle
    })

    expect(
      renderer
        .render(
          `\`\`\`
test
\`\`\``
        )
        .replace(/\t/g, '')
        .replace(/\n/g, '')
    ).toEqual(
      `<div style="position: relative"><pre><code>test</code></pre><button class="markdown-it-svg-code-copy " data-clipboard-text="test" style="${buttonStyle}" title="Copy code"></button></div>`
    )
  })
})
