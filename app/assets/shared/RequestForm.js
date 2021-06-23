import React from "react";
import { StyleSheet, View, TextInput, Text, Button } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { globalColors } from "../styles/global_styles";
import { Formik } from "formik";

export default function RequestForm(props) {
  const date = new Date();

  function onFormSubmit(values) {
    console.log(values);
  }

  return (
    <View style={styles.form}>
      {/* <View style={styles.formField}>
                { props.children }
            </View> */}

      <Formik
        initialValues={{ file_number: "", subject: "", file1_name: "", file2_name: "", file3_name: "", print_date: date}}
        onSubmit={(values) => console.log(values)}
      >
        {(props) => (
          <View>
            <View style={styles.formField}>
              <Text>Nombre de fichiers</Text>
              <TextInput
              value={props.values.file_number}
                keyboardType="numeric"
                placeholder="Entre 1 et 10"
                onChangeText={props.handleChange('file_number')}
              ></TextInput>
            </View>

            <View style={styles.formField}>
              <Text>Matière</Text>
              <TextInput 
              value = {props.values.subject}
              placeholder="Mathématiques/Electro-technique"
              onChangeText={props.handleChange('subject')}></TextInput>
            </View>

            <View style={styles.formField}>
              <Text>Nom du premier fichier</Text>
              <TextInput value={props.values.file1_name}
              placeholder="Chapitre 2/TD 8&9/..."
              onChangeText={props.handleChange('file1_name')}></TextInput>
            </View>

            <View style={styles.formField}>
              <Text>Nom du deuxième fichier</Text>
              <TextInput 
              value={props.values.file2_name}
              placeholder="Chapitre 2/TD 8&9/..."
              onChangeText={props.handleChange('file2_name')}></TextInput>
            </View>

            <View style={styles.formField}>
              <Text>Nom du troisième fichier</Text>
              <TextInput 
              value={props.values.file3_name}
              placeholder="Chapitre 2/TD 8&9/..."
              onChangeText={props.handleChange('file3_name')}></TextInput>
            </View>

            {/* <View style={styles.formField}>
              <Text>Date d'impression souhaitée</Text>
              <DateTimePicker value={props.values.print_date} mode="date" 
              onChangeText={props.handleChange('print_date')}/>
            </View> */}
            <form action="/inksac/api/upload.php" method="post" enctype="multipart/form-data">
              Select image to upload:
              <input type="file" name="fileToUpload" id="fileToUpload"/> 
              <input type="submit" value="Upload Image" name="submit"/>
            </form>
            <Button
              title="Proposer ce.s fichier.s"
              onPress = {()=> {props.handleSubmit}

                }
            />
          </View>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    borderRadius: 6,
    elevation: 5,
    backgroundColor: globalColors.bg_primary,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: globalColors.bg_secondary,
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 4,
    marginVertical: 6,
  },
  formField: {
    marginHorizontal: 18,
    marginVertical: 10,
  },
});