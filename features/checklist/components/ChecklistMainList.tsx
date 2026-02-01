import { IconSymbol } from "@/components/ui/icon-symbol";
import { useThemeColor } from "@/hooks/use-theme-color";
import { ThemedContainer } from "@/shared/components/themed-container";
import { ThemedPressable } from "@/shared/components/themed-pressable";
import { ThemedSection } from "@/shared/components/themed-section";
import { ThemedSectionContainer } from "@/shared/components/themed-section-container";
import { ThemedSectionText } from "@/shared/components/themed-section-text";
import { ThemedSectionTitleContainer } from "@/shared/components/themed-section-title-container";
import { Link } from "expo-router";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { useChecklist } from "../hook/useChecklist";
import { ChecklistCompletedList } from "./ChecklistCompletedList";
import { ChecklistCreate } from "./ChecklistCreate";
import { ChecklistUncompletedList } from "./ChecklistUncompletedList";

type ChecklistMainListProps ={
    lightColor?: string;
    darkColor?: string;
}

export function ChecklistMainList({
    lightColor, 
    darkColor,
}: ChecklistMainListProps) {
    const { uncompletedItems, completedItems, removeItem, completeItem, addItem } = useChecklist();
    const [ activeViewCompleted, setActiveViewCompleted ] = useState(false)
    const iconColor = useThemeColor({ light: lightColor, dark: darkColor }, 'textSection');

    return (
        <ThemedContainer style={styles.container}>
            <ThemedSectionContainer
                style={
                    [
                        styles.firstLine, activeViewCompleted && {flex: 1, borderBottomStartRadius: 0, borderBottomEndRadius: 0 } || !activeViewCompleted && {flex: 10}
                    ]
                }>
                <ThemedSectionTitleContainer style={styles.titleContainer}>
                    <ThemedSectionText style={styles.title} type="title">Mi Lista</ThemedSectionText>
                    <Link style={styles.icon} href="/modal">
                        <Link.Trigger>
                            <IconSymbol style={styles.icon} size={45} name="info" color={iconColor} />
                        </Link.Trigger>
                        <Link.Preview />
                        <Link.Menu>
                        <Link.MenuAction title="Action" icon="cube" onPress={() => alert('Action pressed')} />
                        <Link.MenuAction
                            title="Share"
                            icon="square.and.arrow.up"
                            onPress={() => alert('Share pressed')}
                        />
                        <Link.Menu title="More" icon="ellipsis">
                            <Link.MenuAction
                            title="Delete"
                            icon="trash"
                            destructive
                            onPress={() => alert('Delete pressed')}
                            />
                        </Link.Menu>
                        </Link.Menu>
                    </Link>
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
            <ThemedSectionContainer 
                style={
                    [ 
                        styles.secondLine,
                        activeViewCompleted && { flex: 10, marginBottom: 70 } || !activeViewCompleted && {flex: 1, borderBottomStartRadius: 0, borderBottomEndRadius: 0 }
                    ]
                }>
                <ThemedPressable onPress={() => setActiveViewCompleted(activeViewCompleted ? false : true)}>
                    <ThemedSectionTitleContainer style={styles.titleContainer}>
                        <ThemedSectionText style={styles.title} type="title">Completados</ThemedSectionText>
                        <IconSymbol style={[styles.icon, !activeViewCompleted && {opacity: 0}]} size={45} name="arrow.down" color={iconColor} />
                        <IconSymbol style={[styles.icon, activeViewCompleted && {opacity: 0}]} size={45} name="arrow.up" color={iconColor} />
                    </ThemedSectionTitleContainer>
                </ThemedPressable>
                <ThemedSectionContainer style={styles.secondLine__sectionUncompleteList}>
                    <ChecklistCompletedList
                        items={completedItems}
                        onRemoveItem={removeItem}
                        onCompleteItem={completeItem}
                    />
                </ThemedSectionContainer>
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
        flexDirection: "row",
        alignItems: "center",
        // borderWidth: 1,
        // borderColor: "yellow"
    },
    title: {
        width: "100%",
        paddingVertical: 10,
        textAlign: "center",
        gap: 8,
        // borderWidth: 1,
        // borderColor: "red"
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
        // transitionProperty: "flex",
        // transitionDuration: "100s",
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
    icon: {
        position: "absolute",
        right: 20,
    },
});