import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import React, { useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";

const Index = () => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [responseBlock, setResponseBlock] = useState([]);
  const inputRef = useRef(null);

  async function handleSubmit() {
    try {
      if (query.length >= 2) {
        Keyboard.dismiss();
        inputRef.current.clear();
        setLoading(true);
        const response = await fetch("https://zyncai.vercel.app/api", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query }),
        });
        const res = await response.json();
        setError(false);
        setLoading(false);
        setResponseBlock((prev) => [
          ...prev,
          {
            query: query.trimEnd().trimStart(),
            res,
          },
        ]);
      }
    } catch (error) {
      setLoading(false);
      setError(true);
      console.log("Error", error);
    }
  }

  // border-2 border-red-500

  return (
    <SafeAreaView>
      <View className="h-full">
        <View className="justify-between items-center py-2 px-3 flex-row fixed top-0 left-0 right-0">
          <Text className="text-white font-psemibold text-3xl">
            Zync <Text className="text-green-500">AI</Text>
          </Text>
          <View className="flex-row gap-3 items-center">
            <FontAwesome
              name="rotate-left"
              color={"white"}
              size={26}
              onPress={() => {
                setResponseBlock([]);
                setQuery("");
              }}
            />
            <Ionicons name="menu-outline" color={"white"} size={40} />
          </View>
        </View>
        <ScrollView className="h-full">
          <View className="py-2">
            {!loading && responseBlock.length == 0 && (
              <View className="px-2 mt-5">
                <Text className="text-5xl text-[#22c55e] font-psemibold">
                  Hello,
                </Text>
                <Text className="text-5xl text-[#444746] font-psemibold">
                  How can I help you today?
                </Text>
              </View>
            )}
            {responseBlock.map((singleResponse, i) => (
              <View className="px-2 relative mb-4" key={i}>
                <View
                  className="place-content-end mb-4"
                  style={{ alignSelf: "flex-end" }}
                >
                  <Text
                    style={{
                      alignSelf: "flex-start",
                      textAlignVertical: "center",
                      borderRadius: 24,
                      overflow: "hidden",
                    }}
                    className="text-white font-pmedium text-lg bg-[#1a1a1a] p-3 rounded-3xl"
                  >
                    {singleResponse.query}
                  </Text>
                </View>
                <View>
                  <Text
                    className="text-white font-pmedium text-lg bg-[#1a1a1a] pt-5 px-3 rounded-3xl"
                    style={{
                      alignSelf: "flex-start",
                      textAlignVertical: "center",
                      borderRadius: 24,
                      overflow: "hidden",
                    }}
                  >
                    {singleResponse.res}
                  </Text>
                </View>
              </View>
            ))}
            {loading && (
              <View className="w-full h-[300px] bg-[#1a1a1a] rounded-3xl animate-pulse"></View>
            )}
          </View>
        </ScrollView>
        {!loading && responseBlock.length == 0 && (
          <View className="gap-4 mb-6">
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View className="flex-row gap-4">
                <TouchableOpacity
                  activeOpacity={0.8}
                  className="flex-1 bg-[#1a1a1a] rounded-3xl p-5"
                  onPress={() => setQuery("Create a Workout Plan for me")}
                >
                  <Text className="font-pmedium text-xl color-white w-[130px]">
                    Create a Workout Plan for me
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.8}
                  className="flex-1 bg-[#1a1a1a] rounded-3xl p-5"
                  onPress={() => setQuery("Tell me 5 interesting Facts")}
                >
                  <Text className="font-pmedium text-xl color-white w-[130px]">
                    Tell me 5 interesting Facts
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.8}
                  className="flex-1 bg-[#1a1a1a] rounded-3xl p-5"
                  onPress={() => setQuery("Give information about neurallink")}
                >
                  <Text className="font-pmedium text-xl color-white w-[130px]">
                    Give info about neurallink
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.8}
                  className="flex-1 bg-[#1a1a1a] rounded-3xl p-5"
                  onPress={() =>
                    setQuery("What is the temperature of the Sun?")
                  }
                >
                  <Text className="font-pmedium text-xl color-white w-[130px]">
                    What is the temperature of the Sun?
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        )}
        <View className="w-ful flex-row fixed bottom-0 right-0 left-0 my-3 items-center gap-x-3">
          <TextInput
            textAlignVertical="center"
            value={query}
            placeholder="Ask Gemini and LLama 3"
            className="rounded-3xl px-5 pt-3 h-[60px] pb-2 color-white font-pmedium flex-1 bg-[#1a1a1a]"
            onChangeText={(input: string) => setQuery(input)}
            placeholderTextColor={"#ffffff"}
            cursorColor={"#ffffff"}
            ref={inputRef}
            // autoFocus
            multiline
          />
          <TouchableOpacity
            disabled={loading}
            className={`bg-white rounded-full items-center justify-center p-[8px]`}
            onPress={handleSubmit}
          >
            <Ionicons name="arrow-up-outline" color={"#000000"} size={30} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Index;

// <TouchableOpacity>
//   <Text
//     className="text-white p-5 rounded-2xl"
//     onPress={() => {
//       setResponse("");
//       setQuery("");
//     }}
//   >
//     <FontAwesome name="ban" size={40} />
//   </Text>
// </TouchableOpacity>
