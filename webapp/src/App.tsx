export const App = () => {
  const ideas = [
    { nick: 'nick 1', name: 'Name 1', description: 'lorem 1' },
    { nick: 'nick 2', name: 'Name 2', description: 'lorem 2' },
    { nick: 'nick 3', name: 'Name 3', description: 'lorem 3' },
  ]
  return (
    <div>
      <h1>IdeaNick</h1>
      <div className="my-class1">
        <h2>Idea1</h2>
      </div>
      {ideas.map((idea) => {
        return (
          <div key={idea.nick}>
            <h2>{idea.name}</h2>
            <div className="">{idea.description}</div>
          </div>
        )
      })}
    </div>
  )
}
