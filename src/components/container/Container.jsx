function Container({ children }) {
  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 overflow-x-hidden">
      <div className="max-w-screen-2xl mx-auto">
        {children}
      </div>
    </div>
  );
}
export default Container