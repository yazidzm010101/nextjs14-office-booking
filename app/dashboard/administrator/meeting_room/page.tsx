import {
  IconColumns3,
  IconDesk,
  IconPasswordUser,
  IconUsersGroup,
} from "@tabler/icons-react";
import clsx from "clsx";
import Link from "next/link";

const links = [
  {
    name: "Meeting Room",
    description: "Manage meeting room master and time settings",
    href: "/meeting_room",
    icon: <IconUsersGroup className="w-full h-full" />,
  },
  {
    name: "Co-working Space",
    description: "Manage co-working space master, quota, and time settings",
    href: "/co-working_space",
    icon: <IconDesk className="w-full h-full" />,
    disabled: true,
  },
  {
    name: "Locker",
    description: "Manager locker master and time settings",
    href: "/locker",
    icon: <IconColumns3 className="w-full h-full" />,
    disabled: true,
  },
  {
    name: "User Management",
    description: "Manager who can access and use the apps",
    href: "/user_management",
    icon: <IconPasswordUser className="w-full h-full" />,
    disabled: true,
  },
];

function Configuration() {
  return (
    <div>
      <h1 className="mt-4 text-3xl font-bold text-gray-700 ms-2">
        Meeting Room
      </h1>
      <p className="mt-1 mb-5 text-gray-600 ms-2">You can add or update the meeting rooms, you can also set up some time restriction.</p>
      <ul className="grid grid-cols-4 gap-3">
        {links.map((link) => (
          <li key={link.name}>
            <Link
              aria-disabled={link.disabled}
              href={
                link.disabled
                  ? "#"
                  : `/dashboard/configuration/master_meeting_room`
              }
              className={"block px-2 py-1 rounded-2xl bg-slate-50 h-full"}
            >
              <div
                className={clsx(
                  "flex items-start",
                  link.disabled && "opacity-25"
                )}
              >
                <div
                  className={
                    "w-12 h-12 p-2 my-2 rounded-xl text-indigo-700 bg-blue-100 flex-shrink-0"
                  }
                >
                  {link.icon}
                </div>
                <div className="flex flex-col gap-1 my-2 ms-2">
                  <h5 className={"text-md text-gray-700 font-medium"}>
                    {link.name}
                  </h5>
                  <p className="text-sm text-gray-500">{link.description}</p>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Configuration;
