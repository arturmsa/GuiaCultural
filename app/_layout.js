import React from "react";
import { View, Text } from "react-native";
import { Tabs } from "expo-router";
import { UserProvider } from "./UserContext";
import { EventProvider } from "./EventContext"; // Certifique-se de que o EventProvider está importado

export default function Layout() {
  return (
    <UserProvider>
      <EventProvider>
        <Tabs>
          <Tabs.Screen
            name="index"
            options={{
              title: "Home",
              tabBarIcon: ({ color, size }) => (
                <View
                  style={{
                    width: size,
                    height: size,
                    backgroundColor: color,
                    borderRadius: size / 2,
                  }}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="explore"
            options={{
              title: "Explorar Eventos",
              tabBarIcon: ({ color, size }) => (
                <View
                  style={{
                    width: size,
                    height: size,
                    backgroundColor: color,
                    borderRadius: size / 2,
                  }}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="channels"
            options={{
              title: "Canais",
              tabBarIcon: ({ color, size }) => (
                <View
                  style={{
                    width: size,
                    height: size,
                    backgroundColor: color,
                    borderRadius: size / 2,
                  }}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="blog"
            options={{
              title: "Blog",
              tabBarIcon: ({ color, size }) => (
                <View
                  style={{
                    width: size,
                    height: size,
                    backgroundColor: color,
                    borderRadius: size / 2,
                  }}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="profile"
            options={{
              title: "Perfil",
              tabBarIcon: ({ color, size }) => (
                <View
                  style={{
                    width: size,
                    height: size,
                    backgroundColor: color,
                    borderRadius: size / 2,
                  }}
                />
              ),
            }}
          />
        </Tabs>
      </EventProvider>
    </UserProvider>
  );
}
