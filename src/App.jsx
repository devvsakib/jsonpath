import React from 'react'
import QueryBuilder from './component/CustomQueryBuilder/QueryBuilder'

const App = () => {
    return (
        <div className='max-w-[1280px] mx-auto mt-10'>
            <QueryBuilder />
            <p className='text-center my-10 text-black'>
                Repo: <a className='text-orange-500 alink hover:text-green-500'href="https://github.com/devvsakib/jsonpath">Check</a>
            </p>
        </div>
    )
}

export default App