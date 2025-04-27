import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/Feather'; // Dùng Feather icon

const cartData = [
  { id: '1', name: 'Bell Pepper Red', quantity: '1kg, Price', price: 4.99, image: require('./assets/bell_pepper.png') },
  { id: '2', name: 'Egg Chicken Red', quantity: '4pcs, Price', price: 1.99, image: require('./assets/egg.png') },
  { id: '3', name: 'Organic Bananas', quantity: '12kg, Price', price: 3.00, image: require('./assets/banana.png') },
  { id: '4', name: 'Ginger', quantity: '250gm, Price', price: 2.99, image: require('./assets/ginger.png') },
];

export default function CartScreen() {
  const [cartItems, setCartItems] = useState(cartData);

  const increment = (id) => {
    const updated = cartItems.map(item => item.id === id ? { ...item, quantityCount: (item.quantityCount || 1) + 1 } : item);
    setCartItems(updated);
  };

  const decrement = (id) => {
    const updated = cartItems.map(item => {
      if (item.id === id && (item.quantityCount || 1) > 1) {
        return { ...item, quantityCount: (item.quantityCount || 1) - 1 };
      }
      return item;
    });
    setCartItems(updated);
  };

  const removeItem = (id) => {
    const updated = cartItems.filter(item => item.id !== id);
    setCartItems(updated);
  };

  const getTotal = () => {
    return cartItems.reduce((sum, item) => sum + (item.price * (item.quantityCount || 1)), 0).toFixed(2);
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={item.image} style={styles.image} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemQuantity}>{item.quantity}</Text>
        <View style={styles.counter}>
          <TouchableOpacity onPress={() => decrement(item.id)}>
            <Icon name="minus" size={20} color="#53B175" />
          </TouchableOpacity>
          <Text style={styles.countText}>{item.quantityCount || 1}</Text>
          <TouchableOpacity onPress={() => increment(item.id)}>
            <Icon name="plus" size={20} color="#53B175" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.priceContainer}>
        <TouchableOpacity onPress={() => removeItem(item.id)}>
          <Icon name="x" size={20} color="gray" />
        </TouchableOpacity>
        <Text style={styles.priceText}>${item.price.toFixed(2)}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>My Cart</Text>
      <FlatList
        data={cartItems}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 120 }}
      />
      <View style={styles.checkoutContainer}>
        <TouchableOpacity style={styles.checkoutButton}>
          <Text style={styles.checkoutText}>Go to Checkout</Text>
          <Text style={styles.checkoutPrice}>${getTotal()}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },
  image: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  itemDetails: {
    flex: 1,
    marginLeft: 15,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
  },
  itemQuantity: {
    fontSize: 14,
    color: 'gray',
    marginVertical: 5,
  },
  counter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  countText: {
    fontSize: 16,
    fontWeight: '600',
    marginHorizontal: 10,
  },
  priceContainer: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 60,
  },
  priceText: {
    fontSize: 16,
    fontWeight: '600',
  },
  checkoutContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  checkoutButton: {
    backgroundColor: '#53B175',
    borderRadius: 18,
    paddingVertical: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  checkoutText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  checkoutPrice: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
