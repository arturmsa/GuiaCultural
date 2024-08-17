import React, { useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import { EventContext } from "./EventContext";

export default function Home() {
  const router = useRouter();
  const { events } = useContext(EventContext);

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: "#f5f5f5" }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TextInput
          placeholder="Pesquisar"
          style={{
            flex: 1,
            height: 40,
            borderColor: "#ccc",
            borderWidth: 1,
            borderRadius: 8,
            paddingHorizontal: 8,
          }}
        />
        <TouchableOpacity
          style={{ marginLeft: 10 }}
          onPress={() => router.push("/profile")}
        >
          <View
            style={{
              width: 40,
              height: 40,
              backgroundColor: "#000",
              borderRadius: 20,
            }}
          />
        </TouchableOpacity>
      </View>

      <ScrollView style={{ marginTop: 16 }}>
        <Text>Eventos Criados</Text>
        <View style={{ marginTop: 8 }}>
          {events.length > 0 ? (
            events.map((event, index) => (
              <View key={index} style={styles.eventCard}>
                {event.image && (
                  <Image
                    source={{ uri: event.image }}
                    style={styles.eventImage}
                  />
                )}
                <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                  {event.name}
                </Text>
                <Text>Tipos: {event.types.join(", ")}</Text>
                <Text>Local: {event.location}</Text>
                <Text>Descrição: {event.description}</Text>
                <Text style={{ marginTop: 8, fontStyle: "italic" }}>
                  Criado por: {event.creator}
                </Text>
              </View>
            ))
          ) : (
            <Text>Nenhum evento criado ainda.</Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  eventCard: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderColor: "#ddd",
    borderWidth: 1,
  },
  eventImage: {
    width: 100, // Tamanho menor para a visualização na Home
    height: 100,
    borderRadius: 8,
    marginBottom: 8,
    resizeMode: "cover",
  },
});
