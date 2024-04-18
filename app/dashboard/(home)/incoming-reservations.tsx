import { capitalize } from '@/lib/utils/formatUtils'
import { faker } from '@faker-js/faker'
import clsx from 'clsx'
import React from 'react'

const data = [
  { name: capitalize(faker.word.noun()) + ' Room', availability: faker.number.int({min: 30, max: 100}) },
  { name: capitalize(faker.word.noun()) + ' Room', availability: faker.number.int({min: 30, max: 100}) },
  { name: capitalize(faker.word.noun()) + ' Room', availability: faker.number.int({min: 30, max: 100}) },
  { name: capitalize(faker.word.noun()) + ' Room', availability: faker.number.int({min: 30, max: 100}) },
]

function IncomingReservations() {
  return (
    <section className='my-3 mb-10'>
      <div className='flex items-center'>
        <h2 className='mb-3 text-2xl font-bold dark:text-gray-200 me-auto'>Incoming Reservations</h2>
        <button className='px-4 py-2 my-2 rounded-md dark:bg-gray-800 dark:text-gray-100'>Filter</button>
      </div>
      <div className='grid gap-2 md:grid-cols-2 xl:grid-cols-4'>
        {
          data.map((item, i) => (
            <div className="px-4 py-3 rounded-xl dark:bg-gray-800" key={item.name + i}>
              <h5 className='mb-2 text-xl font-medium dark:text-gray-300'>{ item.name }</h5>
              <div className='w-full h-3 rounded-md dark:bg-gray-700 overflow-clip'>
                <div style={{width: item.availability + '%'}} className={clsx('h-full rounded-md', item.availability >= 60 && 'dark:bg-emerald-600' || item.availability >= 40 && 'dark:bg-orange-600' || 'dark:bg-red-600')}/>
              </div>
              <small className='text-sm text-gray-500'>{ ((item.availability * 9) / 100).toFixed(2) } Total Hour(s) Available</small>
            </div>
          ))
        }
      </div>
    </section>
  )
}

export default IncomingReservations