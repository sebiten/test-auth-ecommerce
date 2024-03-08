import { Item } from "@/types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertirHoraUTCALocal(fechaUTC: any) {
  const fecha = new Date(fechaUTC);
  const opciones: any = {
    timeZone: "America/Argentina/Buenos_Aires",
    hour12: false,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };
  return fecha.toLocaleString("es-AR", opciones);
}

export function updateLocalStorage(newItem: Item) {
  // Obtén el carrito actual del localStorage
  const currentCartString = localStorage.getItem("cart");
  let currentCart = currentCartString ? JSON.parse(currentCartString) : [];

  // Busca si el ítem ya está en el carrito
  const existingItemIndex = currentCart.findIndex(
    (item: Item) => item.id === newItem.id && item.size === newItem.size
  );

  if (existingItemIndex !== -1) {
    // Si el ítem ya está en el carrito con la misma talla, actualiza la cantidad
    currentCart[existingItemIndex].quantity += 1;
  } else {
    // Si el ítem no está en el carrito o tiene una talla diferente, agrégalo
    currentCart.push(newItem);
  }

  // Guarda el carrito actualizado en el localStorage
  localStorage.setItem("cart", JSON.stringify(currentCart));
}