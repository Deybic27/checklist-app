export const insertItem = `
  INSERT INTO checklist (text, completed)
  VALUES (?, ?);
`;

export const getCompletedItems = `
    SELECT * FROM checklist
    WHERE completed = 1;
`;

export const getUncompletedItems = `
    SELECT * FROM checklist
    WHERE completed = 0;
`;

export const getItem = `
    SELECT * FROM checklist
    WHERE id = ?;
`;

export const updateItem = `
    UPDATE checklist
    SET text = ?, completed = ?, updated_at = CURRENT_TIMESTAMP
    WHERE id = ?;
`;

export const completeItem = `
    UPDATE checklist
    SET completed = ?
    WHERE id = ?;
`;

export const deleteItem = `
    DELETE FROM checklist
    WHERE id = ?;
`;