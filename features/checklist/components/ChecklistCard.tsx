import { IconSymbol } from "@/components/ui/icon-symbol";
import { ThemedCard } from "@/shared/components/themed-card";
import { ThemedCardContainer } from "@/shared/components/themed-card-container";
import { ThemedPressable } from "@/shared/components/themed-pressable";
import { ThemedTextInput } from "@/shared/components/themed-text-input";
import { useState } from "react";
import { StyleSheet } from "react-native";

type ChecklistCardProps = {
    id : number;
    text : string;
    completed : 1 | 0;
    onRemove : (id: number, complete: 1 | 0) => void;
    onComplete : (id: number, complete: 1 | 0) => void;
}

export function ChecklistCard({
    id,
    text,
    completed,
    onRemove,
    onComplete,
}: ChecklistCardProps) {
    const [editing, setEditing] = useState(false)
    const [readOnly, setReadOnly] = useState(true)
    function handleDelete() {
        onRemove(id, completed);
        // Alert.alert("Mensaje", "Item eliminado");
        console.log("Item eliminado", id);
    }
    function handleUpdate() {
        setReadOnly(true);
        setEditing(false)
        // Alert.alert("Mensaje", "Item actualizado")
        console.log("Item actualizado", id);
        return id;    

    }
    async function handleCheck() {
        try {
            console.log("Item completado", id);
            await onComplete(id, completed ? 0 : 1);
        } catch(error) {
            console.log("Error al completar item", error);
        }
    }
    return (
        <ThemedCardContainer style={styles.container}>
            <ThemedCard style={styles.firstLine}>
                <ThemedCard style={styles.firstColumn}>
                    <ThemedPressable style={styles.button} type="default" onPress={() =>handleCheck()}>
                        <IconSymbol style={[styles.icon, completed && { display: "none" }]} size={45} name="square" color={"#fff"} />
                        <IconSymbol style={[styles.icon, !completed && { display: "none" }]} size={45} name="square.2.layers.3d" color={"#fff"} />
                    </ThemedPressable>
                </ThemedCard>
                <ThemedCard style={styles.secondColumn}>
                    <ThemedPressable onPress={() => setReadOnly(false)}>
                        <ThemedTextInput
                            readOnly={readOnly}
                            onFocus={() => setEditing(true)}
                            onBlur={() => handleUpdate()}
                            value={text}
                        />
                    </ThemedPressable>
                </ThemedCard>
                <ThemedCard style={styles.thirdColumn}>
                    <ThemedPressable style={[styles.button, editing && { display: "none" }]} type="default" onPress={() => handleDelete()}>
                        <IconSymbol style={styles.icon} size={45} name="delete.right" color={"#fff"} />
                    </ThemedPressable>
                    <ThemedPressable style={[styles.button, !editing && { display: "none" }]} type="default" onPress={() => handleUpdate()}>
                        <IconSymbol style={styles.icon} size={45} name="speaker.wave.1" color={"#fff"} />
                    </ThemedPressable>
                </ThemedCard>
            </ThemedCard>
        </ThemedCardContainer>
    )
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
    },
    secondColumn: {
        flexGrow: 1,
    },
    thirdColumn: {
        height: "100%",
    },
    button: {
    },
    icon: {
    },
});