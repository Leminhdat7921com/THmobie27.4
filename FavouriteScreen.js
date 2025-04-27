import React, { useState } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/Feather'; // dùng Feather cho icon mũi tên

const favouriteData = [
  { id: '1', name: 'Sprite Can', quantity: '325ml, Price', price: 1.50, image: require('./assets/sprite.png') },
  { id: '2', name: 'Diet Coke', quantity: '355ml, Price', price: 1.99, image: require('./assets/diet_coke.png') },
  { id: '3', name: 'Apple & Grape Juice', quantity: '2L, Price', price: 15.50, image: require('./assets/juice.png') },
  { id: '4', name: 'Coca Cola Can', quantity: '325ml, Price', price: 4.99, image: require('./assets/coke.png') },
  { id: '5', name: 'Pepsi Can', quantity: '330ml, Price', price: 4.99, image: require('./assets/pepsi.png') },
];

export default function FavouriteScreen() {
  const [favourites, setFavourites] = useState(favouriteData);

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={item.image} style={styles.image} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemQuantity}>{item.quantity}</Text>
      </View>
      <View style={styles.priceContainer}>
        <Text style={styles.priceText}>${item.price.toFixed(2)}</Text>
        <Icon name="chevron-right" size={22} color="gray" />
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Favourite</Text>
      <FlatList
        data={favourites}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 120 }}
      />
      <View style={styles.addAllContainer}>
        <TouchableOpacity style={styles.addAllButton}>
          <Text style={styles.addAllText}>Add All To Cart</Text>
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
    marginTop: 5,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  priceText: {
    fontSize: 16,
    fontWeight: '600',
  },
  addAllContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  addAllButton: {
    backgroundColor: '#53B175',
    borderRadius: 18,
    paddingVertical: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addAllText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
