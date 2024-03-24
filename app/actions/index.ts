"use server";
import { Item } from "@/types";
import { createClient } from "@/utils/supabase/server";
import mercadopago from "mercadopago";
import MercadoPagoConfig, { Payment, Preference, User } from "mercadopago";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN!,
});

// INGRESAR FORM ACTION
export const signIn = async (formData: FormData) => {
  "use server";

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return redirect("/ingreso?message=Could not authenticate user");
  }

  return redirect("/");
};
// REGISTRARSE FORM ACTION
export const signUp = async (formData: FormData) => {
  "use server";

  const origin = headers().get("origin") || "";
  const email = formData.get("email")?.toString() || "";
  const password = formData.get("password")?.toString() || "";
  const supabase = createClient();

  try {
    // Check for existing user with the signup email
    const {
      data
    } = await supabase
      .from("users")
      .select("email")
      .eq("email", email)
      .single(); // Fetch only the first matching record

    if (data) {
      // User with the email already exists
      return redirect("/registro?message=Email ya en uso"); // Informative message
    }
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/confirm`, // Include origin if present
      },
    });

    if (error) {
      throw error; // Re-throw for proper error handling
    }

    return redirect(`/registro?message=Registro exitoso`); // Success message
  } catch (error) {
    console.error(error); // Log the error for debugging
    return redirect(`/registro?message=${error}`); // Informative error message
  }
};

// COMENTARIOS PRODUCT DATA
export async function onsubMitRating(
  formData: FormData,
  postId: any,
  email: any,
  rating: any
) {
  const name = formData.get("name");
  const content = formData.get("content");
  const supabase = createClient();
  const { data, error } = await supabase
    .from("comentarios")
    .insert({ name, email, postId, content, rating })
    .select();
  if (data) {
    console.log(data);
    revalidatePath(`/posts/${postId}`);
  } else {
    console.log(error);
  }
}
// FOTO UPLOAD
export async function photo(formData: FormData) {
  "use server";
  const supabase = createClient();
  const file = formData.get("img") as File;

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  const userId = user?.id;

  if (!error) {
    const { data, error: uploadError } = await supabase.storage
      .from("profile")
      .upload(`user/${userId}`, file, {
        upsert: true,
      });
    if (!uploadError) {
      console.log(data);
      revalidatePath("/perfil", "page");
      return; // Early return after successful upload
    } else {
      console.error(uploadError);
    }
  } else {
    console.error(error);
  }
}

// DESLOGEARSE
export async function signOut() {
  const supabase = createClient();
  await supabase.auth.signOut();
  revalidatePath("/");
  return redirect("/");
}
// ACTION MP SERVER ACTION -----SINGLE-----
export async function payment(items: Item[], formData: FormData) {
  const size = formData.get("size");

  // Assuming items is an array of items
  const itemprice = items.reduce((total, item) => total + item.price, 0);

  const supabase = createClient();
  const { data } = await supabase.auth.getUser();
  const { data: session } = await supabase.auth.getSession();
  const userId = data?.user?.id;
  const userJWT = session?.session?.access_token;

  const itemsForPreference = items.map((item) => ({
    id: item.id,
    title: `${item.title} ${size}`,
    description: item.description,
    currency_id: "ARS",
    quantity: 1,
    unit_price: Number(item.price),
    picture_url: String(item.images),
  }));

  const preference = await new Preference(client).create({
    body: {
      metadata: {
        id: userId,
        client: userJWT,
        url: items[0].images, // assuming all items have the same image
      },
      back_urls: {
        success: "https://test-auth-ecommerce.vercel.app",
      },
      auto_return: "approved",
      items: itemsForPreference,
    },
  });

  redirect(preference.sandbox_init_point!);
}

// ACTION MP SERVER ACTION -----CART-----
export async function cartpayment(item: Item[], formData: FormData) {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();
  const { data: session } = await supabase.auth.getSession();
  const userId = data?.user?.id;
  const userJWT = session?.session?.access_token;

  // Create Preference Object
  const preference = await new Preference(client).create({
    body: {
      metadata: {
        id: userId,
        client: userJWT,
      },
      back_urls: {
        success:
          process.env.NEXT_PUBLIC_URL ||
          "https://test-auth-ecommerce.vercel.app", // Use NEXT_PUBLIC_URL if available
        failure:
          process.env.NEXT_PUBLIC_URL ||
          "https://test-auth-ecommerce.vercel.app/error", // Add a failure redirect URL
      },
      auto_return: "approved",
      items: item.map((item) => ({
        id: item.id.toString(),
        title: item.title + " " + item.size, // Assuming 'size' exists
        quantity: item.quantity,
        unit_price: Number(item.price), // Ensure price is a number
        picture_url: String(item.images), // Ensure image URL is a string
      })),
    },
  });
  redirect(preference.sandbox_init_point!);
}
// FILTER PARAMS
export async function searchFilter(formData: FormData) {
  const titleEntry = formData.get("title");
  const sizeEntry = formData.get("size");

  // Check if the entry is a string before assigning it
  const title = typeof titleEntry === "string" ? titleEntry : null;
  const size = typeof sizeEntry === "string" ? sizeEntry : null;

  // Construct the filter parameter with null if either title or size is missing
  const filterParam: Record<string, string | null> = {
    title: title || null,
    size: size || null,
  };

  // Use URLSearchParams to construct the parameters
  const params = new URLSearchParams();

  // Iterate over the filterParam object and add key-value pairs to params
  for (const [key, value] of Object.entries(filterParam)) {
    if (value !== null) {
      params.append(key, value);
    }
  }

  if (title || size) {
    redirect(`/tienda?${params}`);
  } else {
    redirect("/tienda");
  }
}
