"use server";
import { Item } from "@/types";
import { createClient } from "@/utils/supabase/server";
import MercadoPagoConfig, { Payment, Preference, User } from "mercadopago";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN!,
});

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
      },
      back_urls: {
        success: `http://localhost:3000/tienda/${id}`,
        failure: `http://localhost:3000/tienda/${id}`,
      },
      items: [
        {
          id: id,
          title: titlePlusPrice as string,
          quantity: 1,
          unit_price: Number(price),
        },
      ],
    },
  });
  redirect(preference.sandbox_init_point!);
}
