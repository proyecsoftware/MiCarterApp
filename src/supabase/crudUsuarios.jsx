import { supabase, ObtenerIdAuthSupabase } from "../index";
import Swal from "sweetalert2";

export const InsertarUsuarios = async (p) => {
  try {
    const { data } = await supabase.from("usuarios").insert(p).select();
    return data;
  } catch (error) {}
};

/* export const InsertarUsuarios = async (p) => {
  try {
    // Verificar si el usuario ya existe
    const idAuthSupabase = await ObtenerIdAuthSupabase();
    const { data: existingUser } = await supabase
      .from("usuarios")
      .select()
      .eq("idauth_supabase", idAuthSupabase)
      .maybeSingle();

    if (existingUser) {
      // El usuario ya existe, retornar un valor específico
      return { error: "El usuario ya existe" }; // Puedes ajustar esto según tus necesidades
    }

    // El usuario no existe, entonces lo insertamos
    const { data } = await supabase.from("usuarios").insert({ ...p, idauth_supabase }).select();
    return data;
  } catch (error) {
    console.error("Error al insertar usuarios:", error);
    return { error: "Error al insertar usuarios" }; // Puedes retornar un valor específico en caso de error
  }
}; */

export const MostrarUsuarios = async () => {
  try {
    const idAuthSupabase = await ObtenerIdAuthSupabase();
    const { error, data } = await supabase
      .from("usuarios")
      .select()
      .eq("idauth_supabase", idAuthSupabase)
      .maybeSingle();
    // if (error) {
    //   alert("MostrarUsuarios", error);
    // }
    if (data) {
      return data;
    }
  } catch (error) {
    // alert(error.error_description || error.message + "MostrarUsuarios");
  }
};
export async function EditarTemaMonedaUser(p) {
  try {
    const { error } = await supabase.from("usuarios").update(p).eq("id", p.id);
    if (error) {
      alert("Error al editar usuarios", error);
    }
    Swal.fire({
     
      icon: "success",
      title: "Datos modificados",
      showConfirmButton: false,
      timer: 1500,
    });
  } catch (error) {
    alert(error.error_description || error.message + "EditarTemaMonedaUser");
  }
}
