import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Alert,
  Pressable,
  Modal,
} from "react-native";
import { globalColors, globalStyles } from "../styles/global_styles";
import RequestForm from "./RequestForm";

export default function EditCard (props) {
  
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.card}>
      <Modal visible={modalVisible} animationType="slide">
        <Pressable onPress={() => setModalVisible(!modalVisible)}>
          <Text style={globalStyles.closeText}>Fermer sans enregistrer</Text>
        </Pressable>
        <RequestForm modify={true} title={props.title} id={props.id} >
          <Text style={globalStyles.titleText}>
            Formulez une nouvelle demande
          </Text>
        </RequestForm>
      </Modal>
      <View style={styles.cardIconContainer}>
        <Pressable
          style={styles.cardIcon}
          onPress={() => setModalVisible(true)
          }
        >
          <Text style={styles.cardIconText}>Éditer</Text>
        </Pressable>
        <Pressable
          style={styles.cardIcon}
          onPress={() =>
            Alert.alert(
              "Attention !",
              "Voulez-vous vraiment supprimer cette requête ?",
              [
                {
                  text: "Annuler",
                  style: "cancel",
                },
                {
                  text: "Je suis sûr de moi",
                  onPress: () => {
                    console.log("Suppresion demandée de la requête d'id " + props.id)
                  },
                },
              ]
            )
          }
        >
          <Text style={styles.cardIconText}>Supprimer</Text>
        </Pressable>
      </View>
      <View style={styles.cardContent}>{props.children}</View>
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
    borderWidth: 1,
    borderColor: "black",
  },
  cardIconText: {
    textAlign: "center",
  },
});
