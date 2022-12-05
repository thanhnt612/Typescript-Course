import React from 'react'
import { Outlet } from 'react-router-dom'

type Props = {}

export default function UserTemplate({ }: Props) {
    return (
        <div className='d-flex'>
            <div className="w-50">
                <img src="https:picsum.photos/1000/2000" alt="..."
                    className='w-100 h-100'
                    style={{ minHeight: '100vh', objectFit: 'cover' }} />
            </div>
            <div className="w-50">
                <Outlet />
            </div>
        </div>
    )
}