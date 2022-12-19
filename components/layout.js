import {header} from './header'
import {footer} from './footer'

export default function layout({children}){
    return(
        <div className='flex flex-col min-h-screen'>
            <header />
            <main className='flex- 1 max-w-4xl w-full mx-auto'>{children}</main>
            <footer />
        </div>
        
    )
}