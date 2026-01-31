import { db } from "@/shared/db";
import * as Q from "./db/queries";
import { ChecklistItem } from "./types";

export async function getUncompletedChecklist(): Promise<ChecklistItem[]> {
    return await db.getAllAsync(Q.getUncompletedItems);
}

export async function getCompletedChecklist(): Promise<ChecklistItem[]> {
    return await db.getAllAsync(Q.getCompletedItems);
}

export async function addChecklistItem(item: ChecklistItem) {
    return await db.runAsync(Q.insertItem, [item.text, item.completed ? 1 : 0])
    
}

export async function deleteChecklistItem(id: number) {
    return await db.runAsync(Q.deleteItem, [id])
}

export async function completeChecklistItem(id: number, complete: 1 | 0) {
    return await db.runAsync(Q.completeItem, [complete, id])
}

export async function getChecklistItem(id: number): Promise<ChecklistItem> {
    const result = await db.getFirstAsync<ChecklistItem>(Q.getItem, [id]);
    if (!result) {
        throw new Error(`ChecklistItem with id ${id} not found`);
    }
    return result;
}