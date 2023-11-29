import { Spinner } from '@material-tailwind/react';


export default function LoadingSpinner() {
  return (
    <div className='flex min-h-[70svh] justify-center items-center'>
      <Spinner color='green' className="h-10 w-10" />
    </div>
  );
}
