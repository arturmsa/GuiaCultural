import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { UserContext } from "./UserContext";

export default function Profile() {
  const { userProfile, setUserProfile } = useContext(UserContext);
  const [isEditing, setIsEditing] = useState(!userProfile);
  const [name, setName] = useState(userProfile?.name || "");
  const [email, setEmail] = useState(userProfile?.email || "");
  const [nickname, setNickname] = useState(userProfile?.nickname || "");
  const [image, setImage] = useState(userProfile?.image || null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri); // Acessa o URI da imagem selecionada corretamente
    }
  };

  const saveProfile = () => {
    setUserProfile({
      name,
      email,
      nickname,
      image,
    });
    setIsEditing(false);
  };

  const logOut = () => {
    setUserProfile(null);
    setIsEditing(true);
    setName("");
    setEmail("");
    setNickname("");
    setImage(null);
  };

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: "#f5f5f5" }}>
      {isEditing ? (
        <View>
          <TouchableOpacity onPress={pickImage}>
            <View style={styles.imagePicker}>
              {image ? (
                <Image source={{ uri: image }} style={styles.image} />
              ) : (
                <Text style={styles.imagePlaceholder}>Escolha uma imagem</Text>
              )}
            </View>
          </TouchableOpacity>

          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Nome"
            style={styles.input}
          />
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            keyboardType="email-address"
            style={styles.input}
          />
          <TextInput
            value={nickname}
            onChangeText={setNickname}
            placeholder="Apelido"
            style={styles.input}
          />

          <TouchableOpacity onPress={saveProfile} style={styles.saveButton}>
            <Text style={{ color: "#fff" }}>Salvar Perfil</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={{ alignItems: "center" }}>
          {userProfile?.image && (
            <Image
              source={{ uri: userProfile.image }}
              style={styles.imageProfile}
            />
          )}
          <Text style={styles.name}>{userProfile?.name}</Text>
          <Text style={styles.nickname}>{userProfile?.nickname}</Text>
          <Text style={styles.email}>{userProfile?.email}</Text>

          <View style={{ marginTop: 32, width: "100%" }}>
            <TouchableOpacity style={styles.menuItem}>
              <Text>Histórico de Pedidos</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Text>Endereço de Envio</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Text>Criar Solicitação</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Text>Política de Privacidade</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Text>Configurações</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={logOut} style={styles.menuItem}>
              <Text style={{ color: "red" }}>Sair</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  imagePicker: {
    height: 150,
    width: 150,
    backgroundColor: "#e1e1e1",
    borderRadius: 75,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 16,
  },
  image: {
    height: 150,
    width: 150,
    borderRadius: 75,
  },
  imagePlaceholder: {
    color: "#888",
    textAlign: "center",
  },
  saveButton: {
    backgroundColor: "#007BFF",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  imageProfile: {
    height: 120,
    width: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
  },
  nickname: {
    fontSize: 16,
    color: "#666",
    marginBottom: 8,
  },
  email: {
    fontSize: 14,
    color: "#999",
  },
  menuItem: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
