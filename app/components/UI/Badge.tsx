import { IconX } from '@tabler/icons-react-native'
import React from 'react'
import { TouchableOpacity, Text } from 'react-native'

interface Props {
    option: { value: number, tag: string }
    onClose: () => void
}

const Badge: React.FC<Props> = ({ option, onClose }) => {
    return (
        <TouchableOpacity className="flex-row justify-start items-center bg-blue-100 py-1 px-2 rounded-md">
            <Text>{option.tag}</Text>
            <TouchableOpacity
                onPress={() => onClose()}
            >
                <IconX color={'gray'} />
            </TouchableOpacity>
        </TouchableOpacity>
    )
}
export default Badge;