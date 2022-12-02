import { useState } from "react";
import {
  Alert,
  Button,
  StyleSheet,
  TextInput,
  View,
  ActivityIndicator,
} from "react-native";
import { auth } from "../firebaseConfig";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

const Cadastro = ({ navigation }) => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);

  const cadastrar = () => {
    if (!email || !senha) {
      Alert.alert("Atenção", "Você deve preencher e-mail e senha");
      return;
    }

    setLoading(true);
    createUserWithEmailAndPassword(auth, email, senha)
      .then(() => {
        /* Ao fazer a criação do novo usuário (com 
          email e senha), aproveitamos para atualizar
          via updateProfile a propriedade do auth que
          permite adicionar um nome ao usuário*/
        updateProfile(auth.currentUser, {
          displayName: nome,
        });

        Alert.alert("Cadastro", "Conta criada com sucesso", [
          {
            text: "Não, me deixe aqui mesmo",
            onPress: () => {
              return false;
            },
            style: "cancel",
          },
          {
            text: "Sim, Leve-me ao seu líder",
            onPress: () => {
              navigation.navigate("AreaLogada");
            },
            style: "default",
          },
        ]);
      })
      .catch((error) => {
        console.log(error);
        let mensagem;
        switch (error.code) {
          case "auth/email-already-in-use":
            mensagem = "E-mail já cadastrado!";
            break;
          case "auth/weak-password":
            mensagem = "Senha deve ter pelo menos 6 dígitos!";
            break;
          case "auth/invalid-email":
            mensagem = "Endereço de e-mail inválido!";
            break;
          default:
            mensagem = "Algo deu errado... tente novamente!";
            break;
        }
        Alert.alert("Atenção!", mensagem);
      })
      .finally(() => setLoading(false));
  };

  return (
    <View style={estilos.container}>
      <View style={estilos.formulario}>
        <TextInput
          placeholder="Nome"
          style={estilos.input}
          onChangeText={(valor) => setNome(valor)}
        />

        <TextInput
          placeholder="E-mail"
          style={estilos.input}
          keyboardType="email-address"
          onChangeText={(valor) => setEmail(valor)}
        />
        <TextInput
          placeholder="Senha"
          style={estilos.input}
          secureTextEntry
          onChangeText={(valor) => setSenha(valor)}
        />
        <View style={estilos.botoes}>
          <Button
            disabled={loading}
            onPress={cadastrar}
            title="Cadastre-se"
            color="blue"
          />

          {loading && <ActivityIndicator size="large" color="blue" />}
        </View>
      </View>
    </View>
  );
};

export default Cadastro;

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightblue",
    alignItems: "center",
    justifyContent: "center",
  },
  formulario: {
    marginVertical: 16,
    width: "80%",
  },
  input: {
    backgroundColor: "white",
    marginVertical: 8,
    padding: 8,
    borderRadius: 4,
  },
  botoes: {
    marginVertical: 8,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
