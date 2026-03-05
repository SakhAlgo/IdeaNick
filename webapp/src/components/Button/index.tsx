import cn from 'classnames'
import css from './index.module.scss'

export const Button = ({ children, loading = false }: { children: React.ReactNode; loading?: boolean }) => {
  return (
    <button className={cn({ [css.button]: true, [css.loading]: loading })} type="submit" disabled={loading}>
      {loading ? 'Loading...' : children}
    </button>
  )
}
