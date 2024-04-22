import clsx from "clsx";
import {
  getRoomsByOfficeId,
  getRoomsByOfficeIdPagesCount,
} from "~/_lib/data/rooms";
import AddRoom from "./AddRoom";
import EditRoom from "./EditRoom";

async function ListRoom({
  searchParams,
  office,
}: {
  searchParams: { id: string; page: string };
  office: {
    id: string;
    name: string;
    address: string;
    description: string;
    room_duration_min: string;
    room_duration_max: string;
    photo: string;
  };
}) {
  const rooms = await getRoomsByOfficeId(
    searchParams.id,
    Number(searchParams.page || 1),
    10
  );
  const count = await getRoomsByOfficeIdPagesCount(searchParams.page, 10);
  return (
    <div>
      <table className="w-full">
        <thead>
          <tr>
            <th className="w-6 px-5 py-3 text-gray-300 rounded-tl-lg text-start bg-slate-700">
              #
            </th>
            <th className="text-start px-5 lg:w-[30%] py-3 text-gray-300 bg-slate-700">
              Room
            </th>
            <th className="px-5 py-3 text-gray-300 rounded-tr-lg text-start bg-slate-700">
              Description
            </th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room, i) => (
            <EditRoom
              room={room}
              officeId={office.id}
              officeName={office.name}
              key={room.id}
            >
              <tr className="hover:cursor-pointer">
                <td
                  className={clsx(
                    "px-5 py-3 text-gray-300",
                    i % 2 == 0 ? "bg-slate-800" : "bg-slate-700/50",
                    i == rooms.length - 1 && "rounded-bl-lg"
                  )}
                >
                  {(Number(searchParams.page || 1) - 1) * 10 + i + 1}
                </td>
                <td
                  className={clsx(
                    "px-5 py-3 text-gray-300",
                    i % 2 == 0 ? "bg-slate-800" : "bg-slate-700/50"
                  )}
                >
                  {room.name}
                </td>
                <td
                  className={clsx(
                    "px-5 py-3 text-gray-300",
                    i % 2 == 0 ? "bg-slate-800" : "bg-slate-700/50",
                    i == rooms.length - 1 && "rounded-br-lg"
                  )}
                >
                  {room.description}
                </td>
              </tr>
            </EditRoom>
          ))}
        </tbody>
      </table>
      <AddRoom officeId={office.id} officeName={office.name} />
    </div>
  );
}

export default ListRoom;
