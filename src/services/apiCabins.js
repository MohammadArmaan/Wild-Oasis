import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
    const { data, error } = await supabase.from("cabins").select("*");

    if (error) {
        console.error(error);
        throw new Error("Cabins could not be loaded");
    }

    return data;
}

export async function createEditCabin(newCabin, id) {
    const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
    const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
        "/",
        ""
    );
    const imagePath = hasImagePath ? newCabin.image : `${supabaseUrl}/storage/v1/object/public/cabins-images/${imageName}`;

    // 1.) Create/edit Cabin
    let query = supabase.from("cabins");

    //  A) CREATE
    if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

    // B) EDIT
    if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

    const { data, error } = await query.single();

    if (error) {
        console.error(error);
        throw new Error("Cabins could not be created");
    }

    // 2.) Upload Image
    if (hasImagePath) return data;

    const { error: storageError } = await supabase.storage
        .from("cabins-images")
        .upload(imageName, newCabin.image);

    // 3) Delete the cabin if there was an error uploading image
    if (storageError) {
        await supabase.from("cabins").delete().eq("id", data.id);
        console.error(error);
        throw new Error(
            "Cabins image could not be uploaded and cabin could not be created"
        );
    }

    return data;
}

export async function deleteCabin(id) {
    const { data, error } = await supabase.from("cabins").delete().eq("id", id);

    if (error) {
        console.error(error);
        throw new Error("Cabins could not be deleted");
    }

    return data;
}
