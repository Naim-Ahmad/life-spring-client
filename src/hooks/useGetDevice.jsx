import { useEffect, useState } from "react"

export default function useGetDevice() {
    const [device, setDevice] = useState('sm')

    useEffect(() => {
        window.addEventListener('resize', () => {
            if (window.innerWidth >= 640) {
                setDevice('md')
            }else{
                setDevice('sm')
            }
        })
    }, [])

    return {device}
}