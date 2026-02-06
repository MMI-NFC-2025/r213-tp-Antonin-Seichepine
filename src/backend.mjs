import PocketBase from "pocketbase";
const pb = new PocketBase("http://127.0.0.1:8090");

export function getImageUrl(record, imageField) {
    const file = Array.isArray(record[imageField])
        ? record[imageField][0]
        : record[imageField];

    return file ? pb.files.getUrl(record, file) : null;
}

export async function getOffres() {
    try {
        return await pb.collection("maison").getFullList({
            sort: "-created",
        });
    } catch (error) {
        console.log("Une erreur est survenue en lisant la liste des maisons", error);
        return [];
    }
}

export async function getOffre(id) {
    try {
        const data = await pb.collection("maison").getOne(id);
        return data;
    } catch (error) {
        console.log("Une erreur est survenue en lisant la maison", error);
        return [];
    }
}

export async function getOffresSurface50() {
    try {
        return await pb.collection("maison").getFullList({
            filter: "surface > 50",
            sort: "-created",
        });
    } catch (error) {
        console.log("Erreur surface > 50", error);
        return [];
    }
}
