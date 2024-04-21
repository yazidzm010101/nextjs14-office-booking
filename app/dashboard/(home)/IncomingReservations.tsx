import { capitalize } from '@/utils/text-utils'
import { faker } from '@faker-js/faker'
import clsx from 'clsx'

const data = [
  { name: capitalize(faker.word.noun()) + ' Room', populated_percentage: faker.number.int({min: 30, max: 100}) },
  { name: capitalize(faker.word.noun()) + ' Room', populated_percentage: faker.number.int({min: 30, max: 100}) },
  { name: capitalize(faker.word.noun()) + ' Room', populated_percentage: faker.number.int({min: 30, max: 100}) },
  { name: capitalize(faker.word.noun()) + ' Room', populated_percentage: faker.number.int({min: 30, max: 100}) },
]

function IncomingReservations() {
  return (
    <section className='my-3 mb-10'>
      <div className='flex items-center'>
        <h2 className='mb-3 text-2xl font-bold dark:text-gray-200 me-auto'>Incoming Reservations</h2>
        <button className='px-4 py-2 my-2 rounded-md dark:bg-gray-800 dark:text-gray-100'>Filter</button>
      </div>
      <table className='w-full'>
        <tbody>
          {
            data.map((item, i) => (
              <tr className={"px-4 py-3 dark:bg-gray-800"} key={item.name + i}>
                <td className={clsx(i == 0 && "rounded-tl-xl")}>{ item.name }</td>
                <td>{ item.name }</td>
                <td>{ item.name }</td>
                <td>{ item.name }</td>
                <td className={clsx(i == 0 && "rounded-tr-xl")}>{ item.name }</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </section>
  )
}

export default IncomingReservations