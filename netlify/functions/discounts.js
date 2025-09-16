import { createClient } from "@supabase/supabase-js";

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Protect clear-all with ADMIN_CLEAR_PASSWORD env var
const ADMIN_PASSWORD = process.env.ADMIN_CLEAR_PASSWORD || "admin123";

export async function handler(event) {
  try {
    if (event.httpMethod === "GET") {
      const { data, error } = await supabase
        .from("discounts")
        .select("*, employees(name,emp_code,position)")
        .order("created_at", { ascending: false });
      if (error) return { statusCode: 500, body: JSON.stringify({ message: error.message }) };
      return { statusCode: 200, body: JSON.stringify(data) };
    }

    if (event.httpMethod === "POST") {
      const body = JSON.parse(event.body || "{}");
      const { data, error } = await supabase.from("discounts").insert(body).select();
      if (error) return { statusCode: 500, body: JSON.stringify({ message: error.message }) };
      return { statusCode: 200, body: JSON.stringify(data) };
    }

    if (event.httpMethod === "DELETE") {
      const body = JSON.parse(event.body || "{}");
      if (body.clearAll) {
        if (body.password !== ADMIN_PASSWORD) {
          return { statusCode: 403, body: JSON.stringify({ message: "كلمة السر غير صحيحة", error: true }) };
        }
        const { error } = await supabase.from("discounts").delete().neq("id", 0);
        if (error) return { statusCode: 500, body: JSON.stringify({ message: error.message }) };
        return { statusCode: 200, body: JSON.stringify({ message: "تم مسح جميع الخصومات" }) };
      }
      if (body.id) {
        const { error } = await supabase.from("discounts").delete().eq("id", body.id);
        if (error) return { statusCode: 500, body: JSON.stringify({ message: error.message }) };
        return { statusCode: 200, body: JSON.stringify({ message: "Deleted" }) };
      }
      return { statusCode: 400, body: JSON.stringify({ message: "Bad request" }) };
    }

    return { statusCode: 405, body: "Method Not Allowed" };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ message: err.message }) };
  }
}
