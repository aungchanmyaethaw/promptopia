import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";
export const POST = async (req: Request) => {
  try {
    connectToDB();
    const { prompt, tag, userId } = await req.json();

    if (!prompt) {
      return new Response(JSON.stringify({ message: "Prompt required!" }), {
        status: 400,
      });
    }
    if (!tag) {
      return new Response(JSON.stringify({ message: "Tag required!" }), {
        status: 400,
      });
    }
    if (!userId) {
      return new Response(JSON.stringify({ message: "UserId required!" }), {
        status: 400,
      });
    }

    const newPrompt = await Prompt.create({ prompt, tag, creater: userId });
    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (e: any) {
    return new Response(JSON.stringify({ message: "Something Broke!" }), {
      status: 500,
    });
  }
};
