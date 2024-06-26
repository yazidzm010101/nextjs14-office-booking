import Link from 'next/link'
import SettingItem from './SettingItem'

const settings: Record<string, any>[] = [
  {
    name: "Theme",
    descriptor: <span>Dark</span>
  },
  {
    name: "Master Data",
    descriptor: <Link href={"settings/offices"}>Manage office and rooms data</Link>
  },
  {
    name: "User Management",
    descriptor: <Link href={"#"}>Add or update user list</Link>
  }
]



function Setting() {
  return (
    <section className='my-3 mb-10'>
      <div className='flex items-center'>
        <h2 className='mb-3 text-2xl font-bold dark:text-gray-200 me-auto'>Settings</h2>
      </div>
      <ul className='flex flex-col rounded-md dark:bg-gray-800'>
        {
          settings.map((item, i) => (
            <li key={i}>
            <SettingItem  name={item.name} description={item?.description} descriptor={item?.descriptor}>
              { item.children }
            </SettingItem>
            { i != settings.length  -1 && <hr className='my-0 opacity-10'/> }
            </li>
          ))
        }
      </ul>
    </section>
  )
}

export default Setting