import { db } from "@/lib/db";
import GamePage from "./Game";
import { currentUser } from "@/lib/auth";

const page = async ({ params }) => {
  const player = await currentUser();

  if (!player) {
    return (
      <div>
        <h1>Login mate!</h1>
      </div>
    );
  }

  const gameId = params.gameId;

  const game = await db.game.findUnique({
    where: { id: gameId },
    include: { moves: { orderBy: { createdAt: "asc" } } },
  });

  if (!game) {
    return (
      <div>
        <h1>Game not found!</h1>
      </div>
    );
  }

  if (game.blackPlayerId !== player.id && game.whitePlayerId !== player.id) {
    return (
      <div>
        <h1>You dont have access to this match!</h1>
      </div>
    );
  }

  return (
    <GamePage
      player1Id={game.whitePlayerId}
      player2Id={game.blackPlayerId}
      currentPlayerId={player.id}
      initialGame={game}
    />
  );
};

export default page;
