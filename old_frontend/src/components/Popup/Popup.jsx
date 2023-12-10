import React, { useEffect } from 'react'

export default function Popup({ open, closePopup = () => { }, children }) {
    const [lastClicked, setLastClicked] = React.useState(false);
    const childRef = React.useRef(null);
    const handleClose = (e) => {
        e.preventDefault()
        e.stopPropagation()
        if (!childRef.current?.contains(e.target)) {
            if (!lastClicked)
                closePopup();
            setLastClicked(false);
        }
    }

    useEffect(() => {
        if (open) {
            // Disable scrolling on the body element when popup is open
            document.body.style.overflow = 'hidden';
        } else {
            // Enable scrolling when popup is closed
            document.body.style.overflow = '';
        }

        // Clean up: Enable scrolling when component is unmounted or when it will be unmounted
        return () => {
            document.body.style.overflow = '';
        };
    }, [open]);
    
    return (
        <>
            {open && <div className="backdrop"
                onMouseUp={handleClose}
            >
                <div
                    ref={childRef}
                    onMouseDown={() => { setLastClicked(true) }}
                    style={{
                        display: "flex",
                        maxHeight: "80vh",
                        alignItems: "flex-start",
                    }}

                >
                    {children}
                </div>
            </div >}
        </>
    )
}