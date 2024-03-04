import AuthButton from "@/components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function ProtectedPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }
  const { data, error } = await supabase
    .from("checkout")
    .select("*")
    .eq("user_id", user.id);
  if (error) {
    console.log(error);
  }
  return (
    <div className=" w-full  gap-20 items-center">
      <div className="w-full">
        <div className="py-6 flex flex-col font-bold bg-purple-950 text-center">
          This is a protected page that you can only see as an authenticated
          user
        </div>
      </div>
      <div className="max-w-4xl mx-auto mt-10">
        <div className="flex flex-col items-center justify-center gap-6">
          {data &&
            data.map((item) => (
              <div className="flex gap-4" key={item.id}>
                <Image
                  src={item.picture_url}
                  alt="picture"
                  height={200}
                  width={200}
                />
                {/* Dar estilos  */}
                <ul className="">
                  <li>{item.message}</li>
                  <li>{item.amount}</li>
                  <li>{item.user_email}</li>
                  <li>{item.inserted_at}</li>
                  <li>{item.payment_email}</li>
                  <li>{item.status}</li>
                </ul>
              </div>
            ))}
        </div>
      </div>
      <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
        <p>
          Powered by{" "}
          <a
            href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
            target="_blank"
            className="font-bold hover:underline"
            rel="noreferrer"
          >
            Supabase
          </a>
        </p>
      </footer>
    </div>
  );
}
