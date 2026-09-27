import { supabase } from "../../app-store/cns/supebase.js";

const ROOM_CODE_CHARACTERS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

function generateRoomCode(length = 6) {
  let code = "";

  for (let i = 0; i < length; i++) {
    const index = Math.floor(Math.random() * ROOM_CODE_CHARACTERS.length);

    code += ROOM_CODE_CHARACTERS[index];
  }

  return code;
}

export async function createRoom({ title, participantName }) {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    throw userError;
  }

  if (!user) {
    throw new Error("Authenticated kullanıcı bulunamadı.");
  }

  let room = null;

  // Room code'un unique olması için birkaç kez deneyebiliriz.
  for (let attempt = 0; attempt < 5; attempt++) {
    const code = generateRoomCode();

    const { data, error } = await supabase
      .from("rooms")
      .insert({
        code,
        title,
        created_by: user.id,
      })
      .select()
      .single();

    if (!error) {
      room = data;
      break;
    }

    // Unique constraint hatası değilse direkt fırlat.
    if (error.code !== "23505") {
      throw error;
    }
  }

  if (!room) {
    throw new Error("Benzersiz oda kodu oluşturulamadı.");
  }

  const { data: participant, error: participantError } = await supabase
    .from("participants")
    .insert({
      room_id: room.id,
      user_id: user.id,
      name: participantName,
    })
    .select()
    .single();

  if (participantError) {
    // Room oluşturuldu fakat participant oluşturulamadı.
    // Şimdilik hatayı yukarı taşıyoruz.
    throw participantError;
  }

  return {
    room,
    participant,
  };
}
