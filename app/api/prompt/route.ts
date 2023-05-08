import Prompt from "@models/prompt";
import User from "@models/user";
import { connectToDB } from "@utils/database";

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const q: string | null = searchParams.get("q");

  try {
    await connectToDB();
    let data;
    if (!q) {
      data = await Prompt.find().populate("creater").sort({ createdAt: -1 });
    } else {
      data = await Prompt.find({
        $or: [
          { prompt: { $regex: q, $options: "i" } },
          { tag: { $regex: q, $options: "i" } },
          {
            creater: {
              $in: await User.find({
                username: { $regex: q, $options: "i" },
              }).distinct("_id"),
            },
          },
        ],
      })
        .populate("creater")
        .sort({ createdAt: -1 });
    }

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (e: any) {
    return new Response(JSON.stringify({ message: "Something Broke!" }), {
      status: 500,
    });
  }
};

// Book.find({ $and: [{ genre: { $in: ['Science Fiction'] } }, { author: 'Isaac Asimov' }] }, (err, books) => {
//   if (err) {
//     console.error(err);
//   } else {
//     console.log(books);
//   }
// });
