import React, { useState } from "react";
import { StyleSheet, View, TextInput, Text, Button } from "react-native";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { globalColors } from "../globals/globalStyles";
import { Formik } from "formik";

export default function RequestForm(props) {
  const dateToday = new Date();

  function onFormSubmit(values) {
  }

  const [show, setShow] = useState(false);

  const showDatepicker = () => {
    setShow(true);
  };

  return (
    <View style={styles.form}>
      
     <View style={styles.formTitle}>
        { props.children }
    </View>

      <Formik
        initialValues={{
          subject: "",
          author: "Colonel Moutarde",
          title: "",
          comment: "",
          file_number: "",
          file1_title: "",
          file2_title: "",
          file3_title: "",
          creation_date: dateToday,
          deadline: dateToday,
          delivery_date: dateToday,
          expiration_date: dateToday,
          hidden: "",
          state: "pending",
          id: "",
          file1: "",
        }}
        onSubmit={values => {
          onFormSubmit(values)
        }}
      >
        {({handleChange, handleBlur, handleSubmit, values}) => (
          <View>

            <View style={styles.formField}>
              <Text>Nombre de fichiers </Text>
              <TextInput
                value={values.file_number}
                keyboardType="numeric"
                placeholder="Entre 1 et 10"
                onChangeText={handleChange("file_number")}
              ></TextInput>
            </View>
            
            <View style={styles.formField}>
              <Text>Matière </Text>
              <TextInput
                value={values.subject}
                placeholder="Mathématiques/Electro-technique/..."
                onChangeText={handleChange("subject")}
              >   
              </TextInput>
            </View>
            
            <View style={styles.formField}>
              <Text>Commentaire</Text>
              <TextInput
                value={values.comment}
                placeholder="Mathématiques/Electro-technique/..."
                onChangeText={handleChange("comment")}
              >   
              </TextInput>
            </View>

            <View style={styles.formField}>
              <Text>Nom du premier fichier </Text>
              <TextInput
                value={values.file1_title}
                placeholder="Chapitre 2/TD 8&9/..."
                onChangeText={handleChange("file1_title")}
              >
              </TextInput>
            </View>

            <View style={styles.formField}>
              <Text>Nom du deuxième fichier </Text>
              <TextInput
                value={values.file2_title}
                placeholder="Chapitre 2/TD 8&9/..."
                onChangeText={handleChange("file2_title")}
              >
              </TextInput>
            </View>

            <View style={styles.formField}>
              <Text>Nom du troisième fichier </Text>
              <TextInput
                value={values.file3_title}
                placeholder="Chapitre 2/TD 8&9/..."
                onChangeText={handleChange("file3_title")}
              >
              </TextInput>
            </View>

            {/* <View style={styles.formField}>
              <Text>Premier fichier </Text>
              <FilePickerManager
                value={values.file1}
                onChangeText={handleChange("file1")}
              >
              </FilePickerManager>
            </View> */}
            <Button
              title="Proposer ce.s fichier.s"
              onPress = {()=> {props.handleSubmit}}/>

            {/* <View>
              <Button onPress={showDatepicker} title="Show date picker!" />
            </View>

            <View style={styles.formField}>
              <Text>Date d'impression souhaitée</Text>
              {show && (<RNDateTimePicker value={values.deadline} mode="date" 
              minimumDate={dateToday}
              onChange={(event, date)=>handleChange('deadline')}/>)}
              <TextInput
                value={values.deadline}
                placeholder={dateToday.toDateString}
                onChangeText={handleChange("deadline")}
              ></TextInput>
            </View> */}
            
            <Button
              title="Proposer ces fichiers"
              color={globalColors.primary} 
              onPress={() => {
                handleSubmit;
              }}
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
  formTitle : {
    fontSize: 50,
  },
  formField: {
    marginHorizontal: 18,
    marginVertical: 10,
  },
});
