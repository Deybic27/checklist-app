import * as S from "@/features/checklist/db/schema";
import { db } from "@/shared/db";

export async function initDatabase() {
    return await db.execAsync(S.createChecklistTable)
}