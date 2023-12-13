import React from 'react'
import { IconButton } from 'src/components/Buttons'
import { Copy, Check } from 'src/components/Icons'

export default function CopyButton({ text, onClick = () => { } }) {
    const [hover, setHover] = React.useState(false)
    const [copied, setCopied] = React.useState(false)
    return (
        <IconButton
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onClick={() => {
                onClick();
                setCopied(true);
                navigator.clipboard.writeText(text)
                    .then(() => {
                        setTimeout(() => {
                            setCopied(false)
                        }, 2000)
                    })
            }}
            icon={copied ? <Check /> : <Copy active={hover} />}
        />
    )
}
