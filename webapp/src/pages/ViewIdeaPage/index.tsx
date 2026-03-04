import { useParams } from 'react-router-dom'
import { Segment } from '../../components/Segment'
import { type ViewIdeaRouteParams } from '../../lib/routes'
import { trpc } from '../../lib/trpc'
import css from './index.module.scss'

export const ViewIdeaPage = () => {
  const { ideaNick } = useParams() as ViewIdeaRouteParams

  const { data, isLoading, isError, isFetched } = trpc.getIdea.useQuery({
    ideaNick,
  })
  if (isLoading) {
    return <div>Loading...</div>
  }
  if (isError) {
    return <div>Error: {isError}</div>
  }
  if (!isFetched) {
    return <div>Not fetched</div>
  }
  if (!data?.idea) {
    return <div>Idea not found</div>
  }
  return (
    <Segment title={data.idea.name}>
      <p className={css.nick}>{data.idea.nick}</p>
      <p className={css.description}>{data.idea.description}</p>
      <div className={css.text} dangerouslySetInnerHTML={{ __html: data.idea.text }} />
    </Segment>
  )
}
