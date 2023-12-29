import { Button } from '@material-tailwind/react'
import { useRef } from 'react'

export default function UploadButton({ label, imgData, setImgData, required }) {

  // console.log(setImgData)

  const inpRef = useRef()

  const handleAvatarName = e => {
    setImgData(e.target.files[0])
    // console.log(e.target.files[0])
    // console.dir(e.target)
  }

  const handleUpload = ()=>{
    inpRef.current.click()
  }

  return (
    <div className="flex items-center gap-4">
      <input
        required={required}
        type="file"
        ref={inpRef}
        hidden
        accept="image/*"
        onChange={handleAvatarName}

      />
      <Button onClick={handleUpload} variant="outlined" className="flex items-center gap-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="h-5 w-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
          />
        </svg>
        {label ? label : "Choose Avatar"}
      </Button>
      <span className="font-medium">{imgData?.name}</span>
    </div>
  )
}

UploadButton.propTypes = {}