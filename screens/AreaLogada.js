import {
  Button,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from "react-native";

import { auth } from "../firebaseConfig";
import { signOut } from "firebase/auth";
import { useState } from "react";

const AreaLogada = ({ navigation }) => {
  const [loading, setLoading] = useState(false);

  const logout = () => {
    setLoading(true);
    signOut(auth)
      .then(() => {
        navigation.replace("Inicial");
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setLoading(false));
  };

  return (
    <View style={estilos.container}>
      <View style={estilos.topo}>
        <Text style={estilos.bemVindo}>Bem-vindo(a)</Text>
        <Button
          disabled={loading}
          title="Logout"
          color="#D35400"
          onPress={logout}
        />
      </View>
      {loading && <ActivityIndicator size="large" color="blue" />}
      <View style={estilos.geral}>
        <Text>Você está na área logada.</Text>
      </View>
    </View>
  );
};

export default AreaLogada;

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FCF3CF",
    padding: 16,
  },
  topo: {
    marginVertical: 32,
  },
  bemVindo: {
    fontSize: 24,
    marginVertical: 16,
  },
});
