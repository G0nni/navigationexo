import React from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Alert} from 'react-native';
import {storage} from '../../App';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleLogin = () => {
    // construit un objet user avec les valeurs de email et password
    const user = {
      email,
      password,
    };

    // récupère les utilisateurs déjà enregistrés
    const serializedArray = storage.getString('users') || '[]';
    const existingUsers = JSON.parse(serializedArray);

    // vérifie si l'utilisateur existe déjà
    const userExists = existingUsers.some(
      (u: {email: string; password: string}) =>
        u.email === user.email && u.password === user.password,
    );

    // si l'utilisateur n'existe pas, on affiche une alerte
    if (!userExists) {
      return Alert.alert('Invalid email or password');
    }

    // si l'utilisateur existe, on affiche une alerte et on redirige vers la page ViewAccounts
    Alert.alert('Login Successful!');
    navigation.navigate('ViewAccounts' as never);
  };

  // Vous pouvez remplacer 'your-avatar-image.png' par le chemin d'accès à votre image locale ou une URL
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.loginContainer}>
        <Image
          source={require('../assets/img/bg3.png')}
          style={styles.avatar}
        />
        <TextInput
          placeholder="Email"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <TextInput
          placeholder="Password"
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('SignUp' as never)}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginContainer: {
    width: '80%',
    alignItems: 'center',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 30,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginTop: 20,
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    color: '#333',
  },
  button: {
    backgroundColor: '#ff5a5f',
    width: '100%',
    padding: 15,
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default LoginScreen;
