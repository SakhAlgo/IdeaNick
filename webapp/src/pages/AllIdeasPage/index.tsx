import { Link } from 'react-router-dom'
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
    <div>
      <h1 className={css.title}>All Ideas</h1>
      <div className={css.ideas}>
        {data?.ideas.map((idea) => (
          <div className={css.idea} key={idea.nick}>
            <h2 className={css.ideaName}>
              <Link className={css.ideaLink} to={getViewIdeaRoute({ ideaNick: idea.nick })}>
                {idea.name}
              </Link>
            </h2>
            <p className={css.ideaDescription}>{idea.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
