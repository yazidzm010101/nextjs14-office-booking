function Loading() {
  const skeletons = [];
  for (let i = 1; i <= 5; i++) {
    skeletons.push(
      <li
        key={i}
        className={
          "flex w-full rounded-lg overflow-clip dark:bg-gray-800 transition-all duration-75 shimmer"
        }
      >
        <div className="w-24 bg-white aspect-square bg-opacity-5" />
        <div className="flex flex-col flex-grow mx-3 my-2">
          <div className="w-full h-8 max-w-sm bg-white rounded-lg bg-opacity-5" />
          <div className="w-full h-4 mt-1 bg-white rounded-lg bg-opacity-5" />
          <div className="w-full h-4 max-w-md mt-1 bg-white rounded-lg bg-opacity-5" />
        </div>
      </li>
    );
  }
  return (
    <section className="my-3 mb-10">
      <div className="flex items-center">
        <h2 className="mb-3 text-2xl font-bold dark:text-gray-200 me-auto">
          Offices
        </h2>
      </div>
      <ul className="flex flex-col gap-3">{skeletons}</ul>
    </section>
  );
}

export default Loading;
