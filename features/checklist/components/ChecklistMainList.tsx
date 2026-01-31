import { ThemedContainer } from "@/shared/components/themed-container";
import { ThemedPressable } from "@/shared/components/themed-pressable";
import { ThemedSection } from "@/shared/components/themed-section";
import { ThemedSectionContainer } from "@/shared/components/themed-section-container";
import { ThemedSectionText } from "@/shared/components/themed-section-text";
import { ThemedSectionTitleContainer } from "@/shared/components/themed-section-title-container";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { useChecklist } from "../hook/useChecklist";
import { ChecklistCompletedList } from "./ChecklistCompletedList";
import { ChecklistCreate } from "./ChecklistCreate";
import { ChecklistUncompletedList } from "./ChecklistUncompletedList";

export function ChecklistMainList() {
    const { uncompletedItems, completedItems, removeItem, completeItem, addItem } = useChecklist();
    const [ activeViewCompleted, setActiveViewCompleted ] = useState(false)

    return (
        <ThemedContainer style={styles.container}>
            <ThemedSectionContainer style={[styles.firstLine, activeViewCompleted && {flex: 1, borderBottomStartRadius: 0, borderBottomEndRadius: 0 } || !activeViewCompleted && {flex: 10}]}>
                <ThemedSectionTitleContainer style={styles.titleContainer}>
                    <ThemedSectionText style={styles.title} type="title">Mi Lista</ThemedSectionText>
                </ThemedSectionTitleContainer>
                <ThemedSection style={styles.sectionList}>
                    <ChecklistCreate onAdd={addItem}/>
                </ThemedSection>
                <ThemedSectionContainer style={styles.firstLine__sectionUncompleteList}>
                    <ChecklistUncompletedList
                        items={uncompletedItems}
                        onRemoveUncompletedItem={removeItem}
                        onCompleteUncompletedItem={completeItem}
                    />
                </ThemedSectionContainer>
            </ThemedSectionContainer>
            <ThemedSectionContainer style={[ styles.secondLine, activeViewCompleted && { flex: 10 } || !activeViewCompleted && {flex: 1, borderBottomStartRadius: 0, borderBottomEndRadius: 0 }]}>
                <ThemedPressable onPress={() => setActiveViewCompleted(activeViewCompleted ? false : true)}>
                    <ThemedSectionTitleContainer style={styles.titleContainer}>
                        <ThemedSectionText style={styles.title} type="title">Completados</ThemedSectionText>
                    </ThemedSectionTitleContainer>
                </ThemedPressable>
                <ThemedSection style={styles.secondLine__sectionUncompleteList}>
                    <ChecklistCompletedList
                        items={completedItems}
                        onRemoveItem={removeItem}
                        onCompleteItem={completeItem}
                    />
                </ThemedSection>
            </ThemedSectionContainer>
        </ThemedContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        padding: 0,
        flexDirection: "column",
    },
    titleContainer: {
        width: "100%",
        paddingVertical: 0,
        flexDirection: 'row',
        gap: 8,
        // borderWidth: 1,
        // borderColor: "#fff"
    },
    title: {
        width: "100%",
        paddingVertical: 5,
        textAlign: "center",
        gap: 8,
        // borderWidth: 1,
        // borderColor: "#000"
    },
    firstLine: {
        display: "flex",
        // flex: 1,
        // flex: 8,
        marginBottom: 5,
    },
    firstLine__sectionUncompleteList: {
        display: "flex",
        flex: 1,
        paddingHorizontal: 10
    },
    sectionList: {
        paddingHorizontal: 10
    },
    secondLine: {
        display: "flex",
        // flex: 8,
        // flex: 1,
        // height: "100%"
        transitionProperty: "flex",
        transitionDuration: "100s",
    },
    secondLine__sectionUncompleteList: {
        display: "flex",
        // flex: 1,
        paddingHorizontal: 10
    },
    thirdLine: {
        display: "flex",
        flex: 1,
        // height: "100%"
    },
});