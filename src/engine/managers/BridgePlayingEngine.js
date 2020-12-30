export function isValidCard({cards_on_board, card, cards_in_hand}) {
  if (cards_on_board.length === 0) return true;
  const opening_suit = cards_on_board[0].card.suit;
  if (card.suit === opening_suit) return true;
  for (let card of cards_in_hand) {
    if (card.suit === opening_suit) return false;
  }
  return true;
}

export function getRoundWinner({cards_on_board, contract}) {
  const opening_suit = cards_on_board[0].card.suit;
  const trump_suit = contract.suit;
  let max_card_play = cards_on_board[0];
  let found_trump = (opening_suit === trump_suit);
  for (let card_play of cards_on_board) {
    if (found_trump) {
      if (card_play.card.suit === trump_suit && card_play.card.value > max_card_play.card.value)
        max_card_play = card_play;
    }
    else {
      if (card_play.card.suit === trump_suit) {
        found_trump = true;
        max_card_play = card_play;
      }
      else if (card_play.card.suit === opening_suit && card_play.card.value > max_card_play.card.value) {
        max_card_play = card_play;
      }
    }
  }
  console.log(`Round Winner: ${max_card_play.seat}`)
  return max_card_play.seat;
}
