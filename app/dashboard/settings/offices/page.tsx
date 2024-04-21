import { getOffices, getOfficesPagesCount } from "@/data/offices";
import { IconMap2 } from "@tabler/icons-react";
import Image from "next/image";
import AddOffice from "./AddOffice";

async function Offices({
  searchParams,
}: {
  searchParams: { page?: string; itemPerPage?: string };
}) {
  const page = Number(searchParams.page) || 1;
  const itemPerPage = Number(searchParams.itemPerPage) || 10;
  const offices = await getOffices(page, itemPerPage);
  const totalPages = await getOfficesPagesCount(itemPerPage);

  let pagesLinks = [];
  for (let i = 1; i <= totalPages; i++) {}

  return (
    <section className="my-3 mb-10">
      <div className="flex items-center">
        <h2 className="mb-3 text-2xl font-bold dark:text-gray-200 me-auto">
          Offices
        </h2>
      </div>
      <ul className="flex flex-col gap-3">
        {offices.map((item, i) => (
          <li
            key={i}
            className="flex flex-col transition-all duration-200 rounded-lg outline outline-1 outline-transparent hover:outline-emerald-600 sm:flex-row overflow-clip dark:bg-gray-800"
          >
            <Image
              alt={`${item.name} photo`}
              width={200}
              height={200}
              placeholder="blur"
              blurDataURL="/placeholder-image.webp"
              className="flex-shrink-0 object-cover w-full sm:w-24 md:w-36 aspect-video sm:aspect-square"
              src={
                item.photo ||
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXpYBvB9NK7nv3Bvw__8l9xz0zur9ZwgensBDcw1pDNw&s"
              }
            />
            <div className="flex-col flex-grow mx-4 my-3 text-gray-200">
              <h5 className="text-xl">{item.name}</h5>
              <p>
                <span className="inline-block align-middle opacity-80 me-1">
                  <IconMap2 className="w-5" />
                </span>
                <span className="align-middle opacity-80">{item.address}</span>
              </p>
              <p className="mt-3 text-sm opacity-60">{item.description}</p>
            </div>
          </li>
        ))}
      </ul>
      <ul className=""></ul>
      <p className="mt-4 dark:text-gray-300 text-end">
        {page} of {totalPages} pages
      </p>
      <AddOffice />
    </section>
  );
}

export default Offices;
