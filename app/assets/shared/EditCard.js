import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { globalColors } from "../styles/global_styles";

export default function EditCard(props, { navigation }) {
  return (
    <View style={styles.card}>
      <View style={styles.cardIconContainer}>
        <TouchableOpacity style={styles.cardIcon} onTouch={() => navigation.push("Login")}>
            <Text style={styles.cardIconText}>Éditer</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cardIcon} onTouch={() => navigation.push("Request")}>    
            <Text style={styles.cardIconText}>Supprimer</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cardContent}>
          {props.children}
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 6,
    elevation: 3,
    backgroundColor: globalColors.bg_primary,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: globalColors.bg_secondary,
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 4,
    marginVertical: 6,
  },
  cardContent: {
    marginHorizontal: 18,
    marginVertical: 10,
  },
  cardIconContainer: {
    flexDirection: "row",
    textAlign: "center",
  },
  cardIcon: {
    width: "50%",
    justifyContent: "center",
    textAlign: "center",
    borderWidth : 1,
    borderColor: 'black',
  },
  cardIconText: {
    textAlign: "center",
  },
});
