import { ThemedSectionContainer } from "@/shared/components/themed-section-container";
import { FlatList, StyleSheet } from "react-native";
import { ChecklistItem } from "../types";
import { ChecklistCard } from "./ChecklistCard";

type ChecklistUncompletedListProps = {
    items: ChecklistItem[];
    onRemoveUncompletedItem: (id: number, completed: 0 | 1) => Promise<void>;
    onCompleteUncompletedItem: (id: number, completed: 0 | 1) => Promise<void>;
}

export function ChecklistUncompletedList({
    items,
    onRemoveUncompletedItem,
    onCompleteUncompletedItem,
}: ChecklistUncompletedListProps) {

    return (
        <ThemedSectionContainer style={styles.container}>
            {/* <ThemedView style={styles.titleContainer}>
                <ThemedText type="title">Mi Lista</ThemedText>
            </ThemedView> */}
            
            <FlatList
                data={items}
                keyExtractor={item => item.id.toString()}
                renderItem={({item}) => {
                    return (
                        <ChecklistCard
                            id={item.id}
                            text={item.text}
                            completed={item.completed}
                            onRemove={onRemoveUncompletedItem}
                            onComplete={onCompleteUncompletedItem}
                        />
                    );
                }}
            />
        </ThemedSectionContainer>
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