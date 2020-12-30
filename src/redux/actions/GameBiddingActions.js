export const FINISH_BIDDING = 'FINISH_BIDDING';
export const MAKE_BID = 'ACTION_MAKE_BID';

export const finishBidding = (contract) => ({
  type: FINISH_BIDDING,
  contract,
});

export const makeBid = ({bid, seat}) => ({
  type: MAKE_BID,
  bid,
  seat,
});
