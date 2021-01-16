import {
  RESIZE_SCREEN
} from '../actions/Core'

export function variable_sizes(state={
  screen_height: 0,
  screen_width: 0,
  card_height: 0,
  card_width: 0,
  card_spacing: 0,
  hand_width: 0,
}, action) {
  switch (action.type) {
    case RESIZE_SCREEN:
      let card_height = (action.size.height - 30) / 3 * 0.7;
      let card_width = 691 / 1056 * card_height;
      // if card_width is bigger than screen_width / 3, then readjust
      if (card_width > action.size.width / 3) {
        card_width = action.size.width / 3;
        card_height = 1056 / 691 * card_width;
      }
      const card_spacing = card_width / 5;
      return {
        screen_height: action.size.height,
        screen_width: action.size.width,
        card_height: card_height,
        card_width: card_width,
        card_spacing: card_spacing,
        hand_width: 12 * card_spacing + card_width,
      };
    default:
      return state;
  }
}
