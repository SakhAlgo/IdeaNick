import { Link } from 'react-router-dom'
import { Segment } from '../../components/Segment'
import { getViewIdeaRoute } from '../../lib/routes'
import { trpc } from '../../lib/trpc'
import css from './index.module.scss'

export const AllIdeasPage = () => {
  // const result = trpc.getIdeas.useQuery()
  const { data, isLoading, isError, isFetched } = trpc.getIdeas.useQuery()
  if (isLoading) {
    return <div>Loading...</div>
  }
  if (isError) {
    return <div>Error: {isError}</div>
  }
  if (!isFetched) {
    return <div>Not fetched</div>
  }

  return (
    <Segment title="All Ideas">
      <div className={css.ideas}>
        {data?.ideas.map((idea) => (
          <div className={css.idea} key={idea.nick}>
            <Segment
              size={2}
              title={
                <Link className={css.ideaLink} to={getViewIdeaRoute({ ideaNick: idea.nick })}>
                  {idea.name}
                </Link>
              }
              description={idea.description}
            />
          </div>
        ))}
      </div>
    </Segment>
  )
}
