import React from 'react'
import EditOffice from './EditOffice'
import ListRoom from './ListRoom'
import { getOfficeById } from '~/_lib/data/offices';

async function page({searchParams}: { searchParams: {id:string, page: string} }) {
  const office = await getOfficeById(searchParams.id );
  
  if (!office) {
    return <div>Not found</div>
  }

  return (
    <>
      <EditOffice office={office}/>
      <ListRoom searchParams={searchParams} office={office}/>
    </>
  )
}

export default page