import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
} from "react-native";
import { EventContext } from "./EventContext";
import { UserContext } from "./UserContext";
import * as ImagePicker from "expo-image-picker";

export default function Explore() {
  const { events, setEvents } = useContext(EventContext);
  const { userProfile } = useContext(UserContext);

  const [eventName, setEventName] = useState("");
  const [eventType, setEventType] = useState([]);
  const [eventLocation, setEventLocation] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventImage, setEventImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const eventTypes = [
    "Música",
    "Dança",
    "Familiar",
    "Educativo",
    "Tecnologia",
    "Esporte",
    "Arte",
    "Teatro",
  ];

  const toggleEventType = (type) => {
    if (eventType.includes(type)) {
      setEventType(eventType.filter((t) => t !== type));
    } else {
      setEventType([...eventType, type]);
    }
  };

  const pickEventImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1], // Proporção 1:1 para quadrado
      quality: 1,
    });

    if (!result.canceled) {
      setEventImage(result.assets[0].uri); // Salva o URI da imagem selecionada
    }
  };

  const createEvent = () => {
    if (!userProfile) {
      setErrorMessage("Você precisa estar logado para criar um evento.");
      return;
    }

    if (
      eventName.trim() &&
      eventLocation.trim() &&
      eventDescription.trim() &&
      eventType.length > 0 &&
      eventImage
    ) {
      const newEvent = {
        name: eventName,
        types: eventType,
        location: eventLocation,
        description: eventDescription,
        creator: userProfile.name,
        image: eventImage, // Adiciona a imagem ao evento
      };
      setEvents([...events, newEvent]);
      setEventName("");
      setEventType([]);
      setEventLocation("");
      setEventDescription("");
      setEventImage(null);
      setErrorMessage(""); // Limpa a mensagem de erro após a criação bem-sucedida
    } else {
      setErrorMessage("Preencha todos os campos e selecione uma imagem.");
    }
  };

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: "#f5f5f5" }}>
      <ScrollView>
        <TouchableOpacity
          onPress={pickEventImage}
          style={styles.imagePickerButton}
        >
          <Text style={{ color: "#fff" }}>Selecionar Imagem do Evento</Text>
        </TouchableOpacity>

        {eventImage && (
          <Image
            source={{ uri: eventImage }}
            style={styles.eventImagePreview}
          />
        )}

        <Text style={styles.label}>Nome do Evento</Text>
        <TextInput
          value={eventName}
          onChangeText={setEventName}
          placeholder="Nome do Evento"
          style={styles.input}
        />

        <Text style={styles.label}>Tipo do Evento</Text>
        <View style={styles.eventTypesContainer}>
          {eventTypes.map((type, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => toggleEventType(type)}
              style={[
                styles.eventTypeButton,
                eventType.includes(type) && styles.eventTypeButtonSelected,
              ]}
            >
              <Text
                style={[
                  styles.eventTypeText,
                  eventType.includes(type) && styles.eventTypeTextSelected,
                ]}
              >
                {type}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Local do Evento</Text>
        <TextInput
          value={eventLocation}
          onChangeText={setEventLocation}
          placeholder="Local do Evento"
          style={styles.input}
        />

        <Text style={styles.label}>Descrição do Evento</Text>
        <TextInput
          value={eventDescription}
          onChangeText={setEventDescription}
          placeholder="Descrição do Evento"
          multiline={true}
          style={[styles.input, { height: 100 }]}
        />

        {errorMessage ? (
          <Text style={styles.errorMessage}>{errorMessage}</Text>
        ) : null}

        <TouchableOpacity onPress={createEvent} style={styles.createButton}>
          <Text style={{ color: "#fff" }}>Criar Evento</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  eventTypesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 16,
  },
  eventTypeButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    marginRight: 8,
    marginBottom: 8,
  },
  eventTypeButtonSelected: {
    backgroundColor: "#ff8c00",
    borderColor: "#ff8c00",
  },
  eventTypeText: {
    color: "#000",
  },
  eventTypeTextSelected: {
    color: "#fff",
  },
  imagePickerButton: {
    backgroundColor: "#007BFF",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 16,
  },
  eventImagePreview: {
    width: 150, // Tamanho da imagem quadrada similar ao perfil
    height: 150,
    borderRadius: 8,
    marginBottom: 16,
    resizeMode: "cover", // Mantém a proporção da imagem
  },
  createButton: {
    backgroundColor: "#007BFF",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  errorMessage: {
    color: "red",
    marginBottom: 16,
    textAlign: "center",
  },
});
