import { createClient } from "@supabase/supabase-js";

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

export async function handler(event) {
  try {
    if (event.httpMethod === "GET") {
      const { data, error } = await supabase.from("employees").select("*").order("created_at", { ascending: false });
      if (error) return { statusCode: 500, body: JSON.stringify({ message: error.message }) };
      return { statusCode: 200, body: JSON.stringify(data) };
    }

    if (event.httpMethod === "POST") {
      const body = JSON.parse(event.body || "{}");
      const { data, error } = await supabase.from("employees").insert(body).select();
      if (error) return { statusCode: 500, body: JSON.stringify({ message: error.message }) };
      return { statusCode: 200, body: JSON.stringify(data) };
    }

    if (event.httpMethod === "DELETE") {
      const { id } = JSON.parse(event.body || "{}");
      if (!id) return { statusCode: 400, body: JSON.stringify({ message: "Missing id" }) };
      const { error } = await supabase.from("employees").delete().eq("id", id);
      if (error) return { statusCode: 500, body: JSON.stringify({ message: error.message }) };
      return { statusCode: 200, body: JSON.stringify({ message: "Deleted" }) };
    }

    return { statusCode: 405, body: "Method Not Allowed" };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ message: err.message }) };
  }
}
