import { Skeleton } from "./ui/skeleton";

const SkeletonCard = () => {
  return (
    <>
      {[1, 2, 3, 4, 5, 6].map((index) => (
        <div
          key={index}
          className="flex flex-col items-center justify-center space-y-3"
        >
          <Skeleton className="h-[500px] w-[400px] mx-auto rounded-xl" />
        </div>
      ))}
    </>
  );
};

export default SkeletonCard;
