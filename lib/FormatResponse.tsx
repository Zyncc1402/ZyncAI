import React from "react";
import { Text } from "react-native";

/**
 * Replaces all occurrences of ** with a React Native Text component with class "font-bold"
 * and converts any single * to a space.
 * @param {string} text - The input text.
 * @returns {React.ReactNode} - The text with ** replaced by <Text className="font-bold"></Text> and * converted to a space.
 */
function formatResponse(text: string): React.ReactNode {
  // Convert single asterisks to spaces
  const sanitizedText = text.replace(/\*/g, " ");

  // Split the text by ** and intersperse the bold Text components
  const parts = sanitizedText.split("  "); // Since ** are replaced with spaces, they will appear as double spaces
  const elements: React.ReactNode[] = [];

  parts.forEach((part, index) => {
    if (index % 2 === 1) {
      elements.push(
        <Text key={index} className="font-pmedium">
          {part}
        </Text>
      );
    } else {
      elements.push(part);
    }
  });

  return <>{elements}</>;
}

export default formatResponse;
