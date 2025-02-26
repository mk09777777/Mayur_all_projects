import React, { useEffect, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import CartStyle from "../styles/stylecart";
import { getDocs, collection, deleteDoc,addDoc, doc } from "firebase/firestore";
import { firestore } from "../components/firebaseconfig";
import { useNavigation } from "@react-navigation/native";

export default function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const tax = 10.0;
    const deliveryFee = 25.0;
    const [grandTotal, setGrandTotal] = useState(0);
    const navigation=useNavigation();
    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const cartSnapshot = await getDocs(collection(firestore, "cart"));
                const fetchedCartItems = cartSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setCartItems(fetchedCartItems);
                calculateTotal(fetchedCartItems);
            } catch (error) {
                console.error("Error fetching cart items:", error);
            }
        };

        fetchCartItems();
    }, []);

    const calculateTotal = (items) => {
        const total = items.reduce((sum, item) => sum + (item.price || 0), 0);
        setTotalPrice(total);
        setGrandTotal(total + tax + deliveryFee);
    };

    const removeFromCart = async (id) => {
        try {
            await deleteDoc(doc(firestore, "cart", id));
            const updatedCart = cartItems.filter(item => item.id !== id);
            setCartItems(updatedCart);
            calculateTotal(updatedCart);
        } catch (error) {
            console.error("Error removing item from cart:", error);
        }
    };
    const placeOrder = async () => {
        if (cartItems.length === 0) {
            alert("Your cart is empty!");
            return;
        }
    
        try {
            const orderData = {
                items: cartItems,
                totalAmount: grandTotal,
                timestamp: new Date(),
                status: "Pending", 
            };
    
           
            await addDoc(collection(firestore, "orders"), orderData);
    
       
            for (const item of cartItems) {
                await deleteDoc(doc(firestore, "cart", item.id));
            }
            
            setCartItems([]);
            setTotalPrice(0);
            setGrandTotal(0);
    
            alert("Order placed successfully!");
        } catch (error) {
            console.error("Error placing order:", error);
            alert("Failed to place order. Please try again.");
        }
    };
   
    return (
        <View style={CartStyle.body}>
            <View style={CartStyle.heading}>
                <TouchableOpacity  onPress={() => navigation.navigate("home")}>
                <Image style={CartStyle.backicon} source={require("../asssets/backicon.png")} /></TouchableOpacity>
                <Text style={CartStyle.ordertext}>Order</Text>
            </View>

            <View style={CartStyle.menulist}>
                <FlatList
                    data={cartItems}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={CartStyle.menuItem}>
                            <Image source={{ uri: item.imgUrl }} style={CartStyle.menuImage} />
                            <View>
                                <Text style={CartStyle.menuText}>{item.name}</Text>
                                <Text style={CartStyle.menuPrice}>₹{item.price}</Text>
                            </View>
                            <TouchableOpacity onPress={() => removeFromCart(item.id)}>
                                <Image style={CartStyle.closeimg} source={require("../asssets/close.png")} />
                            </TouchableOpacity>
                        </View>
                    )}
                    contentContainerStyle={{ paddingBottom: 30 }}
                />
            </View>

            <View style={CartStyle.bill}>
                <View style={CartStyle.totalstextcontainer}>
                    <Text style={CartStyle.totaltext}>Subtotal</Text>
                    <Text style={CartStyle.pricetotal}>₹{totalPrice.toFixed(2)}</Text>
                </View>
                <View style={CartStyle.totalstextcontainer}>
                    <Text style={CartStyle.totaltext2}>Tax</Text>
                    <Text style={CartStyle.pricetotal2}>₹{tax.toFixed(2)}</Text>
                </View>
                <View style={CartStyle.totalstextcontainer}>
                    <Text style={CartStyle.totaltext2}>Delivery Fee</Text>
                    <Text style={CartStyle.pricetotal3}>₹{deliveryFee.toFixed(2)}</Text>
                </View>
                <Image style={CartStyle.divider} source={require("../asssets/divider.jpeg")} />
                <View style={CartStyle.totalstextcontainer}>
                    <Text style={CartStyle.totaltext4}>Total</Text>
                    <Text style={CartStyle.pricetotal4}>₹{grandTotal.toFixed(2)}</Text>
                </View>
                <Text style={CartStyle.totaltime}>Estimated delivery time : <Text style={CartStyle.pricetime}>35-45 min</Text></Text>
                <Text style={CartStyle.totaltime2}>Cash on delivery ✅</Text>
                <TouchableOpacity  onPress={placeOrder}>
                    <View style={CartStyle.placebutton}>
                        <Text style={CartStyle.placeordertext}>PLACE ORDER</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}
