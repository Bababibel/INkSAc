import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList, Modal } from "react-native";
import { globalStyles, globalColors } from "../assets/styles/global_styles";
import RequestForm from "../assets/shared/RequestForm";

export default function RequestScreen({ navigation }) {
  return (
    <View style={globalStyles.container}>
      <TouchableOpacity>
        <Card>
          <Text style={globalStyles.titleText} onPress={() => {setModalOpen(true)}}>Formulez une nouvelle demande</Text>
        </Card>
      </TouchableOpacity>
      <Modal visible={ModalOpen}>
        <Button onPress={() => setModalOpen(false)}></Button>
         <RequestForm>
            <Text style={globalStyles.titleText}>Formulez une nouvelle demande</Text>
         </RequestForm>
      </Modal>
      <TouchableOpacity>
        <Card>
          <Text style={globalStyles.titleText}>Modifiez une ancienne demande</Text>
        </Card>
      </TouchableOpacity>
      <TouchableOpacity>
        <Card>
          <Text style={globalStyles.titleText}>Supprimez une ancienne demande</Text>
        </Card>
      </TouchableOpacity>
    </View>
  );
}
