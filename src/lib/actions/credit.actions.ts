import { connectToDataBase } from "@/src/lib/database/mongoose";
import User from "../database/models/user.model";

export async function updateUserCredits(
  userId: string,
  userCredits: number,
  planId: number,
) {
  try {
    // Conectarse a la base de datos
    await connectToDataBase();

    const updateUserCredits = await User.findOneAndUpdate(
      { clerkId: userId },
      {
        $inc: {
          creditBalance: userCredits,
        },
        $set: {
          planId: planId,
        },
      },
      { new: true },
    );
    if (!updateUserCredits) throw new Error("User credits update failed");

    console.log(
      `Créditos actualizados exitosamente para el usuario con ID: ${userId}`,
    );
    return JSON.parse(JSON.stringify(updateUserCredits));
  } catch (error) {
    console.error("Error al actualizar los créditos del usuario:", error);
    throw error;
  }
}
