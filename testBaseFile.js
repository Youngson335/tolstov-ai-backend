// import { kv } from "@vercel/kv";

// // Запись строки
// await kv.set("user:123", "John");

// // Запись объекта (автоматически конвертируется в JSON)
// await kv.set("user:details:123", { name: "John", age: 30 });
// // Чтение строки
// const name = await kv.get("user:123"); // "John"

// // Чтение объекта
// const user = await kv.get("user:details:123"); // { name: "John", age: 30 }
// await kv.del('user:123'); // Удалить ключ
// const exists = await kv.exists('user:123'); // 1 (есть) или 0 (нет)
