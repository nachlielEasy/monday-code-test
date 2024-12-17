import { useEffect, useState } from "react";
import mondaySdk from "monday-sdk-js";

const monday = mondaySdk();

interface BoardData {
  name: string;
  id: string;
}

interface MondayContext {
  boardId?: string;
  instanceId?: string;
  theme?: string;
  viewMode?: string;
  locale?: string;
}

interface ApiResponse {
  data: {
    boards: BoardData[];
  };
}

export default function MondayApp() {
  const [context, setContext] = useState<MondayContext | null>(null);
  const [boards, setBoards] = useState<BoardData[]>([]);

  useEffect(() => {
    // Initialize the Monday SDK
    monday.listen("context", (res: { data: MondayContext }) => {
      setContext(res.data);
    });

    // Get board data
    monday
      .api(
        `
      query {
        boards {
          name
          id
        }
      }
    `
      )
      .then((res: ApiResponse) => {
        setBoards(res.data.boards);
      });
  }, []);

  return (
    <div>
      <h1>Monday.com App</h1>
      {context && (
        <div>
          <h2>Context:</h2>
          <pre>{JSON.stringify(context, null, 2)}</pre>
        </div>
      )}
      <div>
        <h2>Boards:</h2>
        <ul>
          {boards.map((board) => (
            <li key={board.id}>{board.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
