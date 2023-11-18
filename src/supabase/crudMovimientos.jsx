import { supabase } from "./supabase.config";
import Swal from "sweetalert2";
export const InsertarMovimientos = async (p) => {
  if(p.id !== undefined){
    try {
      const { error } = await supabase
        .from("movimientos")
        .update(p)
        .eq("idcuenta", p.idcuenta)
        .eq("id", p.id);
      if (error) {
        alert("Error al editar movimiento", error);
      }
    } catch (error) {
      alert(error.error_description || error.message + " editar movimientos");
    }

  } else {
    try {
      const { data, error } = await supabase
        .from("movimientos")
        .insert(p)
        .select();
      if (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Ya existe un registro con " + p.id,
          footer: '<a href="">Agregue una nueva descripcion</a>',
        });
      }
      if (data) {
        Swal.fire({
          icon: "success",
          title: "Registrado",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      alert(error.error_description || error.message + " insertar movimientos");
    }

  }
  
};

export async function EliminarMovimientos(p) {
  try {
    const { error } = await supabase
      .from("movimientos")
      .delete()
      .eq("id", p.id);
    if (error) {
      alert("Error al eliminar", error);
    }
  } catch (error) {
    alert(error.error_description || error.message + " eliminar movimientos");
  }
}
export async function MostrarMovimientosPorMesAño(p) {
  try {
    const { data } = await supabase.rpc("mmovimientosmesanio", {
      anio: p.año,
      mes: p.mes,
      iduser: p.idusuario,
      tipocategoria: p.tipocategoria,
    });
    return data;
  } catch (error) {}
}
export async function RptMovimientosPorMesAño(p) {
  try {
    const { data } = await supabase.rpc("rptmovimientos_anio_mes", {
      anio: p.año,
      mes: p.mes,
      iduser: p.idusuario,
      tipocategoria: p.tipocategoria,
    });
    return data;
  } catch (error) {}
}
