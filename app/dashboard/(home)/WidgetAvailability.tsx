import { getAvailability } from "@/data/summary";
import clsx from "clsx";

async function WidgetAvailability() {
  const data = await getAvailability(new Date());
  return (
    <section className="my-3 mb-10">
      <div className="flex items-center">
        <h2 className="mb-3 text-2xl font-bold dark:text-gray-200 me-auto">
          Reservation Availability
        </h2>
        <button className="px-4 py-2 my-2 rounded-md dark:bg-gray-800 dark:text-gray-100">
          Filter
        </button>
      </div>
      <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-4">
        {data.map((item, i) => (
          <div
            className="px-4 py-3 rounded-xl dark:bg-gray-800"
            key={item.name + i}
          >
            <h5 className="mb-2 text-xl font-medium dark:text-gray-300">
              {item.name}
            </h5>
            <div className="w-full h-3 rounded-md dark:bg-gray-700 overflow-clip">
              <div
                style={{ width: item.populated_percentage + "%" }}
                className={clsx(
                  "h-full rounded-md",
                  (item.populated_percentage >= 60 && "dark:bg-red-600") ||
                    (item.populated_percentage >= 40 && "dark:bg-orange-600") ||
                    "dark:bg-emerald-600"
                )}
              />
            </div>
            <small className="text-sm text-gray-500">
              {(((100 - item.populated_percentage) * 9) / 100).toFixed(2)} Total
              Hour(s) Available
            </small>
          </div>
        ))}
      </div>
    </section>
  );
}

export default WidgetAvailability;
