import React from "react";
import { View, Text, ScrollView, Image, StatusBar } from "react-native";
import tw from "twrnc";
const RecieptScreen = () => {
  return (
    // <View style={styles.container}>
    //   <Text>Malis</Text>
    //   <StatusBar style="auto" />
    // </View>

    <ScrollView style={tw`flex-1 bg-white p-4`}>
      {/* Brand and Logo Section */}
      <View style={tw`flex-row justify-between items-center mb-5`}>
        <Text style={tw`w-14`}></Text>
        <View style={tw`flex-col items-center`}>
          <Text style={tw`text-lg italic`}>Brand</Text>
          <Text style={tw`text-xl font-bold`}>OWNTECH</Text>
        </View>
        {/* Star Background */}
        <View style={tw`relative flex justify-center items-center`}>
          <Image
            source={require("../assets/VectorStar.png")} // Replace with your star image path
            style={tw`w-16 h-16`} // Adjust the size of the star as needed
          />
          <Text style={tw`absolute text-xl font-bold text-red-500`}>220$</Text>
        </View>
      </View>

      {/* Product Image */}
      <View style={tw`items-center mb-5`}>
        <Image
          source={require("../assets/image.png")} // Replace with your product image URL or local image
          style={tw`w-32 h-32`}
        />
      </View>

      {/* Customer Information */}
      <View style={tw`mt-5 mx-5 `}>
        <View style={tw`flex-col justify-start mb-2`}>
          <Text style={tw`text-base text-gray-500 flex-1 pr-2 mb-2`}>
            Your Name
          </Text>
          <Text style={tw`text-lg font-bold flex-1 ml-3`}>LENG Kola</Text>
        </View>

        <View style={tw`flex-col justify-start mb-2`}>
          <Text style={tw`text-base text-gray-500 flex-1 pr-2 mb-2`}>
            Location
          </Text>
          <Text style={tw`text-lg font-bold flex-1 ml-3`}>
            Kandeang, Pursat
          </Text>
        </View>

        <View style={tw`flex-col justify-start mb-2`}>
          <Text style={tw`text-base text-gray-500 flex-1 pr-2 mb-2`}>
            Phone Number
          </Text>
          <Text style={tw`text-lg font-bold flex-1 ml-3`}>097 346 0505</Text>
        </View>

        <View style={tw`flex-col justify-start mb-2`}>
          <Text style={tw`text-base text-gray-500 pr-2 mb-2`}>
            Delivery Company
          </Text>

          <View style={tw`flex-row items-center justify-between`}>
            <Image
              source={require("../assets/virakbutham.png")} // Replace with your product image URL or local image
              style={tw`w-8 h-8`}
            />
            <Text style={tw`text-lg font-bold flex-1 ml-3`}>
              ViraK Buntham Express
            </Text>
          </View>
        </View>

        <View style={tw`flex-col justify-start  mb-2`}>
          <Text style={tw`text-base text-gray-500 pr-2 mb-2`}>
            Paying Method
          </Text>

          <View style={tw`flex-row items-center justify-between`}>
            <Image
              source={require("../assets/abalogo.png")} // Replace with your product image URL or local image
              style={tw`w-8 h-8`}
            />
            <Text style={tw`text-lg font-bold flex-1 ml-3`}>ABA BANK</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

export default RecieptScreen;
