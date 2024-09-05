import { useState, useEffect } from 'react';

import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useIsFocused } from '@react-navigation/native';


import useStorage  from '../../hooks/useStorage'
import PasswordItem from './components/passwordsItem';

export function Passwords() {
    const [listPasswords, setListPasswords] = useState([]);
    const [showValue, setShowValue] = useState(false)
    const isFocused = useIsFocused();

    const { getItens, removeItem } = useStorage();

    useEffect(() => {
        async function loadPasswords() {
            const passwords = await getItens('@pass')
            setListPasswords(passwords)
        }

        loadPasswords();
    }, [isFocused])


    async function handleDeletePassword(item) {
        const passwords = await removeItem('@pass', item)

        setListPasswords(passwords)
    }

    return (
        <SafeAreaView style={{ flex: 1, }}>
            <View style={styles.header}>
                <Text style={styles.title}>MINHAS SENHAS</Text>
            </View>

            <TouchableOpacity style={styles.content} onPress={() => setShowValue(!showValue)}>

            <FlatList
                style={{ flex: 1, paddingTop: 14, }} 
                
                data={listPasswords}
                keyExtractor={ (item) => String(item)}
                renderItem={ ({item}) => showValue ? (

<PasswordItem data={item} removePassword={() => handleDeletePassword(item)}></PasswordItem>
                ): (
                    <View style={styles.hindPassowrd} ></View>
                )
            }>

                </FlatList>

                
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#392de9',
        paddingTop: 58,
        paddingBottom: 14,
        paddingLeft: 14,
        paddingRight: 14,
    },

    title: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
    },

    content: {
        flex: 1,
        paddingLeft: 14,
        paddingRight: 14,
    },

    hindPassowrd: {
        paddingVertical: 30,
        marginTop: 6,
        height: 20,
        backgroundColor: '#cfcfcf',
        borderRadius: 8,
        width: '100%',
    }
})