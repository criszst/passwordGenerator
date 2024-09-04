import AsyncStorage from "@react-native-async-storage/async-storage";

const useStorage = () => {
    const getItens = async(key) => {
        try {
            const passwords = await AsyncStorage.getItem(key)

            if (passwords !== null) {
                return JSON.parse(passwords);
            }
            
            return [];
            
        } catch (error) {
            console.log('erro ao buscar + ', error)
            return []
        }
    }

    const saveItem = async (key, value) => {
        try{
            let passwords = await getItens(key)

            passwords.push(value)

            await AsyncStorage.setItem(key, JSON.stringify(passwords))
        } catch (error) {
            console.log('erro ao salvar o item ', error)
        }
    }

    const removeItem = async (key, item) => {
        try {
            let passwords = await getItens(key)

            let myPasswords = passwords.filter( (passwords) => {
                return (passwords !== item)
            })

            await AsyncStorage.setItem(key, JSON.stringify(myPasswords))

            return myPasswords
        } catch (error) {
            console.log('erro ao deletar o item ', error)
        }
    }

    return {
        getItens,
        saveItem,
        removeItem
    }
}

export default useStorage;