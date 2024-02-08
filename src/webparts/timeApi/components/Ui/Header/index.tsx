import * as React from 'react'

type Props = {
  content: string
}

const Header = ({ content }: Props) => {
  return (
    <div>
      <h1>
        { content }
      </h1>
    </div>
  )
}

export default Header
