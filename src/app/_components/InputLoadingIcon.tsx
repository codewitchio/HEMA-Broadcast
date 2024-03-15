import React from 'react'
import { TailSpin } from 'react-loader-spinner'

type InputLoadingIconProps = {
    visible: boolean,
    size?: number
}

export function InputLoadingIcon(props: InputLoadingIconProps) {
    let size = props.size ? props.size : 25
    return (
        <TailSpin
            visible={props.visible}
            height={size}
            width={size}
            color="#c7a3ff"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={props.visible ? { visibility: 'visible' } : { visibility: 'hidden' }}
            wrapperClass="input-loading"
        />
    )
}