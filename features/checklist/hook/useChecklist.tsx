import { useEffect, useState } from "react";
import { addChecklistItem, completeChecklistItem, deleteChecklistItem, getChecklistItem, getCompletedChecklist, getUncompletedChecklist } from "../service";
import { ChecklistItem } from "../types";

export function useChecklist() {
    const [completedItems, setCompletedItems] = useState<ChecklistItem[]>([]);
    const [uncompletedItems, setUncompletedItems] = useState<ChecklistItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null)

    // Cargar lista de items incompletos
    useEffect(() => {
        loadUncompletedItems();
    }, [])

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