import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
  Modal,
  ScrollView,
  TouchableHighlight
} from "react-native";
import { firestore } from "../components/firebaseconfig";
import { collection, doc, setDoc, writeBatch } from "firebase/firestore";
import axios from 'axios';
import Homestyle from "../styles/stylehome";
import { useNavigation } from "@react-navigation/native";


export default function Homepage() {
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [filterVisible, setFilterVisible] = useState(false);
  const [searchitems, setsearchitems] = useState(false);
  const [recipies, setrecipies] = useState([]);
  const [popular, setpopular] = useState([]);
  const [allrecipies, setallrecipies] = useState([]);
  const [searchtext, setsearchtext] = useState('');
  const [searchedrecipe, setsearchedrecipe] = useState(null);
  const navigation = useNavigation()
  const toggleFilterBox = () => setFilterVisible(!filterVisible);
  const togglesearchitems = () => setsearchitems(!searchitems);
  const fetchRecipes = async () => {
    try {
      const response = await axios.get('http://10.0.2.2:5000/recipes');
      setrecipies(response.data);
      await uploadRecipesToFirestore(response.data, "recipes");
    } catch (error) {
      console.error('Error fetching recipes:', error.response ? error.response.data : error.message);
    }
  };

  const fetchpopular = async () => {
    try {
      const response = await axios.get('http://10.0.2.2:5000/popular-recipes');
      setpopular(response.data);
      await uploadRecipesToFirestore(response.data, "popularRecipes");
    } catch (error) {
      console.error('Error fetching popular recipes:', error.response ? error.response.data : error.message);
    }
  };
  const uploadRecipesToFirestore = async (recipes, collectionName) => {
    if (!recipes || recipes.length === 0) return;
  
    const batch = writeBatch(firestore); 
    try {
      console.log(`Uploading ${recipes.length} recipes to Firestore collection: ${collectionName}`);
  
      recipes.forEach((recipe) => {
        const docRef = doc(firestore, collectionName, recipe.id || Math.random().toString(36).substring(7)); 
        batch.set(docRef, recipe);
      });
  
      await batch.commit(); 
      console.log(`${collectionName} uploaded successfully!`);
    } catch (error) {
      console.error(`Error uploading to Firestore:`, error);
    }
  };
  

  const allinone = () => {
    setallrecipies([...recipies, ...popular]);
  };

  useEffect(() => {
    
    fetchRecipes();
    fetchpopular();
    saveUserToFirestore();
    retrieveRecipesFromFirestore();
  }, []);

  useEffect(() => {
    allinone();
  }, [recipies, popular]);

  const saveUserToFirestore = async (uid, name, email) => {
    const userDocRef = doc(firestore, "userdetails", uid);
    await setDoc(userDocRef, { name, email });
  };

  const retrieveRecipesFromFirestore = async () => {
    try {
      const recipesSnapshot = await getDocs(collection(firestore, "recipes"));
      const popularSnapshot = await getDocs(collection(firestore, "popularRecipes"));
      const fetchedRecipes = recipesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      const fetchedPopularRecipes = popularSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setrecipies(fetchedRecipes);
      setpopular(fetchedPopularRecipes);
      console.log('Retrieved recipes from Firestore successfully!');
    } catch (error) {
      console.error('Error retrieving recipes from Firestore:', error);
    }
  };

  const addToCart = async (name, imgUrl, price) => {
    if (!name || !imgUrl || price === undefined || price === null) {
      console.error("Invalid data:", { name, imgUrl, price });
      return;
    }
  
    try {
      const cartDocRef = doc(collection(firestore, "cart")); 
      const cartItem = { 
        name: name.trim(), 
        imgUrl: imgUrl.trim(), 
        price: parseFloat(price) 
      };
  
      console.log("Adding to cart:", cartItem);
  
      await setDoc(cartDocRef, cartItem);
      console.log("Item added to cart successfully!");
    } catch (error) {
      console.error("Error adding item to cart:", error.message);
    }
  };
  
  const search = () => {
    if (searchtext.trim() !== '') {
      const filtered = allrecipies.filter(item => {
        const title = item.title ? item.title.toLowerCase() : '';
        const cusine = item.cusine ? item.cusine.toLowerCase() : '';
        const time = item.time ? item.time.toLowerCase() : '';
  
        return (
          title.includes(searchtext.toLowerCase()) ||
          cusine.includes(searchtext.toLowerCase()) ||
          time.includes(searchtext.toLowerCase())
        );
      });
  
      setFilteredRecipes(filtered);
      setsearchedrecipe(searchtext);
      setsearchtext('');
      togglesearchitems();
    } else {
      setFilteredRecipes([]); 
    }
  };

  const validsearch = ({ item }) => {
    let isinputvalid = false;
  
    const searchTerm = searchedrecipe ? searchedrecipe.toLowerCase() : '';
  
  
    const title = typeof item.title === 'string' ? item.title.toLowerCase() : '';
    const cusine = typeof item.cusine === 'string' ? item.cusine.toLowerCase() : '';
    const time = typeof item.time === 'string' ? item.time.toLowerCase() : '';
  
    if (
      title.includes(searchTerm) ||
      cusine.includes(searchTerm) ||
      time.includes(searchTerm)
    ) {
      isinputvalid = true;
    }
  
    if (isinputvalid) {
      return (
        <TouchableOpacity>
          <View style={Homestyle.searchedcontainer}>
            <View style={Homestyle.populartextcontainer}>
              <Text style={Homestyle.popularttxt1}>{item.title1}</Text>
              <View style={Homestyle.veg}>
                <Text style={Homestyle.popularttxt2}>{item.title}</Text>
                <Image style={Homestyle.vegimg} source={{ uri: item.type_url }} />
              </View>
              <View style={Homestyle.timecusinecontainer}>
                <Text style={Homestyle.timetype}>{item.price}</Text>
                <Image style={Homestyle.line} source={require("../asssets/line.png")} />
                <Text style={Homestyle.timetype}>{item.time}</Text>
              </View>

            </View>
            
            <Image style={Homestyle.popularimg} source={{ uri: item.photo_url }} />
            <TouchableOpacity onPress={() => addToCart(item.name, item.imgUrl, item.price)}>
                <Image style={Homestyle.cart2} source={require("../asssets/add.png")}/>
                </TouchableOpacity>
          </View>
        </TouchableOpacity>
      );
    }
  
    return null;
  };
  
  
  return (
    <View style={Homestyle.body}>
      <View style={Homestyle.headingbox}>
        <Text style={Homestyle.heading}>What would you</Text>
        <Text style={Homestyle.heading}>like to order?</Text>
      </View>

      <View style={Homestyle.searchbox}>
        <View style={Homestyle.search}>
          <TouchableOpacity onPress={toggleFilterBox}>
            <Image
              source={require("../asssets/filtericon.png")}
              style={Homestyle.searchicon}
            />
          </TouchableOpacity>
          <TextInput
            style={Homestyle.searchinput}
            value={searchtext}
            onChangeText={setsearchtext}
          />
        </View>
        <TouchableOpacity style={Homestyle.filterbox} onPress={search}>
          <Image
            source={require("../asssets/searchicon.png")}
            style={Homestyle.filtericon}
          />
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={false}
        visible={filterVisible}
        onRequestClose={toggleFilterBox}
      >
        <ScrollView style={Homestyle.filterscreen}>
          <View style={Homestyle.headingcontainer}>
            <TouchableOpacity onPress={toggleFilterBox}>
              <Image
                source={require("../asssets/backicon.png")}
                style={Homestyle.backiconpref}
              />
            </TouchableOpacity>
            <Text style={Homestyle.preferences}>Preferences</Text>
          </View>

          <View style={Homestyle.preferencecontainer}>
            <Text style={Homestyle.time}>Time</Text>
            <FlatList
              data={[
                { id: "1", label: "Under 15 minutes" },
                { id: "2", label: "Under 30 minutes" },
                { id: "3", label: "Under 1 hour" },
              ]}
              numColumns={2}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={Homestyle.timecontainer}>
                  <Text style={Homestyle.timetext}>{item.label}</Text>
                </View>
              )}
            />

            <Text style={Homestyle.Cuisine}>Cuisine</Text>
            <FlatList
              data={[
                { id: "1", label: "Indian" },
                { id: "2", label: "Italian" },
                { id: "3", label: "American" },
                { id: "4", label: "Japanese" },
                { id: "5", label: "French" },
                { id: "6", label: "Chinese" },
                { id: "7", label: "Thai" },
              ]}
              numColumns={4}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={Homestyle.Cusinecontainer}>
                  <Text style={Homestyle.timetext}>{item.label}</Text>
                </View>
              )}
            />

            <Text style={Homestyle.Cuisine}>Meal Type</Text>
            <FlatList
              data={[
                { id: "1", label: "Desert" },
                { id: "2", label: "Snack" },
                { id: "3", label: "Breakfast" },
                { id: "4", label: "Dinner" },
                { id: "5", label: "Lunch" },
                { id: "6", label: "Salad" },
                { id: "7", label: "Soup" },
              ]}
              numColumns={4}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={Homestyle.Cusinecontainer}>
                  <Text style={Homestyle.timetext}>{item.label}</Text>
                </View>
              )}
            />

            <View style={Homestyle.applyclear}>
              <TouchableHighlight style={Homestyle.buttonapply}>
                <Text style={Homestyle.buttontext}>Apply filters</Text>
              </TouchableHighlight>
              <TouchableHighlight style={Homestyle.buttonclear}>
                <Text style={Homestyle.buttontext}>Clear all</Text>
              </TouchableHighlight>
            </View>
          </View>
        </ScrollView>
      </Modal>

      <Modal
  animationType="slide"
  transparent={false}
  visible={searchitems}
  onRequestClose={togglesearchitems}
>
  <ScrollView style={Homestyle.filterscreen}>
    <View style={Homestyle.headingcontainer}>
      <TouchableOpacity onPress={togglesearchitems}>
        <Image
          source={require("../asssets/backicon.png")}
          style={Homestyle.backiconpref}
        />
      </TouchableOpacity>
      <Text style={Homestyle.searchresults}>Search Results</Text>
    </View>

    {filteredRecipes.length > 0 ? (
      <FlatList
        data={filteredRecipes} 
        renderItem={validsearch}
        keyExtractor={(item) => item.id}
        horizontal={false}
        contentContainerStyle={{ paddingBottom: 30 }}
      />
    ) : (
      <Text style={Homestyle.noResultsText}>No results found for "{searchedrecipe}"</Text>
    )}
  </ScrollView>
</Modal>


      <ScrollView style={{ marginTop: 27 }}>
        <View style={Homestyle.Newdishesbox}>
          <Text style={Homestyle.Newdishestext}>New dishes</Text>
        </View>

        <FlatList
          style={Homestyle.flatlist}
          data={recipies}
          renderItem={({ item }) => (
            <TouchableOpacity>
              <View style={Homestyle.Newdishescontainer}>
              <TouchableOpacity onPress={() => addToCart(item.title, item.photo_url, item.price)}>
                <Image style={Homestyle.cart} source={require("../asssets/add.png")}/>
                </TouchableOpacity>
                <Image style={Homestyle.newdishesimg} source={{ uri: item.photo_url }} />
                <Text style={Homestyle.newdishestxt}>{item.title}</Text>
                <Text style={Homestyle.price}>₹{item.price}</Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
          horizontal={true}
          contentContainerStyle={{ paddingBottom: 30 }}
        />

        <View style={Homestyle.popularbox}>
          <Text style={Homestyle.populartext}>Popular</Text>
        </View>

        <FlatList
          data={popular}
          renderItem={({ item }) => (
            <TouchableOpacity>
              <View style={Homestyle.popularcontainer}>
                <View style={Homestyle.populartextcontainer}>
                  <Text style={Homestyle.popularttxt1}>{item.title1}</Text>
                  <View style={Homestyle.veg}>
                    <Text style={Homestyle.popularttxt2}>{item.title}</Text>
                    <Image style={Homestyle.vegimg} source={{ uri: item.type_url }} />
                  </View>
                  <View style={Homestyle.timecusinecontainer}>
                  <Text style={Homestyle.timetype}>₹{item.price}</Text> 
                    <Image style={Homestyle.line} source={require("../asssets/line.png")} />
                    <Text style={Homestyle.timetype}>{item.time}</Text>
                  </View>
                </View>
                
                <Image style={Homestyle.popularimg} source={{ uri: item.photo_url }} />
                <TouchableOpacity onPress={() => addToCart(item.title, item.photo_url, item.price)}>
                <Image style={Homestyle.cart2} source={require("../asssets/add.png")}/>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
          horizontal={true}
          contentContainerStyle={{ paddingBottom: 30 }}
        />
      </ScrollView>
      <View style={Homestyle.cookcreatebox}>
        <View style={Homestyle.cookbox}>
          <TouchableOpacity>
            <Text style={Homestyle.cooktext}>food</Text>
          </TouchableOpacity>
          <Image
            style={Homestyle.active}
            source={require("../asssets/active.png")}
          />
        </View>
        <View style={Homestyle.cookbox}>
          <TouchableOpacity onPress={() => navigation.navigate("cart")}>
            <Text style={Homestyle.createtext}>cart</Text>
          </TouchableOpacity>
          <Image
            style={Homestyle.deactive}
            source={require("../asssets/deactive.png")}
          />
        </View>
      </View>
    </View>
  );
}
