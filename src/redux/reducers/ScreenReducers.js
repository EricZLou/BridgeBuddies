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
  hand_should_rotate: false,
}, action) {
  switch (action.type) {
    case RESIZE_SCREEN:
      // initial configuration
      let card_height = (action.size.height - 30) / 3 * 0.7;
      let card_width = 691 / 1056 * card_height;
      let card_spacing = card_width / 5;
      let hand_width = 12 * card_spacing + card_width;
      const hand_should_rotate = false;
      // const hand_should_rotate = action.size.width < action.size.height;
      // if hand is not rotated and card_width is bigger than screen_width / 3, then readjust
      if (hand_width > action.size.width / 3) {
        hand_width = action.size.width / 3;
        card_spacing = hand_width / 17;
        card_width = 5 * card_spacing;
        card_height = 1056 / 691 * card_width;
      }

      // if (!hand_should_rotate && hand_width > action.size.width / 3) {
      //   hand_width = action.size.width / 3;
      //   card_spacing = hand_width / 17;
      //   card_width = 5 * card_spacing;
      //   card_height = 1056 / 691 * card_width;
      // }
      // else if (hand_should_rotate && hand_width + 2 * card_height > action.size.width) {
      //   card_width = 3455/22307 * action.size.width;
      //   hand_width = 12 * card_width / 5 + card_width;
      //   card_height = 1056 / 691 * card_width;
      //   card_spacing = card_width / 5;
      // }
      return {
        screen_height: action.size.height,
        screen_width: action.size.width,
        card_height: card_height,
        card_width: card_width,
        card_spacing: card_spacing,
        hand_width: hand_width,
        hand_should_rotate: hand_should_rotate,
      };
    default:
      return state;
  }
}
