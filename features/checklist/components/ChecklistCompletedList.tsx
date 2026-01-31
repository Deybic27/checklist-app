import { ThemedSection } from "@/shared/components/themed-section";
import { FlatList, StyleSheet } from "react-native";
import { useChecklist } from "../hook/useChecklist";
import { ChecklistItem } from "../types";
import { ChecklistCard } from "./ChecklistCard";

type ChecklistCompletedListProps = {
    items : ChecklistItem[],
    onRemoveItem : (id: number, completed: 0 | 1) => Promise<void>;
    onCompleteItem : (id: number, completed: 0 | 1) => Promise<void>;
}

export function ChecklistCompletedList({
    items,
    onRemoveItem,
    onCompleteItem,
}: ChecklistCompletedListProps) {
    const { completedItems, removeItem, completeItem, addItem } = useChecklist();

    return (
        <ThemedSection style={styles.container}>
            <FlatList
                data={items}
                keyExtractor={item => item.id.toString()}
                renderItem={({item}) => {
                    return (
                        <ChecklistCard
                            id={item.id}
                            text={item.text}
                            completed={item.completed}
                            onRemove={onRemoveItem}
                            onComplete={onCompleteItem}
                        />
                    );
                }}
            />
        </ThemedSection>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        display: "flex",
        padding: 0,
        flexDirection: "column",
    },
    titleContainer: {
        padding: 20,
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8,
        // borderWidth: 1,
        // borderColor: "#fff"
    },
});