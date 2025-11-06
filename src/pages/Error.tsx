export default function Error() {
  return (
    <div className="h-screen flex flex-col items-center justify-center text-center">
      <h1 className="text-3xl font-bold text-red-600">Error</h1>
      <p className="text-udo-steel mt-2">Something went wrong.</p>
      <a href="/" className="text-blue-600 underline mt-4">
        Back to Home
      </a>
    </div>
  );
}
