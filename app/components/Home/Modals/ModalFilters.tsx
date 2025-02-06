import { IconX } from "@tabler/icons-react-native";
import { Modal, Text, TouchableOpacity, View } from "react-native";

interface Props {
    options: { value: number, tag: string }[];
    onSelect: (option: { value: number, tag: string }) => void
    isOpen: boolean;
    onClose: () => void
}

const ModalFilters: React.FC<Props> = ({ isOpen, onSelect, onClose, options }) => {
    return (
        <Modal
            visible={isOpen}
            transparent={true}
            animationType="fade"
        >
            <View style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                <View className='w-full rounded-md h-[30%] bg-white p-4 items-center justify-start'>
                    <TouchableOpacity onPress={onClose} style={{ alignSelf: 'flex-end' }}>
                        <IconX size={24} color="gray" />
                    </TouchableOpacity>
                    <View className="w-full mt-10">
                        {options.map((option, index) => (
                            <TouchableOpacity
                                key={index}
                                className="gap-y-2 justify-center items-center rounded-md bg-blue-100 mt-2 w-full h-10"
                                onPress={() => onSelect(option)}>
                                <Text className="text-xl">
                                    {option.tag}
                                </Text>
                            </TouchableOpacity>)
                        )}
                    </View>

                </View>
            </View>
        </Modal>
    )
}

export default ModalFilters;