import PocketBase from "pocketbase";

const db = new PocketBase("http://127.0.0.1:8090");

export function getImageUrl(record, imageField) {
    if (!record || !record[imageField]) return null;

    const value = record[imageField];
    const filename = Array.isArray(value) ? value[0] : value; // 1ère image si multiple

    if (!filename) return null;
    return db.files.getUrl(record, filename);
}

export async function getOffres() {
    try {
        const data = await db.collection("maison").getFullList({
            sort: "-created",
        });
        return data;
    } catch (error) {
        console.log("Une erreur est survenue en lisant la liste des maisons", error);
        return [];
    }
}