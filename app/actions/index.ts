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
        success: process.env.NEXT_PUBLIC_URL || "https://test-auth-ecommerce.vercel.app", // Use NEXT_PUBLIC_URL if available
        failure: process.env.NEXT_PUBLIC_URL || "https://test-auth-ecommerce.vercel.app/error", // Add a failure redirect URL
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
