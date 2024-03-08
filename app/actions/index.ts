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
export async function signOut() {
  const supabase = createClient();
  await supabase.auth.signOut();
  revalidatePath("/");
  return redirect("/");
}
// ACTION MP SERVER ACTION
export async function payment(item: Item, formData: FormData) {
  const size = formData.get("size");
  const { id, title, price } = item;
  const titlePlusPrice = title + " " + size;
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();
  const { data: session } = await supabase.auth.getSession();
  const userId = data?.user?.id;
  const userJWT = session?.session?.access_token;

  const preference = await new Preference(client).create({
    body: {
      metadata: {
        id: userId,
        client: userJWT,
        url: item.images,
      },
      back_urls: {
        success: "http://localhost:3000",
      },
      auto_return: "approved",
      items: [
        {
          id: id,
          title: titlePlusPrice as string,
          quantity: 1,
          unit_price: Number(price),
          picture_url: String(item.images),
        },
      ],
    },
  });
  redirect(preference.sandbox_init_point!);
}

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
        success: process.env.NEXT_PUBLIC_URL || "http://localhost:3000", // Use NEXT_PUBLIC_URL if available
        failure: process.env.NEXT_PUBLIC_URL || "http://localhost:3000/error", // Add a failure redirect URL
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
