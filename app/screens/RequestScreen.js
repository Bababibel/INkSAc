import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { globalStyles, globalColors } from "../assets/styles/global_styles";
import Card from "../assets/shared/RequestCard";

export default function RequestScreen({ navigation }) {
  return (
    <View style={globalStyles.container}>
      <TouchableOpacity>
        <Card>
          <Text style={globalStyles.titleText}>Formulez une nouvelle demande</Text>
        </Card>
      </TouchableOpacity>
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
