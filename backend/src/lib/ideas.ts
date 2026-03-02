import _ from 'lodash'

export const ideas = _.times(100, (i) => ({
  nick: `nick ${i}`,
  name: `Idea ${i}`,
  description: `Description ${i}`,
  text: _.times(10, (j) => `<p>Text paragraf ${j}</p>`).join(' '),
}))
