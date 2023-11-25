import { Spinner } from '@material-tailwind/react';


export default function LoadingSpinner() {
  return (
    <div className='flex min-h-[700svh] justify-center items-center'>
      <Spinner className="h-10 w-10" />
    </div>
  );
}
