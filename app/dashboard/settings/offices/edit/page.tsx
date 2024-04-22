import React from 'react'
import EditOffice from './EditOffice'
import RoomList from './RoomList'
import { getOfficeById } from '~/_lib/data/offices';

async function page({searchParams}: { searchParams: {id:string} }) {
  const office = await getOfficeById(searchParams.id );
  
  if (!office) {
    return <div>Not found</div>
  }

  return (
    <>
      <EditOffice office={office}/>
      <RoomList officeId={searchParams.id}/>
    </>
  )
}

export default page