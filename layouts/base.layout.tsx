import type { NextPage } from 'next'
import { FC, ReactNode } from 'react'

export type BaseLayoutProps = {
  children: ReactNode
}

const BaseLayout: FC<BaseLayoutProps> = ({children}) => {
  return (
     <div className='container'>
       <div className='row'>{children}</div>
     </div>
)}

export default BaseLayout;
