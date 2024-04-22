function Loading() {
  const skeletons = [];
  for (let i = 1; i <= 5; i++) {
    skeletons.push(
      <li
        key={i}
        className="flex flex-col rounded-lg outline outline-1 outline-transparent xs:flex-row overflow-clip bg-white/5 shimmer"
      >
        <div className="flex-shrink-0 object-cover w-full xs:w-36 aspect-video xs:aspect-square bg-white/20 shimmer" />
        <div className="flex flex-col flex-grow gap-2 mx-4 my-3 text-gray-200">
          <div className="w-full h-12 rounded-lg bg-white/20 shimmer" />
          <div className="w-full h-5 max-w-sm rounded-lg bg-white/20 shimmer" />
          <div className="w-full h-5 max-w-xs rounded-lg bg-white/20 shimmer" />
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
      <ul className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
        {skeletons}
      </ul>
    </section>
  );
}

export default Loading;
