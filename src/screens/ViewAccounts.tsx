// do a home page for the user to view their accounts

import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {NavigationProp} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import {storage} from '../../App';

type Props = {
  navigation: NavigationProp<any>;
};

const ViewAccounts: React.FC<Props> = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      // affiche users de storage
      <Text>{storage.getString('users')}</Text>
      <Text>View Accounts</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ViewAccounts;
// Path: src/screens/ViewAccounts.tsx
