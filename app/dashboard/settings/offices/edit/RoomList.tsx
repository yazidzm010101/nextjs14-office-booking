import {
  getRoomsByOfficeId,
  getRoomsByOfficeIdPagesCount,
} from "~/_lib/data/rooms";

async function RoomList({ officeId }: { officeId: string }) {
  const rooms = await getRoomsByOfficeId(officeId);
  const count = await getRoomsByOfficeIdPagesCount(officeId);
  return <div>{JSON.stringify(rooms)}</div>;
}

export default RoomList;
