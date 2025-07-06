import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("finance");
    const transactions = await db.collection("transactions").find({}).toArray();

    return Response.json({ success: true, data: transactions });
  } catch (error) {
    return Response.json({ success: false, message: "Failed to fetch transactions" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();

    if (!body.amount || !body.date || !body.description) {
      return Response.json({ success: false, message: "Missing fields" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("finance");
    const result = await db.collection("transactions").insertOne(body);

    return Response.json({ success: true, data: result });
  } catch (error) {
    return Response.json({ success: false, message: "Failed to add transaction" }, { status: 500 });
  }
}
