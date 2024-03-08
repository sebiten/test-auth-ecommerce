import { NextRequest } from "next/server";
import { MercadoPagoConfig, Payment } from "mercadopago";
import { createClient } from "@/utils/supabase/server";
import { Item } from "@radix-ui/react-dropdown-menu";

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN!,
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  // Obtener información sobre el pago
  const payment = await new Payment(client).get({ id: body.data.id });

  // Obtener el UUID del usuario desde los metadatos del pago
  const jwt = payment.metadata.client;

  // Crear una instancia de Supabase
  const supabase = createClient();

  // Verificar si el usuario tiene el rol "authenticated"
  const { data } = await supabase.auth.getUser(jwt);
  const user_email = data.user?.email;

  // Crear un objeto con detalles relevantes del pago
  const checkout = {
    message: payment?.additional_info?.items?.map((item) => item.title),
    amount: payment?.additional_info?.items?.map((item) => item.unit_price),
    payment_id: payment?.id,
    user_id: payment.metadata.id,
    payment_email: payment?.payer?.email,
    user_email: user_email,
    status: payment?.status,
    picture_url: payment?.additional_info?.items?.map((item) => item.picture_url),
  };
  // Insertar el objeto checkout en la tabla "checkout"
  const { error } = await supabase.from("checkout").insert(checkout);
  console.log(payment.transaction_details);
  console.log(error);

  // Redirigir al usuario a la página de inicio
  return Response.json({ status: 200 });
}
