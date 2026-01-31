import { IconSymbol } from "@/components/ui/icon-symbol";
import { ThemedCard } from "@/shared/components/themed-card";
import { ThemedCardContainer } from "@/shared/components/themed-card-container";
import { ThemedPressable } from "@/shared/components/themed-pressable";
import { ThemedTextInput } from "@/shared/components/themed-text-input";
import { useState } from "react";
import { StyleSheet } from "react-native";
type ChecklistCreateProps ={
    onAdd : (text: string) => void;
}

export function ChecklistCreate({
    onAdd,
}: ChecklistCreateProps) {
    const [text, setText] = useState("");
    const handleCreate = () => {
        try {
            onAdd(text);
            setText("");
        } catch (error) {
            console.log("Error al agregar item");
        }
    }
    return(
        <ThemedCardContainer style={styles.container}>
            <ThemedCard style={styles.firstLine}>
                <ThemedCard style={styles.firstColumn}>
                    <ThemedPressable>
                        <ThemedTextInput
                            value={text}
                            placeholder="Cree un item"
                            onChangeText={setText}
                        />
                    </ThemedPressable>
                </ThemedCard>
                <ThemedCard style={styles.secondColumn}>
                    <ThemedPressable onPress={handleCreate}>
                        <IconSymbol style={styles.icon} size={45} name="speaker.wave.1" color={"#fff"} />
                    </ThemedPressable>
                </ThemedCard>
            </ThemedCard>
        </ThemedCardContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
    },
    firstLine: {
        width: "100%",
        display: "flex",
        flexDirection: "row"
    },
    firstColumn: {
        height: "100%",
        flexGrow: 1,
    },
    secondColumn: {
        height: "100%",
    },
    button: {
    },
    icon: {
    },
});