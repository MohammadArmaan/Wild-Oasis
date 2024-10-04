import supabase, { supabaseUrl } from "./supabase";

export async function signup({ fullName, email, password }) {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                fullName,
                avatar: "",
            },
        },
    });
    if (error) {
        throw new Error(error.message);
    }

    return data;
}

export async function login({ email, password }) {
    let { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        throw new Error(error.message);
    }

    return data;
}

export async function getCurrentUser() {
    const { data: session } = await supabase.auth.getSession();

    if (!session.session) return null;

    const { data, error } = await supabase.auth.getUser();

    if (error) {
        throw new Error(error.message);
    }

    return data?.user;
}

export async function logout() {
    const { error } = await supabase.auth.signOut();

    if (error) throw new Error(error.message);
}

export async function UpdateCurrentUser({ password, fullName, avatar }) {
    // 1) Update password or fullName
    let updateData = {};
    if (password) updateData.password = password;

    if (fullName) updateData.data = { fullName };

    const { data: updatedUserData, error: updateError } =
        await supabase.auth.updateUser(updateData);

    if (updateError) throw new Error(updateError.message);

    if (!avatar) return updatedUserData;

    // 2) Upload the avatar image
    const fileName = `avatar-${updatedUserData.user.id}-${Math.random()}`;

    const { error: storageError } = await supabase.storage
        .from("avatars")
        .upload(fileName, avatar);

    if (storageError) throw new Error(storageError.message);

    // 3) Update the user's avatar URL in their metadata
    const avatarUrl = `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`;

    const { data: finalUpdateData, error: finalUpdateError } =
        await supabase.auth.updateUser({
            data: {
                avatar: avatarUrl,
            },
        });

    if (finalUpdateError) throw new Error(finalUpdateError.message);

    return finalUpdateData;
}
