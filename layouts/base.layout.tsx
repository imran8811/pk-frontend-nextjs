import { FC, ReactNode } from 'react'
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

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
