import { useState } from 'react';

import { StyleSheet, Text, View, Image, TouchableOpacity, Modal } from 'react-native';
import Slider from '@react-native-community/slider';

import { ModalPassword } from '../../components/modal/components';

const charset = 'abcdefghiojklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

export function Home() {
  const [size, setSize] = useState(10)

  const [passwordValue, setPasswordValue] = useState("")
  const [modalVisible, setModalVisible] = useState(false)

  function generatePssword() {
    let password = '';

    for(let i = 0, n = charset.length; i < size; i++) {
      password += charset.charAt(Math.floor(Math.random() * n));
    }

    setPasswordValue(password)
    setModalVisible(true)
  }



  return (
    <View style={styles.container}>
      <Image
      source={require('../../../assets/logo.png')}
      style={styles.logo}
      />

      <Text style={styles.title}>{size.toFixed()} Caracteres</Text>

      <View style={styles.area}> 
        <Slider
        style={{height: 50}}
        minimumValue={6}  
        maximumValue={20}
        maximumTrackTintColor='#ff0000'
        minimumTrackTintColor='#000'
        thumbTintColor='#392de9'

        value={size}
        onValueChange={(value) => setSize(value)}

        ></Slider>


      </View>

      <TouchableOpacity style={styles.btn} onPress={generatePssword}>
        <Text style={styles.btnText}>Gerar Senha</Text>
      </TouchableOpacity>
      
      <Modal visible={modalVisible} animationType='fade' transparent={true}>
        <ModalPassword password={passwordValue} handleClose={ () => setModalVisible(false)} />
      </Modal>
   
    </View>


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#efe5f4',
    justifyContent: 'center',
    alignItems: 'center',
  },

  logo: {
    marginBottom: 60,
  },

  area: {
    marginTop: 14,
    marginBottom: 14,
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 6,
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },

  btn: {
    backgroundColor: '#392de9',
    width: '80%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    marginBottom: 18,
  },

  btnText: {
    color: '#fff',
    fontSize: 20,
  }
});
