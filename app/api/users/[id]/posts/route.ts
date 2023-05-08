import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

interface ParamsProps {
  params: {
    id: string;
  };
}

export const GET = async (req: Request, { params }: ParamsProps) => {
  const { id } = params;

  try {
    await connectToDB();

    const data = await Prompt.find({ creater: id }).populate("creater");

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (e: any) {
    return new Response(JSON.stringify({ message: "Something Broke!" }), {
      status: 500,
    });
  }
};
