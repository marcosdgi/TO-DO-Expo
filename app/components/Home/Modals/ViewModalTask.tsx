import { IconX } from '@tabler/icons-react-native';
import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

const ViewModalTask: React.FC<Props> = ({ isOpen, onClose }) => {
    return (
        <Modal
            visible={isOpen}
            transparent={true}
            onRequestClose={onClose}
            animationType="fade"
        >
            <View style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                <View className='w-full rounded-md h-[30%] bg-white p-4 items-center justify-start'>
                    <TouchableOpacity onPress={onClose} style={{ alignSelf: 'flex-end' }}>
                        <IconX size={24} color="gray" />
                    </TouchableOpacity>

                    <View className='flex-col justify-start items-start  w-full gap-y-2'>
                        <View >
                            <Text className='text-xl font-semibold'>Titulo</Text>
                            <Text className='text-sm'>Titulo</Text>
                        </View>
                        <View>
                            <Text className='text-xl font-semibold'>Descripcion</Text>
                            <Text className='text-sm'>Descripcion</Text>
                        </View>
                        <View>
                            <Text className='text-xl font-semibold'>Estado</Text>
                            <Text className='text-sm'>Estado</Text>
                        </View>

                        <View>
                            <Text className='text-xl font-semibold'>Fecha de creación</Text>
                            <Text className='text-sm'>15/01/2021</Text>
                        </View>
                    </View>

                </View>
            </View>
        </Modal>
    );
};

export default ViewModalTask;
