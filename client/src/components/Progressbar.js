import React, { useEffect, useState } from 'react'

const Progressbar = () => {
    const [width, setWidths] = useState(0)
    useEffect(() => {
        requestAnimationFrame(() => {
            if (width < 100) setWidths(width + 0.3)
        })
    })
    return (
        <div className="relative pt-1 w-1/2">
            <div className="overflow-hidden w-full h-3 mb-4 text-xs flex rounded bg-white border border-black shadow-black">
                <div
                    style={{ width: width + '%' }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-yellow-pattern"></div>
            </div>
        </div>
    )
}

export default Progressbar
