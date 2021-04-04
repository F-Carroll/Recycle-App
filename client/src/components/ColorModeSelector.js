import { Select } from '@chakra-ui/select'
import React from 'react'

export default function ColorModeSelector() {
    return (
        <div>
            <Select isDisabled w="160px" variant="filled" placeholder="Light"></Select>
        </div>
    )
}
