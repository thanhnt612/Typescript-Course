import React from 'react'
import { Outlet } from 'react-router-dom'
type Props = {}

export default function HomeTemplate({ }: Props) {
    return (
        <>
            <header className='bg-dark text-white p-3'>
                Header
            </header>
            <div className="content"
                style={{ minHeight: '75vh' }}>
                <Outlet />
            </div>
            <footer className='bg-dark text-white p-3'>
                Footer
            </footer>
        </>
    )
}