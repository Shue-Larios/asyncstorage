
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import {
  Button,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

const App = () => {

  const [inputTexto, setInputTexto] = useState('')
  const [nombreStorage, setNombreStorage] = useState('')

  useEffect(() => {
    obtenerDatosStorage();
  }, [])


  const guardarDatos = async () => {

    try {
      await AsyncStorage.setItem('nombre', inputTexto);
      setNombreStorage(inputTexto)
    } catch (error) {
      console.log(error);
    }
  }

  const obtenerDatosStorage = async () => {
    try {
      const nombre = await AsyncStorage.getItem('nombre');
      setNombreStorage(nombre)
    } catch (error) {
      console.log(error);
    }
  }

  const eliminarDatos = async () => {
    try {
      await AsyncStorage.removeItem('nombre');
      setNombreStorage('')
    } catch (error) {
      console.log(error);
    }
  }


  const ocultarTeclado = () => {
    Keyboard.dismiss() // para cerrar el teclado
  }

  return (
    <TouchableWithoutFeedback onPress={() => ocultarTeclado()}>
      <View style={styles.contenedor}>
        {nombreStorage
          ? <Text>Hola: {nombreStorage} </Text>
          : null
        }


        <TextInput
          style={styles.input}
          placeholder='Escribe tu Nombre'
          onChangeText={texto => setInputTexto(texto)}
        />
        <Button
          title="Guardar"
          color='#333'
          onPress={() => guardarDatos()}
        />
        {nombreStorage
          ? (<TouchableHighlight style={styles.btnEliminar}
            onPress={() => eliminarDatos()}
          >
            <Text style={styles.textoEliminar}>Eliminar Nombre</Text>
          </TouchableHighlight>)
          : null
        }


      </View>
    </TouchableWithoutFeedback>

  );
};

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center'
  },
  input: {
    borderColor: '#666',
    marginBottom: 5,
    borderBottomWidth: 2, // grosos de la linea
    width: 300,
    height: 40
  },
  btnEliminar: {
    backgroundColor: 'red',
    marginTop: 20,
    padding: 10,
    borderRadius: 15
  },
  textoEliminar: {
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
    width: 300
  },
});

export default App;
