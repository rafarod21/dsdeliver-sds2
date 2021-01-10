import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Alert, Settings } from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';

import Header from '../Header';
import OrderCard from '../OrderCard';

import { Order } from '../types';

import { fetchOrders } from '../api';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

export default function Orders() {
  const navigation = useNavigation();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const isFocused = useIsFocused();

  const fetchData = () => {
    setIsLoading(true);
    fetchOrders()
      .then(response => setOrders(response.data))
      .catch(error => Alert.alert('Houve um erro ao buscar os pedidos!'))
      .finally(() => setIsLoading(false));
  }
  
  const handleOnPress = (order: Order) => {
    navigation.navigate('OrderDetails', {
      order
    });
  }

  useEffect(() => {
    if(isFocused) {
      fetchData();
    }
  }, [isFocused]);

  return (
    <>
      <Header />
      <ScrollView style={styles.container}>
        {isLoading ? (
          <Text>Buscando pedidos...</Text>
        ) : (
            orders.map(order => (
              <TouchableWithoutFeedback
                key={order.id}
                onPress={() => handleOnPress(order)}
              >
                <OrderCard order={order} />
              </TouchableWithoutFeedback>
            ))
          )}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: '5%',
  },
});
