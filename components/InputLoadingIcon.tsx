import React from 'react'
import { Oval } from 'react-loader-spinner'

type InputLoadingIconProps = {
    visible: boolean,
    size?: number
}

export function InputLoadingIcon(props: InputLoadingIconProps) {
    let size = props.size ? props.size : 25
    return (
        <Oval
            visible={props.visible}
            height={size}
            width={size}
            color="white"
            secondaryColor="#6976a3"
            ariaLabel="oval-loading"
            wrapperStyle={{ visibility: props.visible ? 'visible' : 'hidden' }}
            wrapperClass="input-loading"
        />
    )
}