import { createInterstitial } from "@/hooks/create-Interstitial";
import { useEffect, useRef, useState } from "react";
import { AdEventType, InterstitialAd } from "react-native-google-mobile-ads";
import { addChecklistItem, completeChecklistItem, deleteChecklistItem, getChecklistItem, getCompletedChecklist, getUncompletedChecklist } from "../service";
import { ChecklistItem } from "../types";


export function useChecklist() {
    const [completedItems, setCompletedItems] = useState<ChecklistItem[]>([]);
    const [uncompletedItems, setUncompletedItems] = useState<ChecklistItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null)
    const [actionCount, setActionCount] = useState(0);
    const [isAdLoaded, setIsAdLoaded] = useState(false);
    const interstitialRef = useRef<InterstitialAd | null>(null);

    // Cargar lista de items incompletos
    useEffect(() => {
        console.log("CREANDO INTERSTITIAL");

        const interstitial = createInterstitial();
        interstitialRef.current = interstitial;

        const unsubLoaded = interstitial.addAdEventListener(
            AdEventType.LOADED,
            () => {
            console.log("🔥 EVENTO LOADED DISPARADO");
            setIsAdLoaded(true);
            }
        );

        const unsubError = interstitial.addAdEventListener(
            AdEventType.ERROR,
            (error) => {
                console.log("❌ EVENTO ERROR:", error);
            }
        );

        const unsubOpened = interstitial.addAdEventListener(
            AdEventType.OPENED,
            () => {
            console.log("📱 EVENTO OPENED");
            }
        );

        const unsubClosed = interstitial.addAdEventListener(
            AdEventType.CLOSED,
            () => {
            console.log("🚪 EVENTO CLOSED");
            setIsAdLoaded(false);
            interstitial.load();
            }
        );

        console.log("CARGANDO ANUNCIO...");
        interstitial.load();

        loadUncompletedItems();

        return () => {
            unsubLoaded();
            unsubError();
            unsubOpened();
            unsubClosed();
        };

    }, [])

    const handleUserAction = () => {
        const newCount = actionCount + 1;
        setActionCount(newCount);

        if (newCount >= 5 && isAdLoaded) {
            interstitialRef.current?.show();
            setActionCount(0);
        }
        console.log("Action count: ", newCount);
    };

    const loadUncompletedItems = async () => {
        try {
            setLoading(true);
            const dataCompleted = await getCompletedChecklist();
            setCompletedItems(dataCompleted);
            const dataUncompleted = await getUncompletedChecklist();
            setUncompletedItems(dataUncompleted);
        } catch (error) {
            setError("Error cargando checklist");
        } finally {
            setLoading(false);
        }
    } ;

    // Crear item
    const addItem = async (text: string) => {
        try {
            const newItem: ChecklistItem = {
                id: 0,
                text: text,
                completed: 0,
            }
            const selectResults = await addChecklistItem(newItem);
            setUncompletedItems(prev => [...prev, {
                id: selectResults.lastInsertRowId,
                text: text,
                completed: 0,
            }]);
            handleUserAction();
        } catch (error) {
            setError("Error al agregar item");
            console.error("Error add: ", error);
        }
    };

    // Delete item
    const removeItem = async (id: number, completed: 1 | 0) => {
        try {
            await deleteChecklistItem(id);
            updateSetChecklistItems(id, completed);
            handleUserAction();
        } catch (error) {
            setError("Error al eliminar item");
        }
    }

    // Complete item
    const completeItem = async (id: number, completed: 1 | 0) => {
        try {
            await completeChecklistItem(id, completed);
            await updateSetChecklistItems(id, completed);
            const item: ChecklistItem = await getChecklistItem(id)
            completed ? setCompletedItems(prev => [...prev, item]) : setUncompletedItems(prev => [...prev, item]);
            handleUserAction();
            // setItems(prev => prev.filter(i => i.id !== id));
        } catch(error) {
            setError("Error al completar item");
        }
    }

    const updateSetChecklistItems = async (id: number, completed: 1 | 0) => {
        // Add of the list
        await completed ? setCompletedItems(prev => prev.filter(i => i.id !== id)) : setUncompletedItems(prev => prev.filter(i => i.id !== id));
        // Delete to the list
        await completed ? setUncompletedItems(prev => prev.filter(i => i.id !== id)) : setCompletedItems(prev => prev.filter(i => i.id !== id));


    }

    return {
        completedItems,
        uncompletedItems,
        loading,
        error,
        completeItem,
        addItem,
        removeItem,
        reload: loadUncompletedItems,
    }
};