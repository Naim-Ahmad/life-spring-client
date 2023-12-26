import { useEffect, useState } from "react"

export default function useGetDevice() {
    const [device, setDevice] = useState({devicePx: window.innerWidth})

    useEffect(() => {
        const unsubscribe = window.addEventListener('resize', () => {
            const deviceWidth = window.innerHeight

            if (deviceWidth >= 640) {
                setDevice({deviceType: 'sm', devicePx: deviceWidth})
            }
            else if(deviceWidth >= 768){
                setDevice({deviceType: 'md', devicePx: deviceWidth})
            }
            else if(deviceWidth >= 1024){
                setDevice({deviceType: 'lg', devicePx: deviceWidth})
            }
            else if(deviceWidth >= 1280){
                setDevice({deviceType: 'xl', devicePx: deviceWidth})
            }
            else{
                setDevice({deviceType: '2xl', devicePx: deviceWidth})
            }

        
        })
        return ()=> unsubscribe
    }, [])

    return [device]
}