function Loading() {
  return (
    <div
      class="fixed top-0 left-0 z-50 flex items-center justify-center w-screen h-screen"
      style={{ background: "rgba(0, 0, 0, 0.3)" }}
    >
      <div class="flex flex-col items-center px-5 py-2 bg-white border rounded-lg">
        <div class="relative block w-20 h-5 mt-2 loader-dots">
          <div class="absolute top-0 w-3 h-3 mt-1 bg-green-500 rounded-full"></div>
          <div class="absolute top-0 w-3 h-3 mt-1 bg-green-500 rounded-full"></div>
          <div class="absolute top-0 w-3 h-3 mt-1 bg-green-500 rounded-full"></div>
          <div class="absolute top-0 w-3 h-3 mt-1 bg-green-500 rounded-full"></div>
        </div>
        <div class="mt-2 text-xs font-light text-center text-gray-500">
          Please wait...
        </div>
      </div>
    </div>
  );
}

export { Loading };
