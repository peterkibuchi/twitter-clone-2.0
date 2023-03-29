import LoadingSpinner from "./LoadingSpinner";

export default function LoadingPage() {
  return (
    <div className="absolute top-0 right-0 flex h-screen w-screen items-center justify-center">
      <LoadingSpinner size={60} />
    </div>
  );
}
