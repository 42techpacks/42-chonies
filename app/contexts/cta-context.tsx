/*

TODO: Update to add a new "thing"

THING -> A state for the CTAHub
STATE -> E.g. toggles, styling

See code for steps.
*/

import {Dispatch, useContext, createContext, useReducer} from 'react';

export type Size = 'S' | 'M' | 'L' | 'XL' | 'XXL';

export const CTAContext = createContext<CTAContextType>({} as CTAContextType);

interface CTAContextType extends CTAState {
  dispatch: Dispatch<CTAAction>;
}

{
  /* STEP 1: Add type/thing to CTAAction, CTAState, and initalState */
}
export type CTAAction =
  | {type: 'AVAILABLE_SET_SIZE'; butt_stuff: Size}
  | {type: 'AVAILABLE_TOGGLE_SIZE_GUIDE'}
  | {type: 'AVAILABLE_TOGGLE_DESCRIPTION'}
  | {type: 'COUNTDOWN_TOGGLE_PRODUCT_VIEW'}
  | {type: 'SOLDOUT_TOGGLE_EMAIL_INPUT'}
  | {type: 'SOLDOUT_SET_SHOULD_SUBMIT'; shouldSubmit: boolean}
  | {type: 'COUNTDOWN_TOGGLE_DESCRIPTION'}
  | {type: 'COUNTDOWN_TOGGLE_LEADERBOARD_INPUT'};

export interface CTAState {
  availableSelectedSizeIs: Size | null;
  availableIsShowingSizeGuide: boolean;
  availableIsShowingDescription: boolean;
  countdownIsShowingDescription: boolean;
  countdownIsShowingLeaderboardInput: boolean;
  soldoutIsShowingEmailInput: boolean;
  soldoutShouldSubmit: boolean;
}

const initialState: CTAState = {
  availableSelectedSizeIs: null,
  availableIsShowingSizeGuide: false,
  availableIsShowingDescription: false,
  countdownIsShowingDescription: false,
  countdownIsShowingLeaderboardInput: false,
  soldoutIsShowingEmailInput: false,
  soldoutShouldSubmit: false,
};

/* STEP 2: Update reducer to handle new dispatch (for new state/case) */

const reducer = (state: CTAState, action: CTAAction): CTAState => {
  switch (action.type) {
    case 'AVAILABLE_SET_SIZE':
      return {...state, availableSelectedSizeIs: action.butt_stuff};
    case 'AVAILABLE_TOGGLE_SIZE_GUIDE':
      return {
        ...state,
        availableIsShowingSizeGuide: !state.availableIsShowingSizeGuide,
      };
    case 'AVAILABLE_TOGGLE_DESCRIPTION':
      return {
        ...state,
        availableIsShowingDescription: !state.availableIsShowingDescription,
      };
    case 'COUNTDOWN_TOGGLE_DESCRIPTION':
      return {
        ...state,
        countdownIsShowingDescription: !state.countdownIsShowingDescription,
      };
    case 'COUNTDOWN_TOGGLE_LEADERBOARD_INPUT':
      return {
        ...state,
        countdownIsShowingLeaderboardInput:
          !state.countdownIsShowingLeaderboardInput,
      };
    case 'SOLDOUT_TOGGLE_EMAIL_INPUT':
      return {
        ...state,
        soldoutIsShowingEmailInput: !state.soldoutIsShowingEmailInput,
      };
    case 'SOLDOUT_SET_SHOULD_SUBMIT':
      return {
        ...state,
        soldoutShouldSubmit: action.shouldSubmit,
      };
  }
};

export function CTAProvider({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <CTAContext.Provider value={{...state, dispatch}}>
      {children}
    </CTAContext.Provider>
  );
}

// Export hook that will serve as interface to all the auth logic functions
export function useCTAState() {
  const context = useContext(CTAContext);
  if (context === undefined)
    throw Error('useCTAState must be used within CTAProvider');
  return context;
}
