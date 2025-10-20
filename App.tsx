import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, Pressable, SafeAreaView, Image, ImageBackground, TextInput, FlatList, Animated } from 'react-native';


interface MenuItem {
  name: string;
  description: string;
  category: string;
  price: string;
}

export default function App() {
  const [mealName, setMealName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [category, setCategory] = useState<string>('Starter');
  const [price, setPrice] = useState<string>('');
  const [meals, setMeals] = useState<MenuItem[]>([]);
  const [validationMessage, setValidationMessage] = useState<string | null>(null);

  const handleAddMeal = () => {
    // validation
    if (!mealName.trim()) {
      setValidationMessage('Please enter a dish name.');
      return;
    }
    const numPrice = parseFloat(price);
    if (Number.isNaN(numPrice) || numPrice <= 0) {
      setValidationMessage('Please enter a valid price greater than 0.');
      return;
    }
    if (!category) {
      setValidationMessage('Please select a course.');
      return;
    }

    // passed validation
    setValidationMessage(null);
    setMeals([
      ...meals,
      { name: mealName.trim(), description: description.trim(), category, price: numPrice.toFixed(2) }
    ]);
    setMealName('');
    setDescription('');
    setCategory('Starter');
    setPrice('');
  };

  const scaleAnim = useRef(new Animated.Value(1)).current;

  const onPressIn = () => {
    Animated.spring(scaleAnim, { toValue: 0.92, useNativeDriver: true, friction: 3 }).start();
  };

  const onPressOut = () => {
    Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true, friction: 3 }).start();
  };

  return (
    <ImageBackground source={require("./assets/Resturant Pic.jpg")} style={{flex: 1}}>
      <SafeAreaView style={{flex: 1, padding: 16, backgroundColor: 'rgba(255, 255, 255, 0.95)'}}>
        <View style={{marginBottom:12}}>
          <Text style={{fontSize: 28, fontWeight: 'bold', marginBottom: 8, color: '#000000ff', letterSpacing: 1}}>
            Menu Manager App
          </Text>
          <Text style={{color: '#b0c4de', fontSize: 16}}>Select your preferred course/meal</Text>
        </View>
        {/* Add meal form */}
        <View style={{marginBottom: 12}}>
          <Text style={{color: '#0f0d0dff'}}>Meal Name:</Text>
          <TextInput
            value={mealName}
            onChangeText={setMealName}
            placeholder="Enter meal name"
            placeholderTextColor="#b0c4de"
            style={{backgroundColor: '#fff', color: '#0a1e50', borderWidth: 1, borderColor: '#1e3a8a', borderRadius: 6, marginBottom: 8, padding: 8}}
          />
          <Text style={{color: '#060505ff'}}>Description:</Text>
          <TextInput
            value={description}
            onChangeText={setDescription}
            placeholder="Enter description"
            placeholderTextColor="#b0c4de"
            style={{backgroundColor: '#fff', color: '#0a1e50', borderWidth: 1, borderColor: '#1e3a8a', borderRadius: 6, marginBottom: 8, padding: 8}}
          />
          <Text style={{color: '#fff', marginBottom: 4}}>Course:</Text>
          <View style={{flexDirection: 'row', marginBottom: 12}}>
            {['Starter', 'Main', 'Dessert'].map((course) => (
              <Pressable
                key={course}
                onPress={() => setCategory(course)}
                style={{
                  backgroundColor: category === course ? '#1e3a8a' : '#fff',
                  borderColor: '#1e3a8a',
                  borderWidth: 1,
                  borderRadius: 20,
                  paddingVertical: 6,
                  paddingHorizontal: 16,
                  marginRight: 8,
                }}
              >
                <Text style={{color: category === course ? '#fff' : '#1e3a8a', fontWeight: 'bold'}}>{course}</Text>
              </Pressable>
            ))}
          </View>
          <Text style={{color: '#fff'}}>Price:</Text>
          <TextInput
            value={price}
            onChangeText={setPrice}
            placeholder="Enter price"
            placeholderTextColor="#b0c4de"
            keyboardType="numeric"
            style={{backgroundColor: '#fff', color: '#0a1e50', borderWidth: 1, borderColor: '#1e3a8a', borderRadius: 6, marginBottom: 8, padding: 8}}
          />
        </View>
        <Animated.View style={{transform: [{ scale: scaleAnim }], marginBottom: 12}}>
          <Pressable
            style={{backgroundColor: '#1e3a8a', padding: 12, borderRadius: 8, alignItems: 'center'}}
            onPress={handleAddMeal}
            onPressIn={onPressIn}
            onPressOut={onPressOut}
          >
            <Text style={{color: '#fff', fontSize: 16, fontWeight: 'bold'}}>Add Meal</Text>
          </Pressable>
        </Animated.View>
        {validationMessage ? (
          <Text style={{color: '#ff4d4f', marginBottom: 8}}>{validationMessage}</Text>
        ) : null}
        <Text style={{color: '#fff', fontSize: 16, marginBottom: 8}}>Total items: {meals.length}</Text>
        <View style={{marginBottom: 8}}>
          <Text style={{fontWeight: 'bold', color: '#fff'}}>Menu List</Text>
        </View>
        <FlatList
          data={meals}
          keyExtractor={(_, idx) => idx.toString()}
          renderItem={({ item }) => (
            <View style={{backgroundColor: '#fff', borderWidth: 1, borderColor: '#1e3a8a', borderRadius: 6, padding: 12, marginBottom: 8}}>
              <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6}}>
                <Text style={{fontWeight: 'bold', color: '#0a1e50', fontSize: 16}}>{item.name}</Text>
                <Text style={{fontWeight: '700', color: '#0a1e50'}}>{item.price}</Text>
              </View>
              <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={{color: '#0a1e50'}}>{item.description}</Text>
                <Text style={{color: '#0a1e50', fontStyle: 'italic'}}>{item.category}</Text>
              </View>
            </View>
          )}
          ListEmptyComponent={<Text style={{color: '#b0c4de'}}>No meals added yet.</Text>}
        />
      </SafeAreaView>
    </ImageBackground>
  );
}
