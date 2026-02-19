import { trpc } from '../../lib/trpc'

export const AllIdeasPage = () => {
  // const result = trpc.getIdeas.useQuery()
  const { data, isLoading, isError, isFetched } = trpc.getIdeas.useQuery()
  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error: {isError}</div>
  if (!isFetched) return <div>Not fetched</div>

  return (
    <div>
      <h1>All IdeaNick</h1>
      { data?.ideas.map((idea) => (
          <div key={idea.nick}>
            <h2>{idea.name}</h2>
            <p>{idea.description}</p>
          </div>
      ))}
    </div>
  )
}
