import R from 'ramda'
import SimpleMarkdown from 'simple-markdown'

export const parseMd = R.compose(
  SimpleMarkdown.defaultOutput,
  SimpleMarkdown.defaultBlockParse
)
